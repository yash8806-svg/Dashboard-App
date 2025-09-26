import { useGetUsersQuery } from '../api/apiSlice';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addUsers, removeUser,editUser } from '../api/userSlice';
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
  const [storedUsers, setStoredUsers] = useState([]);

  const dispatch = useDispatch();

  // Load users from localStorage safely
  useEffect(() => {
    try {
      const usersFromStorage = localStorage.getItem("users");
      const parsedUsers = usersFromStorage && usersFromStorage !== "undefined" ? JSON.parse(usersFromStorage) : [];
      setStoredUsers(parsedUsers);

      // Populate Redux state without duplication
      parsedUsers.forEach(user => dispatch(addUsers(user)));
    } catch (e) {
      console.error("Failed to parse users from localStorage", e);
      localStorage.setItem("users", "[]"); // reset corrupted data
    }
  }, [dispatch]);

  // Combine API users and local storage users
  const allUsers = [...apiUsers, ...storedUsers];

  const addUser = (e) => {
    e.preventDefault();

    // Validation
    if (!username.trim() || !firstname.trim() || !lastname.trim() || !email.trim() || !password.trim() || !address.trim() || !contact.trim()) {
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

    // Update Redux
    dispatch(addUsers(newUser));

    // Update localStorage safely
    const localData = localStorage.getItem("users");
    const localUsers = localData && localData !== "undefined" ? JSON.parse(localData) : [];
    localUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(localUsers));
    setStoredUsers(localUsers);

    // Reset form
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
    // Remove from Redux
    dispatch(removeUser(id));

    // Remove from localStorage
    const stored = localStorage.getItem("users");
    const localUsers = stored && stored !== "undefined" ? JSON.parse(stored) : [];
    const updatedUsers = localUsers.filter(user => user.id !== id);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setStoredUsers(updatedUsers); // update local state for UI
  };

  const editUserData = (user) => {
      dispatch(editUser({id:user.id}))
      console.log(user.id);
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
            <button onClick={()=>editUserData(user)} >Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
            <Link to={`/profile/${user.id}`}>Read...</Link>
          </div>
        ))
      )}
    </>
  );
};

export default Users;
