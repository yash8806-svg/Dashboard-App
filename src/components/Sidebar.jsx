import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
      <ul>
        <Link to="/home">Home</Link>
        <br />
        <Link to="/products">Products</Link>
        <br />
        <Link to="/Users">Users</Link>
        <li>Analytics</li>
        <li>Settings</li>
      </ul>
    </div>
  )
}

export default Sidebar
