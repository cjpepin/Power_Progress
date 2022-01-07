import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Example from './pages/example';
import ComplexData from './pages/blocks';
import Block from './pages/block';
import Sheet from './pages/programSheet';
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
                </Routes>
            </Router>
        </div>
    )
}

export default App

