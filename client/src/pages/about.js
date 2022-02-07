import React, { useEffect } from 'react'
import jwt from 'jsonwebtoken'
import {BrowserRouter as Router} from 'react-router-dom'
import { useState, useRef } from 'react';
import Charts from './charts.component';
import Navbar from '../components/navbar.component';
import AccessoryCharts from './accessoryCharts.component';
import styled, { css } from 'styled-components'
import $ from 'jquery';
import picture from '../components/pictures/ME.jpeg'
import gitLogo from '../components/pictures/github.jpg'
import linkedInLogo from '../components/pictures/linkedin.png'
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
    const Body = styled.h4`
        color: rgb(142,174,189);
        background-color: rgb(15,22,40);
        display: flex;
        margin-left: 5vw;
        margin-right: 5vw;
        margin-top: 15px;
    
        max-width: 90vw;
        border-radius: 5px;
        padding: 20px;
        box-shadow: 8px 10px;
    `
    const Img = styled.img`
        max-width: 250px;
        max-height: 250px;
        margin-left: 0;
        padding: 20px;
        border-radius: 5px;
    `
    const SmallImg = styled.img`
        max-height: 40px;
        max-width: 40px;
        margin: 5px;
        border-radius: 20px;
        &:hover{
            cursor: pointer;
        }
    `
    const SmallImgDiv = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
    `
    const Paragraph = styled.span`
        display: flex;
        margin-top: 25px;
    `
const About = () => {

    function goToGithub(e){
        e.preventDefault();
        window.location.href = 'https://github.com/cjpepin'
    }
    function goToLinkedin(e){
        e.preventDefault();
        window.location.href = 'https://www.linkedin.com/in/connor-pepin-10954b192/'
    }

    return (
        <>
        <Navbar />
        <Wrapper>
            
            <Body>
                <div>
                    <Img src={picture} />
                    <SmallImgDiv>
                        <SmallImg onClick={goToGithub} src={gitLogo}/>
                        <SmallImg onClick={goToLinkedin} src={linkedInLogo}/>
                    </SmallImgDiv>
                </div>
                
                <Paragraph> Hello! My name is Connor Pepin. I am a Junior Computer Science + Mathematics major at Washington University in St. Louis.

                    Power Progress is a MERN (MongoDB, Express, React.js, Node.js) Stack application designed to help lifters 
                (powerlifters specifically) track their progress over time. I started it to combine my interest of Powerlifting 
                and learn MERN stack and develop my programming skills. It has ended up becoming a usable product to store my programs 
                and get some basic data visualization, but I'll continue to add features to help make it a beneficial tool for Powerlifters.
                <br />
                <br />
                My primary interests are currently in full stack application/software development and gaining more knowledge on that front, 
                but a lot of my scholastic interests are also in the realm of data science as well. Another one of my primary projects is a Python/
                Jupyter notebook based sentiment parser that analyzes student feedback in order to help professors of large scale CS courses get 
                a good idea of how to best improve their course more efficiently.
                <br />
                <br />
                I'm very passionate about software engineering and am always looking for new learning opportunities! My Github and LinkedIn 
                are posted to the left if you want to get into contact with me! Otherwise the best email to reach me at is cjpepin@wustl.edu.
                <br />


                
                </Paragraph>
            </Body>
        </Wrapper>
        </>
        
    )
}

export default About
