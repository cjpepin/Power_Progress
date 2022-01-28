import React, { useEffect } from 'react'
import jwt from 'jsonwebtoken'
import {BrowserRouter as Router} from 'react-router-dom'
import { useState, useRef } from 'react';
import Charts from './charts.component';
import Navbar from '../components/navbar.component';
import AccessoryCharts from './accessoryCharts.component';
import styled, { css } from 'styled-components'
import $ from 'jquery';
// import './cssFiles/tableScroll.css'
// import Button from '/block.style';

const Block = () => {
    
    const name = localStorage.getItem('name');
    const [lift, setLift] = useState('squat');
    const [weight, setWeight] = useState('');
    const [lbsorkg, setLbsorkg] = useState('lb');
    const [chartlbsorkg, setChartLbsorkg] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [rpe, setRpe] = useState('');
    const [date, setDate] = useState('');
    const [totData, setTotData] = useState('');
    const [note, setNote] = useState('Click here to add a note for the block!')
    const download = function(data){
        const blob = new Blob([data], {type: 'text/csv'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'liftdata.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    }

    function blockNote(e){
        // console.log(e.key)
        e.preventDefault();
        let blockNoteIn = document.getElementById("blockNoteIn");
        let blockNoteShow = document.getElementById("blockNoteShow");
        if(e.target.id == "blockNoteShow"){
            let prevText = e.target.innerHTML;
            blockNoteIn.value = prevText;

            blockNoteShow.style.display = "none";
            blockNoteIn.style.display = "flex";
        }
    }

    function changeLborKg(e){
        e.preventDefault();
        localStorage.setItem('lborkg', e.target.value)
        window.location.reload();
    }

    function clearTable(){
        
    }

    function contentCalculations(){
        let curData = localStorage.getItem('data');
        for(const key in curData){
            if(curData.hasOwnProperty(key)){
                const curDate = curData[key].date;
                
            }
        }
    }

    async function createLift() {
        const token = localStorage.getItem('token')
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const block = localStorage.getItem('block')
        let e1rm = plateMath();
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
            }),
        })
    
        const data = await response.json();
        // alert(data.status);
        if(data.status === 'good' || data.status === 'fine' ){
            alert('Lift added');
            getLifts();
            alert('reloading window');
            window.location.reload();
        } else{
            alert("Make sure all fields are filled out");
        }
    }

    async function deleteLift(delData) {
        const token = localStorage.getItem('token')
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        let curLift = delData.lift;
        let curDate = delData.date;
        // console.log(curLift, curDate);
        const response = await fetch('http://localhost:1337/api/delete_lift', {
        method: 'POST',
        headers: {
            'x-access-token': localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            curLift,
            curDate,
        }),
        })

        const data = await response.json()
        // console.log(data.status)
        if(data.status === 'fine'){
        // alert('Lift deleted')
        
        }
    }
    
    async function getLifts() {
        // let block = localStorage.getItem('block');
        const req = await fetch('http://localhost:1337/api/get_lift', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'block': localStorage.getItem('block')
            },
        })

        const data = await req.json();
       
        if(data.status === 'fine'){
            console.log("creating list");
            console.log(data.data);
            clearTable();
            updateDataTable(data);
            setTotData(data.data, []);
            localStorage.setItem('data', data.data)
        } else {
            alert(data.error + "test")
        }
        
    }
    async function getAvailableLifts() {

    }
    async function getNote(){
        if(!(localStorage.getItem('block'))){
            return;
        }
        const token = localStorage.getItem('token')
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email

        const req = await fetch('http://localhost:1337/api/get_note', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'block': localStorage.getItem('block'),
                'email': email,
            },
        })

        const noteServ = await req.json();
       
        if(noteServ.status === 'fine'){
            console.log(noteServ.data);
            setNote(noteServ.newNote, []);
        } else {
            alert(noteServ.error)
        }
    }

    function logout(){
        window.localStorage.clear();
        window.location.href = '/login';
    }

    function parseData(data){
        const csvRows = [];
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(','));

        for(const row of data){
        const values = headers.map(header => {
            const escaped = (''+row[header]).replace(/"/g,'\\"');
            return `${escaped}`
        });
        csvRows.push(values.join(','));
        }
        return csvRows.join('\n','');
    }

    function openSheet(e){
        let url = localStorage.getItem('url');
        window.open(url);
    }

    function plateMath(){
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
        console.log(rpe);
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

    function removeRow (e){
        if(e.target.id == 'delete'){
            let row = e.target.closest("tr");
            let rowNum = row.id;
            let tempDate = row.querySelector('td').textContent;
            let tempLift = row.cells[1].textContent;
            let tempData = {lift : tempLift, date: tempDate};
    
            deleteLift(tempData);
    
            let tbody = document.getElementById('liftData');
            tbody.removeChild(row);
            
            window.location.reload();
        }
    }

    function returnToBlocks(){
        if(localStorage.getItem('block') != ''){
            localStorage.removeItem('block')
            window.location.href = '/blocks'
        }
    }

    function saveNote(e){
        let blockNoteIn = document.getElementById("blockNoteIn");
        let blockNoteShow = document.getElementById("blockNoteShow");
        if(e.key === 'Escape'){
            let prevText = e.target.value;
            console.log(prevText)
            blockNoteShow.innerHTML = prevText;
            setNote(prevText);
            updateNote(prevText);
            blockNoteShow.style.display = "flex";
            blockNoteIn.style.display = "none";
            
        }
    }

    async function toCSV() {
        const req = await fetch('http://localhost:1337/api/getCSV', {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }

    })
    const data = await req.json();
    if(data.status === 'fine'){
        console.log(data.data.data)
        if(data.data.data == ''){
        alert("You don't have any data");
        return;
        }
        console.log(parseData(data.data.data));
        download(parseData(data.data.data));
        
    } else {
        alert(data.error + "test")
    }
    }

    function tonnageLifted(){

    }

    async function updateNote(newNote) {
        const token = localStorage.getItem('token')
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const block = localStorage.getItem('block')
        if(newNote == ''){
            newNote = 'Input notes here';
        }
        const response = await fetch('http://localhost:1337/api/update_note', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                email,
                block,
                newNote,
                }),
            })

            const data = await response.json();
            // alert(data.status);
            if(data.status === 'note updated'){
                console.log('note updated')
            } else{
                alert(data.error);
            }
    }

