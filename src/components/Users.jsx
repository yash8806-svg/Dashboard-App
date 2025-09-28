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
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");

  const reduxUsers = useSelector((state) => state.users.users);

  const allUsers = [...apiUsers, ...reduxUsers];

  const dispatch = useDispatch();

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];

    if(parsedUsers.length > 0 && reduxUsers.length === 0){
        parsedUsers.forEach(user => dispatch(addUsers(user)))
    }
    console.log("saved"+parsedUsers)
  }, [dispatch])

  useEffect(() => {
      localStorage.setItem("users", JSON.stringify(reduxUsers));
  }, [reduxUsers])


  const addUser = (e) => {
    e.preventDefault();


    if (!username.trim() ||
      !firstname.trim() ||
      !lastname.trim() ||
      !email.trim() ||
      !password.trim() ||
      !address.trim() ||
      !contact.trim()) {
      setError("Please fill all the fields");
      return;
    }

    const newUser = {
      id: Date.now(),
      username,
      name: { firstname, lastname },
      email,
      password,
      address,
      contact
    };

    dispatch(addUsers(newUser));

    setError("");
    setUserName("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setAddress("");
    setContact("");
  };

  const deleteUser = (id) => {
    dispatch(removeUser(id))
  }


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

          <label>Address:</label>
          <input type="text" value={address} placeholder="Address" onChange={(e) => setAddress(e.target.value)} />

          <label>Contact:</label>
          <input type="tel" value={contact} placeholder="Phone" onChange={(e) => setContact(e.target.value)} />

          <button type="submit">Add</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {allUsers.length === 0 ? (
        <p>No users found!</p>
      ) : (
        allUsers.map(user => (
          <div key={user.id} className="users">
            <h1>{user.username}</h1>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
            <Link to={`/profile/${user.id}`}>Read...</Link>
          </div>
        ))
      )}
    </>
  );
};

export default Users;
