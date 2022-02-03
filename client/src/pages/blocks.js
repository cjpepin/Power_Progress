import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import Navbar from '../components/navbar.component'
import jwt from 'jsonwebtoken'
import styled from 'styled-components'

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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 38%;
    margin-right: 38%;
    margin-top: 5vh;

    border-radius: 5px;
    padding: 25px;
    box-shadow: 8px 10px;
`
const Form = styled.div`
  color: rgb(142,174,189);
  background-color: rgb(15,22,40);
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 80vw;
  margin-top: 20px;
  margin-left: 15%;
  margin-right: 15%;

  border-radius: 5px;
  padding: 25px;
  box-shadow: 8px 10px;
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
  }
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


const ComplexData = () => {
    const [blockName, setBlockName] = useState('');
    const [blockUrl, setBlockUrl] = useState('');
    if(localStorage.getItem('block')){
        localStorage.removeItem('block');
        console.log("block removed")
    }
    async function populateBlocks(){
        
        const req = await fetch('https://powerprogress.herokuapp.com/api/get_blocks', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }
        
        })
        const data = await req.json();
        if(data.status === 'fine'){
            console.log("populating blocks");
            let totData = data.blocks;
            console.log(totData)
            let blockList = [];
            let blockDiv = document.getElementById("populatedBlocks");
            let newBlockButton = document.getElementById("newBlock");
            for(let key in totData){
                console.log(key)
                if(totData.hasOwnProperty(key)){
                    let curBlock = totData[key].blockName
                    console.log(curBlock)
                    if(blockList.includes(curBlock)){
                        continue;
                    } else{
                        blockList.push(curBlock);
                        const newBlock = document.createElement('Button');
                        newBlock.id = totData[key.sheetURL];
                        newBlock.value = curBlock;
                        newBlock.innerHTML = curBlock;
                        blockDiv.prepend(newBlock);
                    }
                }
            }


        } else {
            alert(data.error + "test")
        }
    }

    useEffect(() => {
        populateBlocks();
      }, []);

    async function addNewBlock(e){
        e.preventDefault();
        // let blockName = document.getElementBy
        localStorage.setItem('block', blockName);
        localStorage.setItem('url', blockUrl)
        const token = localStorage.getItem('token')
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        let block = localStorage.getItem('block');
        let sheetURL
        if(!localStorage.getItem('url')){
            sheetURL = ''
        } else{
            sheetURL = localStorage.getItem('url');
        }
        const response = await fetch('https://powerprogress.herokuapp.com/api/new_block', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            email,
            block,
            sheetURL,
            }),
        })

        const data = await response.json();
        // alert(data.status);
        if(data.status === 'good' || data.status === 'fine' ){
            alert('block creates');
            window.location.reload();
        } else{
            alert(data.error);
        }
    }
    function enterBlock(e){
        let blockName = e.target.value;
        if(localStorage.getItem('block') != ''){
            localStorage.removeItem('block');
            localStorage.setItem('block', blockName);
            window.location.href = '/block';

        } else{
            localStorage.setItem('block', blockName);
            window.location.href = '/block';


        }
    }
  
    async function getLifts() {
        // let block = localStorage.getItem('block');
        const req = await fetch('https://powerprogress.herokuapp.com/api/get_lift', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'block': localStorage.getItem('block')
            },
        })

        const data = await req.json();
       
        if(data.status === 'fine'){
            console.log("creating list");
            console.log(data.data);
        } else {
            alert(data.error + "test")
        }
        
    }
   
    return (
        <div>
            <Navbar />
            <div id="blocksWrapper">
            <H1>Block List</H1>
                
                <Form >
                    <span>Add Block:</span>
                    <br />
                    <Input type="text" onChange={(e) => setBlockName(e.target.value)} placeholder="Block Name"/>
                    <Input type="url" onChange={(e) => setBlockUrl(e.target.value)} placeholder="Google Sheets URL"/>
                    <Button type="submit" id="newBlock" onClick={addNewBlock}>Add New Block</Button>
                </Form>
            </div>
            <div id="populatedBlocks" onClick={enterBlock}>
                
            </div>

            
        </div>
    )
}

export default ComplexData
