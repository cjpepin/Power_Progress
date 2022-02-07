import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Example from './pages/example';
import ComplexData from './pages/blocks';
import Block from './pages/block';
import Sheet from './pages/programSheet';
import FAQ from './pages/faq';
import About from './pages/about'
import './App.css'
// import Navbar from './components/navbar'
const App = () => {
    return(
        <div>
            <Router>
                <Routes>
                    <Route path='/' exact element={<Login />} />
                    <Route path="/login" exact element={<Login />}/>
                    <Route path="/register" exact element={<Register />}/>
                    <Route path="/dashboard" exact element={<Dashboard />}/>
                    <Route path="/example" exact element={<Example />}/>
                    <Route path="/blocks" exact element={<ComplexData />}/>
                    <Route path="/block" exact element={<Block />}/>
                    <Route path="/programSheet" exact element={<Sheet />}/>
                    <Route path="/faq" exact element={<FAQ />}/>
                    <Route path="/about" exact element={<About />}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App

