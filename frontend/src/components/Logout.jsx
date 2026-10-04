import React from 'react'
import { useDispatch } from 'react-redux'
import LoginForm from './Auth/Login'
import { logout } from '../redux/authSlice'


const Logout = () => {
    // const store = useSelector((store)=>store.auth.user)
    const dispatch = useDispatch();
    dispatch(logout())
  return (
    <LoginForm />
  )
}

export default Logout
