import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, { useState } from 'react';


function App() {

  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  async function registerUser(event) {
    event.preventDefault();

    const response = await fetch('https://powerprogress.herokuapp.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()
    if(data.user) {
      localStorage.setItem('token', data.user)
      localStorage.setItem('name', data.name)
      // alert('Login successful')
      window.location.href = '/dashboard'
    } else {
      alert('Please check your username and password')
    }
    console.log(data)
  }

  function examplePage() {
    window.location.href = '/example'
  }
  function registerNewUser(){
    window.location.href = '/register'
  }



  return (
    
    <div>
      <h1>Login</h1>
      <form class="form-inline" onSubmit={registerUser}>
        <br />
        <div class="form-group">
        <input 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <input type="submit" value="Login"/>
        </div>
      </form>
       <input type="submit" value="See Example Data" onClick={examplePage}/>
      <input type="submit" value="Register" onClick={registerNewUser}/>

    </div>
    
  );
}

export default App;
