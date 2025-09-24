import React, { use } from 'react'
import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../api/apiSlice';


const Profile = () => {
    const { data: users = [] } = useGetUsersQuery();
    const { id } = useParams();

    const user = users.find(item => item.id === Number(id));
    console.log(user);

    if(!user) return <p>No profile found!</p>

    return (
        <> 
            <div className="user-profile">
            <h1>{user.username}</h1>
            <p>Name: {user.name.firstname} {user.name.lastname} </p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
            <p>Contact:{user.phone}</p>
            <p>Address: {user.address.city}</p>
            </div>
        </>
    )
}

export default Profile
