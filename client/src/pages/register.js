
// import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import styled from 'styled-components'
import DOMPurify from 'dompurify'

const bcrypt = require('bcryptjs')

const Wrapper = styled.div`
  color: rgb(142,174,189);
  background-color: rgb(15,22,40);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 38%;
  margin-right: 38%;
  margin-top: 22vh;
  width: 325px;
  height: 350px;

  border-radius: 5px;
  padding: 25px;
  box-shadow: 8px 10px;
`
const H1 = styled.h1`
  color: rgb(142,174,189);
  background-color: rgb(15,22,40);
`
const Form = styled.form`
  color: rgb(142,174,189);
  background-color: rgb(15,22,40);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 20%;
  margin-right: 20%;
` 
const Input = styled.input`
  color: rgb(15,22,40);
  background-color: rgb(142,174,189);
  margin: 5px;

  padding: 5px;
  border-radius: 3px;
  box-shadow: 5px 5px;
  border: none;
  outline: inherit;
  &:hover {
    background-color: rgb(142,174,189, 0.5);
  }
`
const Button = styled.button`
  color: rgb(15,22,40);
  background-color: rgb(142,174,189);
  margin: 8px;

  padding: 5px;
  border-radius: 3px;
  box-shadow: 5px 5px;
  border: none;
  outline: inherit;
  &:hover {
    background-color: rgb(142,174,189, 0.5);
`
const Title = styled.span`
  font-size: 35px;
  color: rgb(142,174,189);
  background-color: rgb(15,22,40);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 38%;
  margin-right: 38%;
  margin-top: 22vh;
  width: 325px;
  height: 100px;

  border-radius: 5px;
  box-shadow: 8px 10px;
`

function App() {
  const navigate = useNavigate()

  const[name, setName] = useState('')
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[hashedPassword, setHashedPassword] = useState('')

  const schema = yup.object().shape({
    name: yup.string().required().min(1, 'Please enter a name'),
    password: yup.string()
    .min(8, 'Enter 8 or more characters')
    .max(20, 'Cannot be more than 20 characters'),
    email: yup.string().email('Please enter a valid email address'),
  })

  async function registerUser(event) {
    event.preventDefault();
    const cleanEmail = DOMPurify.sanitize(email)
    const cleanPassword = DOMPurify.sanitize(password)
    const cleanName = DOMPurify.sanitize(name)
    
    const saltRounds = 10 // or heroku variable;
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(cleanPassword, salt, async function(err, hash) {
        const response = await fetch('https://powerprogress.herokuapp.com/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cleanName,
            cleanEmail,
            hashedPassword: hash,
          }),
        })

        const data = await response.json()
        console.log(data.status)
        if(data.status === 'good'){
          navigate('/login')
        } else {
          alert(data.err)
        }

      });
    });
    

    
  }
  function returnToLogin(){
    window.location.href = '/login'
  }


  return (
    
    <Wrapper>
      <H1>Register</H1>
      <Form onSubmit={registerUser}>
      <Input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <br />
        <Input 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <Input 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      
        <Input type="submit" value="Register"/>
      </Form>
      <Input type="submit" onClick={returnToLogin} value='Return To Login' />
    </Wrapper>
    
  );
}

export default App;
