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
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
     <Header/>
       <Sidebar/>
        <Routes>
        <Route path='/products' element={<ProductList/>} />
        <Route path='/users' element={<Users/>} />
        <Route path='/home' element={<Dashboard/>} />
        <Route path='/profile/:id' element={<Profile/>} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
