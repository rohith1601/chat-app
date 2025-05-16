import React, { useEffect } from 'react'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'

const App = () => {
  const {authUser, checkAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth();
  }
  
  ,[checkAuth])

  console.log("Auth User", authUser);


  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />


      </Routes>
    </div>
  )
}

export default App
