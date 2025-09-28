import { useSelector } from 'react-redux';
import { useGetOrdersQuery, useGetProductsQuery, useGetUsersQuery } from '../api/apiSlice'
import Charts from './Charts';

const Dashboard = () => {
  const { data: users = [] } = useGetUsersQuery();
  const { data: orders = [] } = useGetOrdersQuery();
  const { data: products = [] } = useGetProductsQuery();

  const localUsers = useSelector(state => state.users.users); 
  console.log(localUsers.length);

  console.log(orders);
  const monthlyRevenue = orders.reduce((acc, order) => {
    const month = new Date(order.date).toLocaleString("default", { month: "short" });
    const orderRevenue = order.products.reduce((sum, ord) => {
      const product = products.find(item => item.id === ord.productId);
      return product ? sum + (ord.quantity * product.price) : sum;
    }, 0);

    if (!acc[month]) acc[month] = 0;
    acc[month] += orderRevenue;

    return acc
  }, {});

  const monthlyRevenueArr = Object.entries(monthlyRevenue).map(([month, revenue]) => ({
    month,
    revenue
  }));

   const monthlyOrders = orders.reduce((acc, order) => {
    const month = new Date(order.date).toLocaleString("default", { month: "short" });
    if (!acc[month]) acc[month] = 0;
    acc[month] += 1;
    return acc;
  }, {});

  const monthlyOrdersArr = Object.entries(monthlyOrders).map(([month, orders]) => ({
    month,
    orders
  }));


  return (
    <div>
      <h3>Monthly Revenue</h3>
      <ul>
        {monthlyRevenueArr.map(({ month, revenue }) => (
          <li key={month}>
            {month}: ${revenue}
          </li>
        ))}
      </ul>
      <p>Total Users : {users.length + localUsers.length}</p>
      <p>Total Orders : {orders.length}</p>
      <p>Total Products: {products.length}</p>

      <Charts revenueData={monthlyRevenueArr} />
    </div>
  )
}

export default Dashboard