function updateDataTable(data){
    console.log(data)
    const liftData = data.data;
    console.log(liftData);
    const entries = []
    let firstNode = document.getElementById('liftData');
        while (firstNode.childNodes.length > 1) {
        firstNode.removeChild(firstNode.firstChild);
        }
        let weight;
        let e1rm;
    for(let i = 0; i < liftData.length; i++){
        
        if(liftData[i]['lbsorkg'] == 'lb'){
        weight = parseInt(liftData[i]['weight']);
        let weightInKg = weight / 2.2;
        weight = Math.round(weightInKg*100)/100 + 'kg/' + Math.round(weight*100)/100 + 'lbs';

        e1rm = parseInt(liftData[i]['e1rm']);
        let e1rmInKg = e1rm/2.2;
        e1rm = Math.round(e1rmInKg*100)/100 + 'kg/' + Math.round(e1rm*100)/100 + 'lbs';

        } else if(liftData[i]['lbsorkg'] == 'kg'){
        weight = parseInt(liftData[i]['weight'])
        let weightInLbs = weight * 2.2
        weight = Math.round(weight*100)/100 + 'kg/' + Math.round(weightInLbs*100)/100 + 'lbs'

        e1rm = parseInt(liftData[i]['e1rm']);
        let e1rmInLbs = e1rm*2.2;
        e1rm = Math.round(e1rm*100)/100 + 'kg/' + Math.round(e1rmInLbs*100)/100 + 'lbs';
        }
        firstNode.innerHTML += `
        <tr id=${liftData[i]['_id']}>
            <td id="date" contenteditable="true" >${liftData[i]['date']}</td>
            <td id="lift" contenteditable="true">${liftData[i]['lift']}</td>
            <td id="weight">${weight}</td>
            <td id="rpe" contenteditable="true">${liftData[i]['rpe']}</td>
            <td id="reps" contenteditable="true">${liftData[i]['reps']}</td>
            <td id="sets" contenteditable="true">${liftData[i]['sets']}</td>
            <td id="e1rm">${e1rm}</td>
            <td id="delete" ><button id="delete">delete</button></td>
        </tr>
        `
    }
    }

    async function updateDatabase(e) {
        const value = e.innerHTML;
        let id = e.closest('tr').id;
        let varChanged = e.id
        const response = await fetch('http://localhost:1337/api/update_lift', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                id,
                value,
                varChanged,
                }),
            })
        const data = await response.json();
        if(data.status == 'lift updated'){
            console.log('update success')
        } else {
            console.log(data.error)
        }
        const req = await fetch('http://localhost:1337/api/get_sheet', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'block': localStorage.getItem('block')
            },
        })
        const dataSheet = await req.json();
        const dataSheetJson = JSON.parse(dataSheet.data.sheetData);
        let curVar;
        let idArr = [];
        let varChangedArr = []
        let rowTarget;
        let colTarget;
        if(varChanged == 'lift'){
            curVar = 'Lift'
        } else if(varChanged == 'rpe'){
            curVar = 'RPE'
        } else if(varChanged == 'reps'){
            curVar = 'Reps'
        } else if(varChanged == 'sets'){
            curVar = 'Sets'
        }
        for (let i=0 ; i < dataSheetJson.length ; i++){
            for(let j =0; j < dataSheetJson[i].length; j++){
                if(i == 0){
                    if(dataSheetJson[i][j] == 'id'){
                        idArr.push(j)
                    }
                    if(dataSheetJson[i][j] == curVar){
                        varChangedArr.push(j)
                    }
                
                }
                console.log(idArr, varChangedArr)
                if(idArr.includes(j) && dataSheetJson[i][j] == id){
                    console.log("test")
                    rowTarget = i
                    colTarget = varChangedArr[idArr.indexOf(j)]
                    dataSheetJson[rowTarget][colTarget] = value;
                    console.log(dataSheetJson);
                    updateTable(JSON.stringify(dataSheetJson));
                }
                
            }
            // if (dataSheetJson[i][searchField] == searchVal) {
            //     // results.push(obj.list[i]);
            // }
        }
    }

    async function updateTable(sheetData) {
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
    useEffect(() => {
        getLifts();
        console.log(lbsorkg);
    }, []);
    useEffect(() => {
        getNote();
        updateNote();
        console.log(lbsorkg);
    }, []);



    const Wrapper = styled.div`
        margin-left: 10vw;
        margin-right: 10vw;
    
    `
    const Title = styled.h1`
        display: flex;
        align-items: center;
        justify-content: center;`

    const Form = styled.div`
        display: flex;
        align-items: center;
        padding: 10px;
        margin: 5px;
        box-shadow: 4px;
    `
    const Notes = styled.div`
    
    `
    return (
        <div>
            <div id="inputBlockData">
                <Navbar />
                <Wrapper>
                <div>
                    <div>
                        <Title>Welcome {name}</Title> 
                        <Title>Block Name: {localStorage.getItem('block')}</Title> 
                        {/* <button onClick={openSheet}>Program Sheet</button> */}
                        <br/>
                        <br/>
                        <h3>Block Notes</h3>
                        <Notes>
                            <span 
                                id="blockNoteShow" 
                                style={{display: "flex", whiteSpace: "pre-line", marginLeft: "20px", marginRight: "20%", marginTop: "40px"}}  
                                onClick={blockNote}>{note}
                            </span>
                            <textarea 
                                id="blockNoteIn" 
                                style={{display: "none", width: "90%", height: "100px", marginLeft: "20px", marginRight: "10%", marginTop: "20px"}} 
                                onKeyDown={saveNote}/>
                        </Notes>
                        
                </div>
                <br/>
                <Form>
                    <input type="date" style={{minWidth: "40px;"}} onChange={(e) => setDate(e.target.value)}/>
                    <select onChange={(e) => setLift(e.target.value)}>
                        <option defaultValue="squat">Squat</option>
                        <option value="bench">Bench</option>
                        <option value="deadlift">Deadlift</option>
                        <option value="pause squat">Pause Squat</option>
                        <option value="pause bench">Pause Bench</option>
                        <option value="pause deadlift">Pause Deadlift</option>
                        <option value="leg press">Leg Press</option>
                        <option value="rdl">Romanian Deadlift</option>
                        <option value="dumbbell bench">Dumbbell Bench</option>
                    </select>
                    
                    <input type="number" name="weight" placeholder="How much weight?" step="0.25" onChange={(e) => setWeight(e.target.value)}/>
                    <select onChange={(e) => setLbsorkg(e.target.value)}>
                        <option defaultValue="lb">lb</option>
                        <option value="kg">kg</option>
                    </select>
                    <input type="number" name="reps" placeholder="How many reps?" step="1"  onChange={(e) => setReps(e.target.value)}/>
                    <input type="number" name="sets" placeholder="How many sets?" step="1"  onChange={(e) => setSets(e.target.value)}/>
                    <input type="number" name="rpe" placeholder="What was the RPE?" step="0.5"  onChange={(e) => setRpe(e.target.value)}/>
                    <input type="submit" value="Add Lift" onClick={createLift}/>
                    <input type="submit" value="Download CSV" onClick={toCSV}/>
                </Form>
                
                </div>
                </Wrapper>

                <div id="testTable" class="table-editable" style={{maxHeight: "250px", overflowY: "auto", borderStyle: "solid", borderWidth: "2px",marginLeft: '5vw', marginRight: '5vw'}}>
                    <table class="table" id="dataTable" onClick={removeRow} onInput={(e) => updateDatabase(e.target)}>
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Lift</th>
                        <th>Weight</th>
                        <th>Rpe</th>
                        <th>Reps</th>
                        <th>Sets</th>
                        <th>Estimated 1rm</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                        <tbody id="liftData">

                        </tbody>
                        <tbody id='startHere'>

                        </tbody>
                    </table>
                </div>
                <br />
                <div style={{display: "flex", justifyContent: "center"}}>
                    Chart Weight in &nbsp; 
                                    <select defaultValue={localStorage.getItem('lborkg')} onChange={(e) => changeLborKg(e)}>
                                        <option value="lb">lb</option>
                                        <option value="kg">kg</option>
                                    </select>
                </div>
                <div>
                    <h2>Big 3</h2>
                    <Charts />
                </div>
                <div>
                    <h1>Accessories</h1>
                    <AccessoryCharts />
                </div>
                <div>
                    <h1>Lift Calculations</h1>
                    <div className="calculationsTable"></div>
                </div>
                
            </div>
            <div id="googleSheetstesting">


            </div>
                
        </div>
    )
}

export default Block
