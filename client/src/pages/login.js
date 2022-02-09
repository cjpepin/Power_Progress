import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, { useState } from 'react';
import styled from 'styled-components'
import '../components/modules/login.css'
// import Button from 'react-bootstrap/Button';
import '../components/modules/login.css'
import * as yup from 'yup'
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
  margin-top: 5vh;
  width: 325px;
  height: 325px;

  border-radius: 5px;
  padding: 25px;
  box-shadow: 8px 10px;
`
const H1 = styled.h1`
  color: rgb(142,174,189);
  background-color: rgb(15,22,40);
`
const H4 = styled.h4`
  color: rgb(142,174,189);
  background-color: rgb(15,22,40);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 10px;

  padding: 5px;
  border-radius: 3px;
  box-shadow: 5px 5px;
`
const Form = styled.form`
  color: rgb(142,174,189);
  background-color: rgb(15,22,40);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20%;
  margin-right: 20%;
` 
const Input = styled.input`
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
  margin-top: 15vh;
  width: 325px;
  height: 100px;

  border-radius: 5px;
  box-shadow: 8px 10px;
`

function App() {

  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  

  async function loginUser(event) {
    event.preventDefault();
    const cleanEmail = DOMPurify.sanitize(email)
    const cleanPassword = DOMPurify.sanitize(password)
    
    const response = await fetch('https://powerprogress.herokuapp.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cleanEmail,
        cleanPassword,
      }),
    })

    const data = await response.json()
    if(data.user) {
      bcrypt.compare(password, data.password, function(err, res){
        if(err){
          alert(err)
        } else if(res === true){
          localStorage.setItem('token', data.user)
          localStorage.setItem('name', data.name)
          // alert('Login successful')
          window.location.href = '/dashboard'
        }
      })
    }else alert('Check your email/password')
  }

  function examplePage() {
    window.location.href = '/example'
  }
  function registerNewUser(){
    window.location.href = '/register'
  }

  return (
    <>

    <Title>Power Progress</Title>
    <H4>Current testing email: lookingback31415@gmail.com and password: TestPassword. Simple security features still being implemented</H4>
    <Wrapper className="wrapper">
      
      <h1>Login</h1>
      <Form class="form-inline" onSubmit={loginUser}>
        <br />
        <div class="form-group">
        <Input 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <Input 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <Input type="submit" value="Login"/>
        </div>
      </Form>
      <span>New User?</span>
      <Input type="submit" value="Register" onClick={registerNewUser}/>
       {/* <Input type="submit" value="See Example Data" onClick={examplePage}/> */}
     
    </Wrapper>
    </>
    
    
  );
}

export default App;
