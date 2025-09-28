import { useGetUsersQuery } from '../api/apiSlice';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addUsers, removeUser, editUser } from '../api/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Users = () => {
  const { data: apiUsers = [], isLoading, isError } = useGetUsersQuery();
  const [username, setUserName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [editId, setEditId] = useState("");
  const [searchUser, setSearchUser] = useState("");

  const reduxUsers = useSelector((state) => state.users.users);

  const allUsers = [...apiUsers, ...reduxUsers];

  const dispatch = useDispatch();

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];

    if (parsedUsers.length > 0 && reduxUsers.length === 0) {
      parsedUsers.forEach(user => dispatch(addUsers(user)))
    }
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(reduxUsers));
  }, [reduxUsers]);

  const filterByName = allUsers.filter(user => {
      const filter = user.name.firstname.toLowerCase().includes(searchUser.toLowerCase());
      return filter;
  } 
  )


  const addUser = (e) => {
    e.preventDefault();

    if (!username.trim() ||
      !firstname.trim() ||
      !lastname.trim() ||
      !email.trim() ||
      !password.trim() ||
      !city.trim() ||
      !phone.trim()) {
      setError("Please fill all the fields");
      return;
    }

    const newUser = {
      id: Date.now(),
      username,
      name: { firstname, lastname },
      email,
      password,
      address: { city },
      phone,
    };
    console.log(newUser)

    if(editId){
      dispatch(editUser({id:editId,newUser}))
    }else {
      dispatch(addUsers(newUser));
    }
    setError("");
    setUserName("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setCity("");
    setPhone("");
  };

  const deleteUser = (id) => {
    dispatch(removeUser(id))
  }

 const editUsers = (user) => {
  setEditId(user.id);
  setUserName(user.username);
  setFirstName(user.name.firstname);
  setLastName(user.name.lastname);
  setCity(user.address.city);
  setPhone(user.phone);
  setEmail(user.email);
  setPassword(user.password);
};



  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading users!</p>;

  return (
    <>
      <div className="container">
        <form onSubmit={addUser}>
          <label>Username:</label>
          <input type="text" value={username} placeholder="Username" onChange={(e) => setUserName(e.target.value)} autoComplete="username" />

          <label>First Name:</label>
          <input type="text" value={firstname} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />

          <label>Last Name:</label>
          <input type="text" value={lastname} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />

          <label>Email:</label>
          <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} autoComplete="email" />

          <label>Password:</label>
          <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />

          <label>city:</label>
          <input type="text" value={city} placeholder="city" onChange={(e) => setCity(e.target.value)} />

          <label>phone:</label>
          <input type="tel" value={phone} placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />

          <button type="submit">{editId ? "Update":"Add"}</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <div className="input">
        <input type="text" placeholder='Search user' value={searchUser} onChange={(e)=>setSearchUser(e.target.value)}/>
      </div>

      {filterByName.length === 0 ? (
        <p>No users found!</p>
      ) : (
        filterByName.map(user => (
          <div key={user.id} className="users">
            <h1>{user.username}</h1>
            <button onClick={()=>editUsers(user)} >Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
            <Link to={`/user/${user.id}`}>Read...</Link>
          </div>
        ))
      )}
    </>
  );
};

export default Users;
