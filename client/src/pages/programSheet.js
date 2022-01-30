import React, { useRef, useEffect, useState } from "react";
import {BrowserRouter as Prompt} from 'react-router-dom';
import jspreadsheet from "jspreadsheet-ce";
import jwt from 'jsonwebtoken'
import "../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css";
import Navbar from '../components/navbar.component'
import myForm from '../components/myForm'
// http://localhost:1337/
// http://localhost3000/
export default function App() {
    function checkUpdate(e) {
        console.log(e.target)

        if(e.target.className != "selected" && e.target.className != "draggable" && e.target.className != "highlight-selected highlight highlight-top highlight-bottom highlight-left highlight-right" && e.target.className != "jexcel_content" && e.target.className != "jexcel_selectall" && e.target.className != "jexcel_corner" && e.target.style.width != "50px" && e.target.className != "copying copying-left copying-right highlight-selected highlight highlight-top highlight-bottom highlight-left highlight-right" && e.target.className != "highlight highlight-bottom highlight-left highlight-right"){
            updateTable();
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
        const req = await fetch('http://localhost:1337/api/get_sheet', {
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'block': localStorage.getItem('block')
                },
            })

            const sheetData = await req.json();
            let options;
            if(sheetData.status === 'fine'){
                if(sheetData.data){
                    let newData = await sheetData.data.sheetData;
                    console.log(newData)
                    newData = JSON.parse(newData);
                    setData(newData)
                    options = {
                        data: newData,
                        minDimensions: [numRows, numCols]
                    };
                } 
            } else {
                options = {
                    data: [],
                    minDimensions: [numRows, numCols]
                // alert(sheetData.error + "test")
            }
        }
            if (!jRef.current.jspreadsheet) {
                jspreadsheet(jRef.current, options);
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
        if(jRef.current.jexcel){
            let sheetData = JSON.stringify(jRef.current.jexcel.getData())
            const token = localStorage.getItem('token')
            const decoded = jwt.verify(token, 'secret123')
            const email = decoded.email
            const block = localStorage.getItem('block')
            const response = await fetch('http://localhost:1337/api/update_sheet', {
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
    async function createLift(lift, sets, weight, lbsorkg, reps, rpe, date, id) {
        const token = localStorage.getItem('token')
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const block = localStorage.getItem('block')
        let e1rm = plateMath(rpe, reps, weight);
        if(lbsorkg == ''){
            lbsorkg = 'lb';
        }
        const response = await fetch('http://localhost:1337/api/new_lift', {
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
            id,
            }),
        })
    
        const curData = await response.json();
        // alert(data.status);
        if(curData.status === 'good' || curData.status === 'fine' ){
            console.log("lifts added to mongo")
            console.log(curData.id)
            return curData.id;
        } else if(curData.status === 'exists'){
            console.log(curData.status);
            return curData.id;
        }
    }
    async function addLiftToLibrary(lift) {
        const token = localStorage.getItem('token')
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        // console.log(lift)
        const response = await fetch('http://localhost:1337/api/lift_list', {
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
            
        const req = await fetch('http://localhost:1337/api/get_blocks', {
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
        const req = await fetch('http://localhost:1337/api/delete_lifts', {
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
    function populateIds(e){
        let liftArr = [];
        let setsArr = [];
        let repsArr = [];
        let rpeArr = [];
        let lbsorkgArr = [];
        let weightArr = [];
        let datesArr = [];
        let idArr = [];
        let curLiftArr = [];
        if(data){
            for(let i = 0; i <data.length; i++){
                if(jRef.current.jexcel){
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
                            }else if(curRow[j] === "id"){
                                idArr.push(j);
                            }
                        }
                    }
                    let curLift;
                    let curSets;
                    let curReps;
                    let curWeight;
                    let curRPE;
                    let curDate;
                    let curId;
                    let curLbsorKg;
                    for(let j=0; j< curRow.length; j++){
        
                        // console.log(curLiftArr)
                            if(curLift && curSets && curReps && curWeight && curRPE && curDate && curLbsorKg && curId){
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
                            } else if(idArr.includes(j)){
                                curId = jRef.current.jexcel.getCell([j,i]).innerHTML
                                if(curLift != "Lift"  && curLift != '' && curSets != '' && curReps != '' && curWeight != '' && curRPE != '' && curDate != '' && curLbsorKg != ''){
                                    
                                    // console.log(curLift, curSets, curReps, curWeight, curRPE, curDate, curLbsorKg)
                                    createLift(curLift, curSets, curWeight, curLbsorKg, curReps, curRPE, curDate).then(curData => {
                                            if(jRef.current){
                                                // if(jRef.current.jexcel.getCell([j,i]).innerHTML == '' || jRef.current.jexcel.getCell([j,i]).innerHTML == 'undefined' ){
                                                    jRef.current.jexcel.setValueFromCoords(j,i,curData,true);

                                                // }
                                            }
                                        });
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
                    }
                }
                
            }
        }

        // console.log(data.length)
        
    }
    async function updateDatabase(e) {
        const value = e.value;
        if(e.value == ''){
            return;
        }
        const xCoord = parseInt(e.closest('td').dataset.x);
        const yCoord = parseInt(e.closest('td').dataset.y);
        console.log(xCoord,yCoord)
        let varChanged;
        let liftArr = [];
        let setsArr = [];
        let repsArr = [];
        let weightArr = [];
        let lbsorkgArr = [];
        let rpeArr = [];
        let dateArr = [];
        let idArr = [];
        let colTarget;
        for (let i=0 ; i < data.length ; i++){
            for(let j =0; j < data[i].length; j++){
                if(i == 0){
                    if(data[i][j] == 'id'){
                        idArr.push(j)
                    } else if(data[i][j] == 'Lift'){
                        liftArr.push(j)
                    } else if(data[i][j] == 'Sets'){
                        setsArr.push(j)
                    } else if(data[i][j] == 'Reps'){
                        repsArr.push(j)
                    } else if(data[i][j] == 'Weight'){
                        weightArr.push(j)
                    } else if(data[i][j] == 'Lbs or KG'){
                        lbsorkgArr.push(j)
                    } else if(data[i][j] == 'RPE'){
                        rpeArr.push(j)
                    } else if(data[i][j] == 'Date'){
                        dateArr.push(j)
                    }
                    // if(data[i][j] == curVar){
                    //     varChangedArr.push(j)
                    // }
                } else if(i == yCoord){
                    console.log(i, yCoord, "test")
                    if(liftArr.includes(xCoord)){
                        varChanged = 'lift';
                        colTarget = idArr[liftArr.indexOf(xCoord)]
                    } else if(setsArr.includes(xCoord)){
                        varChanged = 'sets'
                        colTarget = idArr[setsArr.indexOf(xCoord)]
                    } else if(repsArr.includes(xCoord)){
                        varChanged = 'reps'
                        colTarget = idArr[repsArr.indexOf(xCoord)]
                    } else if(weightArr.includes(xCoord)){
                        varChanged = 'weight'
                        colTarget = idArr[weightArr.indexOf(xCoord)]
                    } else if(lbsorkgArr.includes(xCoord)){
                        varChanged = 'lbsorkg'
                        colTarget = idArr[lbsorkgArr.indexOf(xCoord)]
                    } else if(rpeArr.includes(xCoord)){
                        varChanged = 'rpe'
                        colTarget = idArr[rpeArr.indexOf(xCoord)]
                    } else if(dateArr.includes(xCoord)){
                        varChanged = 'date'
                        colTarget = idArr[dateArr.indexOf(xCoord)]
                    }
                    const rowTarget = i
                    const id = data[rowTarget][colTarget]
                    console.log(id)
                    let block = localStorage.getItem('block');
                    const response = await fetch('http://localhost:1337/api/update_lift', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                        block,
                        id,
                        value,
                        varChanged,
                        }),
                    })

                    const updatedSheet = await response.json();
                    console.log(updatedSheet)
                    if(updatedSheet.status == 'lift updated'){
                        console.log(jRef.current.jspreadsheet.getData())
                        updateTable();
                        console.log('update success')
                        break;
                    } else {
                        console.log(updatedSheet.error)
                        break;
                    }
                }
                
            }
            }
    }

    async function updateHTMLTable(sheetData) {
            const token = localStorage.getItem('token')
            const decoded = jwt.verify(token, 'secret123')
            const email = decoded.email
            const block = localStorage.getItem('block')
            const response = await fetch('http://localhost:1337/api/update_sheet', {
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
    return (
        <div onClick={checkUpdate} onInput={(e) => {updateDatabase(e.target)}}>
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
        <input type="button" onClick={populateIds} value="Populate Ids" />
        <br/>
        <div ref={jRef}/>
        <br />
        </div>
    );
}
