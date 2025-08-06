import React, { useState } from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { Context } from './Context';
import { toast } from 'react-toastify';
import video from '../assets/login.mp4'
export default function Login() {
  const navigate=useNavigate();
  const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const userData = {
      email,
      password
    };
    const { islogin,setislogin } = useContext(Context);
  const handleSubmit = async(e) => {
     
    e.preventDefault();
    try{
       
  const res= await fetch('https://foodrecipe-rug5.onrender.com/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    })
    if(!res.ok){
      console.log("error in sending login data")
    }
    const data=await res.json()
   
    if(data.success==true){
    localStorage.setItem('token',data.token);
    localStorage.setItem('user',JSON.stringify(data.data));
    setislogin(true);
     navigate('/')
    }
    else{
      toast.error("Invalid user name or password")
    }
  }catch(e){
    console.error("Error during login:", e);    

  }
  }
  return (
    <div className="signup-container">
      <video autoPlay muted loop playsInline className="video-bg">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
         <div className="input-group">
    <input
      type="email"
      id="email"
      name="email"
      placeholder="Email Address"
      required
      value={email}
      onChange={(e)=>setemail(e.target.value)}
      pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
    />
    <span className="error-message">Please enter a valid email address.</span>
  </div>

  <div className="input-group">
    <input
      type="password"
      id="password"
      name="password"
      placeholder="Password"
      required
      value={password}
      onChange={(e)=>setpassword(e.target.value)}
      pattern="^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$"
    />
    <span className="error-message">
      Password must be 8+ chars & contain a special character.
    </span>
  </div>
        <button type="submit">Sign Up</button>
        <p className="login-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  )
}
