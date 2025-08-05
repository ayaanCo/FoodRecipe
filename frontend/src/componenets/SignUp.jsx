import React, { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from './Context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import video from '../assets/login.mp4'
const SignUp = () => {
  const navigate=useNavigate()
  const [name, setname] = useState('')
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
   const { islogin,setislogin } = useContext(Context);
  const handleSubmit = async(e) => {
    e.preventDefault(); 
    const userData = { name,  email,  password  };
    try{
      
  const res= await fetch('http://localhost:5000/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    
      const data=await res.json()
   
    if(data.success==true){
    localStorage.setItem('token',data.token);
    localStorage.setItem('user',JSON.stringify(data.data));
    setislogin(true);
    navigate('/')
     toast(`${name} Logined Successfully`)
    }
    else{
       toast.error("User already exist  ")// here i need to check if the user exist
    }
        
  }catch(e){
    toast.error("Error during signup:", e);
  }
  }

  return (
    <div className="signup-container">
      <video autoPlay muted loop playsInline className="video-bg">
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
      <form className="signup-form"  onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <div className="input-group">
    <input
      type="text"
      id="name"
      name="name"
      placeholder="Full Name"
      required
      value={name}
      onChange={(e)=>setname(e.target.value)}
      minLength="3"
    />
    <span className="error-message">Name must be at least 3 characters.</span>
  </div>

 
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
           Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
