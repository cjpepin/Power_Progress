import React, { useRef, useEffect, useState } from "react";
import {BrowserRouter as Prompt} from 'react-router-dom';
import jspreadsheet from "jspreadsheet-ce";
import jwt from 'jsonwebtoken'
import "../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css";
import Navbar from '../components/navbar.component'
import myForm from '../components/myForm'
// https://powerprogress.herokuapp.com/
export default function App() {
    function checkUpdate(e) {
        e.preventDefault();
        let clickNum = 0;
        if(clickNum === 0 && e.target.className != "selected" && e.target.className != "draggable" && e.target.className != "highlight-selected highlight highlight-top highlight-bottom highlight-left highlight-right" && e.target.className != "jexcel_content" && e.target.className != "jexcel_selectall" && e.target.className != "jexcel_corner" && e.target.style.width != "50px" && e.target.className != "copying copying-left copying-right highlight-selected highlight highlight-top highlight-bottom highlight-left highlight-right" && e.target.className != "highlight highlight-bottom highlight-left highlight-right"){
            console.log(e.target)
            clickNum = 1;
            updateTable();
            searchThroughData();
        }
    }
    const jRef = useRef(null);
    const [numRows, setNumRows] = useState(15);
    const [numCols, setNumCols] = useState(15);
    const [data, setData] = useState([[]]);

    async function getSheet(){
        if(!localStorage.getItem('block')){
            return;
        }
        const req = await fetch('https://powerprogress.herokuapp.com/api/get_sheet', {
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'block': localStorage.getItem('block')
                },
            })

            const sheetData = await req.json();
            if(sheetData.status === 'fine'){
                let newData = await sheetData.data.sheetData;
                newData = JSON.parse(newData);
                setData(newData)
            
                const options = {
                    data: newData,
                    minDimensions: [numRows, numCols]
                };
                if (!jRef.current.jspreadsheet) {
                    jspreadsheet(jRef.current, options);
                    }
            } else {
                alert(sheetData.error + "test")
            }
    }

    useEffect(() => {
        getSheet();
    }, [])

    const addRow = () => {
        jRef.current.jexcel.insertRow();
        setNumRows(+numRows + 1) 
    };
    const addCol = () => {
        jRef.current.jexcel.insertColumn();
        setNumCols(+numCols + 1) 
    };
    const removeRow = () => {
        jRef.current.jexcel.deleteRow();
        if(numRows > 1){
            setNumRows(numRows - 1) 
        } else{
            return;
        }
    };
    const removeCol = () => {
        jRef.current.jexcel.deleteColumn();
        if(numCols > 1){
            setNumCols(numCols - 1) 
        } else {
            return;
        }
        
    };
    async function updateTable() {
        let sheetData = JSON.stringify(jRef.current.jexcel.getData())
        const token = localStorage.getItem('token')
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const block = localStorage.getItem('block')
        const response = await fetch('https://powerprogress.herokuapp.com/api/update_sheet', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            email,
            block,
            sheetData,
            }),
        })

        const data = await response.json();

        // alert(data.status);
        if(data.status === 'sheet updated'){
            console.log('SheetUpdated');
        } else{
            console.log("Something went wrong" + data.error);
        }

    }
    function plateMath(rpe, reps, weight){
        const rpeArr = new Object;
              rpeArr["10"] = 1;
              rpeArr["9.5"] = 0.978;
              rpeArr["9"] = 0.955;
              rpeArr["8.5"] = 0.939;
              rpeArr["8"] = 0.922;
              rpeArr["7.5"] = 0.907;
              rpeArr["7"] = 0.892;
              rpeArr["6.5"] = 0.878;
              rpeArr["6"] = 0.863;
              rpeArr["5.5"] = 0.848;
              rpeArr["5"] = 0.834;
        if(rpe > 10 || rpe < 5){
          alert("put in a real rpe!");
          return;
        }
        const rpeReps = (10 - parseInt(rpe));
        const totReps = (+rpeReps + +reps);
        let diffQ = ((100 - (totReps*2.5))/100);
        let e1rm = weight/diffQ;
        e1rm = Math.round(e1rm * 100)/100;
        return e1rm;
    }
    async function createLift(lift, sets, weight, lbsorkg, reps, rpe, date) {
        const token = localStorage.getItem('token')
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const block = localStorage.getItem('block')
        let e1rm = plateMath(rpe, reps, weight);
        if(lbsorkg == ''){
            lbsorkg = 'lb';
        }
        const response = await fetch('https://powerprogress.herokuapp.com/api/new_lift', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            email,
            lift,
            weight,
            lbsorkg,
            reps,
            sets,
            rpe,
            date,
            e1rm,
            block,
            }),
        })
    
        const data = await response.json();
        // alert(data.status);
        if(data.status === 'good' || data.status === 'fine' ){
            console.log("lifts added to mongo")
        } else{
            console.log(data.status);
        }
    }
    async function addLiftToLibrary(lift) {
        const token = localStorage.getItem('token')
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        // console.log(lift)
        const response = await fetch('https://powerprogress.herokuapp.com/api/lift_list', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            email,
            lift,
            }),
        })

        const data = await response.json();
        if(data.status === 'good'){
            console.log('Lift added' + lift);
        } else{
            // console.log("Lift exists");
            return;
        }

    }
    function enterBlock(e){
        if(e.target.id == "populatedBlocks"){
            return;
        }
        let blockName = e.target.value;
        if(localStorage.getItem('block') != ''){
            localStorage.removeItem('block');
            localStorage.setItem('block', blockName);
            getSheet();

        } else{
            localStorage.setItem('block', blockName);
            getSheet();
        }
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
            // console.log(totData)
            let blockList = [];
            let blockDiv = document.getElementById("populatedBlocks");
            let newBlockButton = document.getElementById("newBlock");
            for(let key in totData){
                // console.log(key)
                if(totData.hasOwnProperty(key)){
                    let curBlock = totData[key].blockName
                    // console.log(curBlock)
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
    useEffect(() =>{
        populateBlocks();
    }, [])
    async function deleteWorkoutsCollection (){
        // console.log("test");
        const req = await fetch('https://powerprogress.herokuapp.com/api/delete_lifts', {
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'block': localStorage.getItem('block')
                },
            });
        // console.log("test2")
        const res = await req.json();
        if(res.status === 'fine'){
            console.log("lifts have been deleted and are ready to be repopulated!")
        } else {
            alert(res.error + "test")
        }
    }
    function searchThroughData(e){
        deleteWorkoutsCollection();
        let totObj = []
        let curObj = {};
        let liftArr = [];
        let setsArr = [];
        let repsArr = [];
        let rpeArr = [];
        let lbsorkgArr = [];
        let weightArr = [];
        let datesArr = [];
        let curLiftArr = [];

        // console.log(data.length)
        for(let i = 0; i <data.length; i++){
            let curRow = jRef.current.jexcel.getRowData(i)

            if(i === 0){
                for(let j = 0; j <= curRow.length; j++){
                    if(curRow[j] === "Lift"){
                        liftArr.push(j);
                    }else if(curRow[j] === "Sets"){
                        setsArr.push(j);
                    }else if(curRow[j] === "Reps"){
                        repsArr.push(j);
                    }else if(curRow[j] === "Weight"){
                        weightArr.push(j);
                    }else if(curRow[j] === "RPE"){
                        rpeArr.push(j);
                    }else if(curRow[j] === "Date"){
                        datesArr.push(j);
                    }else if(curRow[j] === "Lbs or KG"){
                        lbsorkgArr.push(j);
                    }
                }
            }
            let curLift;
            let curSets;
            let curReps;
            let curWeight;
            let curRPE;
            let curDate;
            let curLbsorKg;
            for(let j=0; j< curRow.length; j++){

                // console.log(curLiftArr)
                    if(curLift && curSets && curReps && curWeight && curRPE && curDate && curLbsorKg){
                        continue;
                    }
                    if(liftArr.includes(j)){
                        curLift = jRef.current.jexcel.getCell([j,i]).innerHTML
                    } else if(setsArr.includes(j)){
                        curSets = jRef.current.jexcel.getCell([j,i]).innerHTML
                    } else if(repsArr.includes(j)){
                        curReps = jRef.current.jexcel.getCell([j,i]).innerHTML
                    } else if(weightArr.includes(j)){
                        curWeight = jRef.current.jexcel.getCell([j,i]).innerHTML
                    } else if(rpeArr.includes(j)){
                        curRPE = jRef.current.jexcel.getCell([j,i]).innerHTML
                    } else if(lbsorkgArr.includes(j)){
                        curLbsorKg = jRef.current.jexcel.getCell([j,i]).innerHTML
                    } else if(datesArr.includes(j)){
                        curDate = jRef.current.jexcel.getCell([j,i]).innerHTML
                        if(curLift != "Lift"  && curLift != '' && curSets != '' && curReps != '' && curWeight != '' && curRPE != '' && curDate != '' && curLbsorKg != ''){
                            // console.log(curLift, curSets, curReps, curWeight, curRPE, curDate, curLbsorKg)
                            createLift(curLift, curSets, curWeight, curLbsorKg, curReps, curRPE, curDate);
                            if(!curLiftArr.includes(curLift)){
                                curLiftArr.push(curLift)
                                addLiftToLibrary(curLift);
                            } 
                            curLift = '';
                            curSets = '';
                            curReps = '';
                            curWeight = '';
                            curRPE = '';
                            curDate = '';
                        } 
                    }
                // if(curLift != undefined && curSets != undefined && curReps != undefined && curWeight != undefined && curRPE != undefined && curDate != undefined && curLift != '' && curRPE != '' && curReps != '' && curWeight != '' && curSets != '' && curDate != ''){
                //     console.log(curLift, curSets, curReps, curWeight, curRPE, curDate)
                // }
            }
        }
    }
    // window.onbeforeunload = (event) => {
    //     const e = event || window.event;
    //     // Cancel the event
    //     e.preventDefault();
    //     if (e) {
    //       e.returnValue = ''; // Legacy method for cross browser support
    //     }
    //     return ''; // Legacy method for cross browser support
    //   };
    
    return (
        <div onClick={checkUpdate}>
            <Navbar/>
        <div id="blocksList">
            <h2>Block List</h2>
                <div id="populatedBlocks" onClick={enterBlock}>
                
                </div>
        </div>
        
        <input type="button" onClick={addRow} value="Add new row" />
        <input type="button" onClick={addCol} value="Add new column" />
        <input type="button" onClick={removeRow} value="Remove row" />
        <input type="button" onClick={removeCol} value="Remove column" />
        <input type="button" onClick={updateTable} value="Save Sheet" />
        <input type="button" onClick={searchThroughData} value="Update Lift Data" />
        <br/>
        <div ref={jRef}/>
        <br />
        </div>
    );
}
