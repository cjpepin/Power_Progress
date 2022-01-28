import React, { Component } from 'react';
import {Link} from 'react-router-dom';


export default class Navbar extends Component{
    
    render() {
        function logout(){
            window.localStorage.clear();
            console.log("Made it here")
            window.location.href = '/login';
        }
        return (
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <span class="navbar-brand">Power Tracker</span>
                    </div>
                    <div class="collapse navbar-collapse" id="myNavbar">
                    <ul class="nav navbar-nav">
                        <li ><Link as={Link} to="/dashboard">All Time Data</Link></li>
                        <li><Link as={Link} to="/blocks">Blocks</Link> </li>
                        <li><Link as={Link} to="/programSheet">Program Spreadsheet</Link></li>
                        <li><a href="#">Page 3</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li ><Link as={Link} to={"/login"} onClick={logout}><span class="glyphicon glyphicon-user"></span> Log Out</Link></li>
                        {/* <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li> */}
                    </ul>
                    </div>
                </div>
            </nav>
            
        );

    }



}