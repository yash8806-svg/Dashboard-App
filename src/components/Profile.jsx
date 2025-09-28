import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../api/apiSlice';
import { useSelector } from 'react-redux';



const Profile = () => {
    const { data: users = [] } = useGetUsersQuery();
    const { id } = useParams();

    const localUsers = useSelector(state => state.users.users);

    const allUsers = [...users,...localUsers];
    console.log(allUsers);

    const user = allUsers.find(item => item.id === Number(id));
    console.log(user)

    if(!user) return <p>No profile found!</p>

    return (
        <> 
            <div className="user-profile">
            <h1>{user.username}</h1>
            <p>Name: {user.name.firstname} {user.name.lastname} </p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
            <p>Phone:{user.phone}</p>
            <p>Address: {user.address.city}</p>
            </div>
        </>
    )
}

export default Profile
