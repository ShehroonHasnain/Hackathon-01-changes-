import React from 'react'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from '../../redux/slices/authSlice';
import './Signup.css'
import * as yup from "yup"
import { signupSchema } from './signupSchema';




export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [gender, setGender] = useState("")
  const [profileURL, setProfileURL] = useState("")
  const [file, setFile] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  // schema




  const handleSignup = async () => {
    let user = {
      email,
      password,
      name,
      phone,
      address,
      gender
    }
    console.log("Signup clicked", user);

    // validate
    let data = {
      email,
      password,
      name,
      phone,
      address,
      gender,
      file
    }
    try {
      const response = await signupSchema.validate(data)
      if (response) {
        dispatch(signup({ ...user, file, setLoading }))
      }
    } catch (error) {
      console.log('error', error);
      alert("Please fill the required field correctly")

    }

    //  dispatch(signup({...user,file,setLoading}))    
  }


  // profile pic url handle

  const changeImage = async (e) => {
    console.log("e", e.target.files[0]);
    const file = e.target.files[0];
    setFile(file)



  }

  return (


    <div className='body'>
      <div className="container">
        <div className="signup-form"  >
          <h2>Signup</h2>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} required placeholder="Enter your name" />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password" minLength="6" />

          <label htmlFor="file">Choose Profile Pic</label>
          <input onChange={changeImage} type="file" id="file" required />

          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" name="phone" onChange={(e) => setPhone(e.target.value)} required placeholder="Enter your phone number" pattern="[0-9]{10}" />

          <label htmlFor="address">Address</label>
          <input type="text" id="address" name="address" onChange={(e) => setAddress(e.target.value)} required placeholder="Enter your address" />

          <div className="gender">
            <label>Gender</label>
            <div className="gender-options">
              <label>
                <input type="radio" name="gender" value="male" onChange={() => setGender("male")} required /> Male
              </label>
              <label>
                <input type="radio" name="gender" value="female" onChange={() => setGender("female")} required /> Female
              </label>
            </div>
          </div>

          <button onClick={handleSignup}>{loading ? <p>loading...</p> : <p>Signup</p>}</button>
        </div>
      </div>
    </div>
  )
}
