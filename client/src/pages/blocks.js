import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import Navbar from '../components/navbar.component'
import jwt from 'jsonwebtoken'

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
                        const newBlock = document.createElement('button');
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
        let sheetURL = localStorage.getItem('url');;
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
            <h2>Block List</h2>
                <div id="populatedBlocks" onClick={enterBlock}>
                
                </div>
                <div class="form-group">
                    <span>Add Block:</span>
                    <input type="text" onChange={(e) => setBlockName(e.target.value)} placeholder="Block Name"></input>
                    <input type="url" onChange={(e) => setBlockUrl(e.target.value)} placeholder="Google Sheets URL"></input>
                    <button id="newBlock" onClick={addNewBlock}>Add New Block</button>
                </div>
            </div>

            
        </div>
    )
}

export default ComplexData
