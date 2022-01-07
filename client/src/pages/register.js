
// import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate()

  const[name, setName] = useState('')
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  async function registerUser(event) {
    event.preventDefault();

    const response = await fetch('https://powerprogress.herokuapp.com/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })

    const data = await response.json()
    console.log(data.status)
    if(data.status === 'good'){
      navigate('/login')
    }
  }
  function returnToLogin(){
    window.location.href = '/login'
  }


  return (
    
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
      <input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <br />
        <input 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      
        <input type="submit" value="Register"/>
      </form>
      <button onClick={returnToLogin}>Return To Login</button>
    </div>
    
  );
}

export default App;
