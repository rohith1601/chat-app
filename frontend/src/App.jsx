import React, { useEffect } from 'react'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import NavBar from './components/NavBar'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth();
  }
  ,[checkAuth])

  console.log("Auth User", {authUser});

  if(isCheckingAuth && !authUser){
    return(
      <div className='flex justify-center items-center h-screen'>
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    )}

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={authUser ? <Home/> : <Navigate to='/login'/>} />
        <Route path="/signup" element={!authUser? <SignUp /> : <Navigate to='/' /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={ authUser? <Profile /> : <Navigate to='/login'/> } />


      </Routes>
    </div>
  )
}
export default App

