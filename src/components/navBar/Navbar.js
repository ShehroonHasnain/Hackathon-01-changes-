import React from 'react'
import './Navbar.css'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'


export default function Navbar() {
    const dispatch=useDispatch()

const logoutHandle = ()=>{
    dispatch(logout())

}

  return (
    <div className="navbar">
        <div className="logo">
            <a href="#">Student Notes App</a>
        </div>
        <div className="nav">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">My Account</a></li>
                <li><a href="#">My Notes</a></li>
                <li><a href="#">Friends Notes</a></li>
                <li><a href="#">About</a></li>
            </ul>
            <div className="menu"><i className="fa-solid fa-bars"></i></div>
        </div>
        {/* <a href="#" className="highlight">Sign up/Login</a> */}
        <button onClick={logoutHandle} className="highlight">Logout</button>


        {/* <div class="dropdown-menu">
            <ul>
            <li><a href="#">Home</a></li>
                <li><a href="#">My Account</a></li>
                <li><a href="#">Post</a></li>
                <li><a href="#">Friends</a></li>
                <li><a href="#">About</a></li>
            </ul>
        </div> */}
    </div>
  )
}
