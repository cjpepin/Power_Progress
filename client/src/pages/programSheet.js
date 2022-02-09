import React, { useRef, useEffect, useState } from "react";
import {BrowserRouter as Prompt} from 'react-router-dom';
import jspreadsheet from "jspreadsheet-ce";
import jwt from 'jsonwebtoken'
import "../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css";
import Navbar from '../components/navbar.component'
import styled from 'styled-components'
import DOMPurify from 'dompurify'

// https://powerprogress.herokuapp.com/
// https://powerprogress.herokuapp.com/

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
const ButtonWrapper = styled.div`
  color: rgb(142,174,189);
  background-color: rgb(15,22,40);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 25px;

  border-radius: 5px;
  padding: 5px;
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
const Button = styled.input`
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
export default function App() {
    function checkUpdate(e) {
        if(e.target.className != "selected" && e.target.className != "draggable" && e.target.className != "highlight-selected highlight highlight-top highlight-bottom highlight-left highlight-right" && e.target.className != "jexcel_content" && e.target.className != "jexcel_selectall" && e.target.className != "jexcel_corner" && e.target.style.width != "50px" && e.target.className != "copying copying-left copying-right highlight-selected highlight highlight-top highlight-bottom highlight-left highlight-right" && e.target.className != "highlight highlight-bottom highlight-left highlight-right"){
            // updateTable();
            console.log("being activated")
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
        console.log(localStorage.getItem('block'))
        const req = await fetch('https://powerprogress.herokuapp.com/api/get_sheet', {
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'block': localStorage.getItem('block')
                },
            })

            const sheetData = await req.json();
            let options;
            const sheetDiv = document.getElementById('spreadsheet')
            if(sheetDiv.hasChildNodes()){
                while ( sheetDiv.firstChild ) sheetDiv.removeChild( sheetDiv.firstChild );
            }
            if(sheetData.status === 'fine'){
                if(sheetData.data){
                    let newData = await sheetData.data.sheetData;
                    newData = JSON.parse(newData);
                    setData(newData)
                    options = {
                        data: newData,
                        minDimensions: [numRows, numCols]
                    };
                    jspreadsheet(jRef.current, options);
                } else {
                    options = {
                        data: [],
                        minDimensions: [15, 15]
                        }
                    jspreadsheet(jRef.current, options);
            }
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
            let sheetData = DOMPurify.sanitize(JSON.stringify(jRef.current.jexcel.getData()))

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
            token,
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
        if(curData.status === 'good'){
            console.log("lifts added to mongo")
            return curData.id;
        } else if(curData.status === 'exists'){
            console.log(curData.status);
            return curData.id;
        }
    }
    async function addLiftToLibrary(lift) {
        const token = localStorage.getItem('token')
        
        // console.log(lift)
        const response = await fetch('https://powerprogress.herokuapp.com/api/lift_list', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            token,
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
        let blockName = DOMPurify.sanitize(e.target.value);
        if(localStorage.getItem('block') != ''){
            // localStorage.removeItem('block');
            localStorage.setItem('block', blockName);
            console.log(blockName)
            getSheet();

        } else{
            localStorage.setItem('block', blockName);
            console.log(blockName)
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
                                    console.log(curLiftArr);
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
        updateTable();
        
    }
    async function updateDatabase(e) {
        const value = DOMPurify.sanitize(e.value);
        if(e.value == ''){
            return;
        }
        const xCoord = parseInt(e.closest('td').dataset.x);
        const yCoord = parseInt(e.closest('td').dataset.y);
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
                    const id = DOMPurify.sanitize(data[rowTarget][colTarget])
                    console.log(id)
                    let block = localStorage.getItem('block');
                    const response = await fetch('https://powerprogress.herokuapp.com/api/update_lift', {
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
                    if(updatedSheet.status == 'lift updated'){
                        // console.log(jRef.current.jspreadsheet.getData())
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

    async function getExampleWeek(){
        const req = await fetch('https://powerprogress.herokuapp.com/api/get_sheet', {
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'block': "exampleSheetTest123"
                },
            })
            
            const sheetData = await req.json();
            let options;
            const sheetDiv = document.getElementById('spreadsheet')
            console.log('test2')
        
            while ( sheetDiv.firstChild ) sheetDiv.removeChild( sheetDiv.firstChild );

            
            if(sheetData.status === 'fine'){
                if(sheetData.data){
                    let newData = await sheetData.data.sheetData;
                    newData = JSON.parse(newData);
                    setData(newData)
                    localStorage.setItem('block', 'example')
                    let readOnlyArr = []
                    for(const key in newData){
                        if(newData.hasOwnProperty(key)){
                            if(key == 0){
                                for(const col in newData[key]){
                                    if(newData[key].hasOwnProperty(col)){
                                        readOnlyArr.push({readOnly: true})
                                    }
                                }
                            }
                        }
                    }
                    options = {
                        data: newData,
                        columns: readOnlyArr,
                        minDimensions: [numRows, numCols]
                    };
                    jspreadsheet(jRef.current, options);
                }
            }

    }
    function getAction(e){
        if(localStorage.getItem('block') == 'example'){
            return;
        } else if(e.target.id == "addRow"){
            addRow();
        }else if(e.target.id == "addCol"){
            addCol();
        }else if(e.target.id == "remRow"){
            removeRow();
        }else if(e.target.id == "remCol"){
            removeCol();
        }else if(e.target.id == "updateTable"){
            updateTable();
        }else if(e.target.id == "populateIds"){
            populateIds();
        }else if(e.target.id == "getExampleWeek"){
            console.log('test1')
            getExampleWeek();
        }
    }
    return (
        <div 
        // onClick={checkUpdate} 
        onInput={(e) => {updateDatabase(e.target)}}>
            <Navbar/>
        <div id="blocksList">
            <H1>Block List</H1>
                <ButtonWrapper id="populatedBlocks" onClick={enterBlock}>
                
                </ButtonWrapper>
        </div>
        <ButtonWrapper>
            <Button type="button" id="addRow" onClick={getAction} value="Add new row" />
            <Button type="button" id="addCol" onClick={getAction} value="Add new column" />
            <Button type="button" id="remRow" onClick={getAction} value="Remove row" />
            <Button type="button" id="remCol" onClick={getAction} value="Remove column" />
            <Button type="button" id="updateTable" onClick={getAction} value="Save Sheet" />
            <Button type="button" id="populateIds" onClick={getAction} value="Populate Ids" />
            <Button type="button" id="getExampleWeek" onClick={getAction} value="Example Sheet" />
        </ButtonWrapper>
        
        <br/>
        <div ref={jRef} id="spreadsheet"/>
        <br />
        </div>
    );
}
