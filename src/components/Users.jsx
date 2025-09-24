import { useGetUsersQuery } from '../api/apiSlice'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { addUsers } from '../api/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from "react";

const Users = () => {
    const { data: users = [], isLoading, isError } = useGetUsersQuery();
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
    const localUsers = useSelector(state => state.user.users);

    const allUsers = [...users, ...storedUsers]

    const addUser = (e) => {
        e.preventDefault();

        if (!username.trim() || !firstname.trim() || !lastname.trim() || !email.trim() || !password.trim() || !address.trim() || !contact.trim()) {
            setError("Please fill the boxes");
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
        }
        console.log(newUser)
        dispatch(addUsers(newUser));

        const storedUsers = localStorage.getItem("users");
        const localUsers = storedUsers ? JSON.parse(storedUsers) : [];
        localUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(localUsers))

          setStoredUsers(localUsers);


        setError("")
        setUserName("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setAddress("");
        setContact("");
    }
    console.log(users);

    useEffect(() => {
        const usersFromStorage = localStorage.getItem("users");
        if (usersFromStorage) {
            setStoredUsers(JSON.parse(usersFromStorage));
        }
    }, []);

    return (
        <>

            <div className="container">
                <form onSubmit={addUser}>
                    <label>Username:</label>
                    <input type="text"
                        value={username}
                        placeholder='username'
                        onChange={(e) => setUserName(e.target.value)}
                        autoComplete='username' />

                    <label>FirstName:</label>
                    <input type="text"
                        placeholder='FirstName'
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)} />

                    <label>LastName</label>
                    <input type="text"
                        placeholder='LastName'
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)} />

                    <label>Email:</label>
                    <input type="email"
                        placeholder='Email@'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete='email' />

                    <label>Password:</label>
                    <input type="password"
                        placeholder='password'
                        autoComplete='current-password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                    <label>Address:</label>
                    <input type="text"
                        placeholder='Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)} />

                    <label>Contact:</label>
                    <input type="number"
                        placeholder='phone'
                        value={contact}
                        onChange={(e) => setContact(e.target.value)} />

                    <button type='submit' >Add</button>
                </form>

                {error && <p>{error}</p>}
            </div>
            {allUsers.length === 0 ? (
                <p>No users found!</p>
            ) : (
                allUsers.map((user) => (
                    <div key={user.id} className="users">
                        <h1>{user.username}</h1>
                        <Link to={`/profile/${user.id}`}>Read...</Link>
                    </div>
                ))
            )}
        </>
    )
}

export default Users
