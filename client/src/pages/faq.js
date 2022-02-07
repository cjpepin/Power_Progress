import React, { useEffect } from 'react'
import jwt from 'jsonwebtoken'
import {BrowserRouter as Router} from 'react-router-dom'
import { useState, useRef } from 'react';
import Charts from './charts.component';
import Navbar from '../components/navbar.component';
import AccessoryCharts from './accessoryCharts.component';
import styled, { css } from 'styled-components'
import $ from 'jquery';

const Wrapper = styled.div`
        margin-left: 10vw;
        margin-right: 10vw;
    
    `
    const H1 = styled.h1`
        color: rgb(142,174,189);
        background-color: rgb(15,22,40);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-left: 30%;
        margin-right: 30%;
        margin-top: 5vh;
        margin-bottom: 10px;
    
        max-width: 30vw;
        border-radius: 5px;
        padding: 25px;
        box-shadow: 8px 10px;
    `
    const QandA = styled.h4`
        color: rgb(142,174,189);
        background-color: rgb(15,22,40);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-left: 5vw;
        margin-right: 5vw;
        margin-top: 15px;
    
        max-width: 90vw;
        border-radius: 5px;
        padding: 20px;
        box-shadow: 8px 10px;
    `
const FAQ = () => {
    return (
        <>
        <Navbar />
        <Wrapper>
            
            <QandA>
                <span>Q.) What is Power Progress?</span>
                <br />
                <span>A.) Power Progress is a MERN (MongoDB, Express, React.js, Node.js) Stack application designed to help lifters 
                (powerlifters specifically) track their progress over time.</span>
            </QandA>
            <br />
            <QandA>
                <span>Q.) Why?</span>
                <br />
                <span>A.) One of the greatest challenges that a lifter and coach face is knowing whether or not programming is effective.
                    Power progress is an attempt to make a lifters programming more effective by displaying how a lifter is progressing over time
                    and what factors may be limiting growth.
                </span>
            </QandA>
            <br />
            {/* <QandA>
                <span>Q.)</span>
                <br />
                <span>A.)</span>
            </QandA>
            <br />
            <QandA>
                <span>Q.)</span>
                <br />
                <span>A.)</span>
            </QandA>
             */}
            
            
            
                
        </Wrapper>
        </>
        
    )
}

export default FAQ
