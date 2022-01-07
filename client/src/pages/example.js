import React, { useEffect } from 'react'
import jwt from 'jsonwebtoken'
import {useNavigate} from 'react-router-dom'
import { useState, useRef } from 'react';
import Charts from './example.charts';


const Dashboard = () => {
    const name = localStorage.getItem('name');
    const history = useNavigate()
    const [lift, setLift] = useState('squat')
    const [weight, setWeight] = useState('')
    const [lbsorkg, setLbsorkg] = useState('lb')
    const [reps, setReps] = useState('')
    const [rpe, setRpe] = useState('')
    const [date, setDate] = useState('')
    const [totData, setTotData] = useState('')

    // function plateMath(){
    //   const rpeArr = new Object;
    //         rpeArr["10"] = 1;
    //         rpeArr["9.5"] = 0.978;
    //         rpeArr["9"] = 0.955;
    //         rpeArr["8.5"] = 0.939;
    //         rpeArr["8"] = 0.922;
    //         rpeArr["7.5"] = 0.907;
    //         rpeArr["7"] = 0.892;
    //         rpeArr["6.5"] = 0.878;
    //         rpeArr["6"] = 0.863;
    //         rpeArr["5.5"] = 0.848;
    //         rpeArr["5"] = 0.834;
    //   console.log(rpe);
    //   const rpeReps = (10 - parseInt(rpe));
    //   const totReps = (+rpeReps + +reps);
    //   let diffQ = ((100 - (totReps*2.5))/100);
    //   let e1rm = weight/diffQ;
    //   e1rm = Math.round(e1rm * 100)/100;
    //   return e1rm;
    // }
    function updateTable(data){
      console.log(data)
      const liftData = data;
      const entries = []
      let firstNode = document.getElementById('liftData');
        while (firstNode.childNodes.length > 1) {
          firstNode.removeChild(firstNode.firstChild);
        }
      for(const key in liftData){
        if(liftData.hasOwnProperty(key)){
            console.log(`row ${key}`)
            firstNode.innerHTML += `
            <tr id=${key}>
            <td id="date">${liftData[key]['date']}</td>
            <td id="lift">${liftData[key]['lift']}</td>
            <td id="weight">${liftData[key]['weight']}</td>
            <td id="rpe">${liftData[key]['rpe']}</td>
            <td id="reps">${liftData[key]['reps']}</td>
            <td><button id="delete" class="deletebutton">Delete</button></td>
            </tr>
            `
        }
      }
    }

    function clearTable(){
        
    }
  
    function createLift() {
        const token = localStorage.getItem('token')
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        console.log(lbsorkg);
        if(lbsorkg == ''){
          lbsorkg = 'lb';
        }
        
    
        
        // alert(data.status);
        // if(data.status === 'good' || data.status === 'fine' ){
        //   alert('Lift added');
        //   getLifts();
        //   alert('reloading window');
        //   window.location.reload();
        // } else{
        //   alert("Make sure all fields are filled out");
        // }
      }

    function getLifts() {
        let thisData = {
                        0: {date: "12-01-21",
                            lift: "squat",
                            weight: "180",
                            lbsorkg: "kg",
                            reps: "1",
                            rpe: "7"},
                        1: {date: "12-01-21",
                            lift: "bench",
                            weight: "100",
                            lbsorkg: "kg",
                            reps: "1",
                            rpe: "7"},
                        2: {date: "12-01-21",
                            lift: "deadlift",
                            weight: "225",
                            lbsorkg: "kg",
                            reps: "1",
                            rpe: "7"},
                        3: {date: "12-02-21",
                            lift: "squat",
                            weight: "185",
                            lbsorkg: "kg",
                            reps: "1",
                            rpe: "7"},
                        4: {date: "12-02-21",
                            lift: "bench",
                            weight: "105",
                            lbsorkg: "kg",
                            reps: "1",
                            rpe: "7"},  
                        5: {date: "12-02-21",
                            lift: "deadlift",
                            weight: "230",
                            lbsorkg: "kg",
                            reps: "1",
                            rpe: "7"},
                        6: {date: "12-03-21",
                            lift: "squat",
                            weight: "190",
                            lbsorkg: "kg",
                            reps: "1",
                            rpe: "8"},
                        7: {date: "12-03-21",
                            lift: "bench",
                            weight: "110",
                            lbsorkg: "kg",
                            reps: "1",
                            rpe: "7"},
                        8: {date: "12-03-21",
                            lift: "deadlift",
                            weight: "235",
                            lbsorkg: "kg",
                            reps: "1",
                            rpe: "7"},
                        9: {date: "12-04-21",
                            lift: "squat",
                            weight: "195",
                            lbsorkg: "kg",
                            reps: "1",
                            rpe: "9.5"}
                        }
            
            clearTable();
            updateTable(thisData);
            setTotData(thisData, []);   
    }

    
    useEffect(() => {
      getLifts();
      console.log(lbsorkg);
    }, []);

  function removeRow (e){

    let row = e.target.closest("tr");
    let tbody = document.getElementById('liftData');
    tbody.removeChild(row);
    
  }
  function returnHome(){
    window.location.href = '/login'
  } 



    return (
        <div>
          <div>
            <h1>Welcome Guest</h1> <input type="submit" value="Return to Login" onClick={returnHome}/>
              <div class="col-sm-2">
                <input type="date" readOnly/>
              </div>
              <div class="col-sm-2">
                <select  readOnly>
                    <option defaultValue="squat">Squat</option>
                    <option value="bench">Bench</option>
                    <option value="deadlift">Deadlift</option>
                </select>
                
                <input type="number" name="weight" placeholder="How much weight?" step="0.25" readOnly/>
                <select readOnly>
                    <option defaultValue="lb">lb</option>
                    <option value="kg">kg</option>
                </select>
                </div>
                <div class="col-sm-2">
                  <input type="number" name="reps" placeholder="How many reps?" step="1"  readOnly/>
                </div>
                <div class="col-sm-2">
                  <input type="number" name="rpe" placeholder="What was the RPE?" step="0.5"  readOnly/>
                </div>
                
                <div class="col-sm-2">
                  <input type="submit" value="Update Lift" onClick={createLift}/>
              </div>
            </div>
          
            <table class="table" id="dataTable" onClick={removeRow}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Lift</th>
                  <th>Weight</th>
                  <th>Rpe</th>
                  <th>Reps</th>
                </tr>
              </thead>
              <tbody id="liftData">

              </tbody>
              <tbody id='startHere'>

              </tbody>
            </table>
            <br />
            <div style={{display: "grid", width: "40vw", height: "25vh", marginLeft: "auto", marginRight: "auto"}}>
              <Charts />
            </div>
           
            
        </div>
    )
    }
export default Dashboard