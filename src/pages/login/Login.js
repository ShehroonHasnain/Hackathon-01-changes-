import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/slices/authSlice'
import { Link } from 'react-router-dom'
import "./Login.css"
import * as yup from 'yup'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading,setLoading] = useState(false)

     // schema 
     const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be at most 20 characters")
      })

      const dispatch = useDispatch()

    const handleLogin = async()=>{
      let user = {
        email, 
        password
      }
// validate data
      try{
        const data = {
          email,
          password
        }
      const response = await schema.validate(data)
      if(response){
        dispatch(login({...user,setLoading}))
      }  

      }catch(error){
console.log('error',error);
alert("Please fill the required field correctly")

      }

      
    }
  
  return (
    <div className='login-box'>
    <div className="login-container">
<h1>Login Page</h1>
 
  <input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required/>
  <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} required/>
  <button className='button' onClick={handleLogin}>{loading? <p>Loading...</p>:<p>Login</p>}</button>

<div className="create-account">
  <p>Don't have an account? <Link to="/signup">Create account</Link></p>
</div>
</div>
</div>
  )
}
