import { useState } from 'react'
import "./App.css";
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Users from './components/Users';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Profile from './components/Profile';

function App() {
  return (
    <>
    <BrowserRouter>
     <Header/>
       <Sidebar/>
        <Routes>
          <Route path='/' element={<Dashboard/>} />
        <Route path='/home' element={<Dashboard/>} />
        <Route path='/products' element={<ProductList/>} />
        <Route path='/users' element={<Users/>} />
        <Route path='/user/:id' element={<Profile/>} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
