import React, { ReactFromModule, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import {BrowserRouter as Router} from 'react-router-dom'
import { useState, useRef } from 'react';
import styled from 'styled-components'
import Charts from './charts.component';
import Navbar from '../components/navbar.component'
export { default as ReactFromModule } from 'react'

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
  margin-left: 30%;
  margin-right: 30%;
  margin-top: 5vh;
  margin-bottom: 5vh;

  max-width: 30vw;
  border-radius: 5px;
  padding: 25px;
  box-shadow: 8px 10px;
`
const TableWrapper = styled.div`
  color: rgb(142,174,189);
  background-color: rgb(15,22,40);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5vh;
  margin-bottom: 5vh;

  max-width: 80vw;
  border-radius: 5px;
  padding: 25px;
  box-shadow: 8px 10px;
`

const Dashboard = () => {
    console.log(React)
    console.log(ReactFromModule) 
    if(localStorage.getItem('block')){
        localStorage.removeItem('block');
        console.log("block removed")
    }
    const name = localStorage.getItem('name');
    const [lift, setLift] = useState('squat');
    const [weight, setWeight] = useState('');
    const [lbsorkg, setLbsorkg] = useState('lb');
    const [reps, setReps] = useState('');
    const [rpe, setRpe] = useState('');
    const [date, setDate] = useState('');
    const [totData, setTotData] = useState('');

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
    function updateTable(data){
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
          let e1rmInLbs = e1rm/2.2;
          e1rm = Math.round(e1rm*100)/100 + 'kg/' + Math.round(e1rmInLbs*100)/100 + 'lbs';
        }
        firstNode.innerHTML += `
        <tr id=${i}>
          <td id="block">${liftData[i]['block']}</td>
          <td id="date">${liftData[i]['date']}</td>
          <td id="lift">${liftData[i]['lift']}</td>
          <td id="weight">${weight}</td>
          <td id="rpe">${liftData[i]['rpe']}</td>
          <td id="reps">${liftData[i]['reps']}</td>
          <td id="e1rm">${e1rm}</td>
        </tr>
        `
      }
    }

    function clearTable(){
        
    }
  
    async function createLift() {
        const token = localStorage.getItem('token')
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        console.log(lbsorkg);
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
            rpe,
            date,
            e1rm,
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

    async function getLifts() {
        const req = await fetch('http://localhost:1337/api/get_lift', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        
        })

        const data = await req.json();
        if(data.status === 'fine'){
            console.log("creating list");
            console.log(data.data);
            clearTable();
            updateTable(data);
            setTotData(data.data, []);
        } else {
            alert(data.error + "test")
        }
       
    }
  

    
    useEffect(() => {
      getLifts();
      console.log(lbsorkg);
    }, []);

  

  // function getAllExercises() {
  //   const req = await fetch('http://localhost:1337/api/get_all', {
  //           headers: {
  //               'x-access-token': localStorage.getItem('token')
  //           }
  //       })

  //       const data = await req.json();
  //       if(data.status === 'fine'){
  //           console.log("creating list");
  //           console.log(data.data);
  //           clearTable();
  //           updateTable(data);
  //           setTotData(data, []);
  //           // setWeight(data.data.weight);
  //           // setLbsorkg(data.data.lbsorkg);
  //           // setReps(data.data.reps);
  //           // setRpe(data.data.rpe);
  //           // setDate(data.data.date);
  //       } else {
  //           alert(data.error + "test")
  //       }
  // }

  function logout(){
    window.localStorage.clear();
    window.location.href = '/login';
  }

    return (
        <div>
          <Navbar />
          <div>
            <H1>Welcome {name}</H1>
  
          </div>
          <div id="allTimeTable" style={{maxHeight: "250px", overflowY: "auto"}}>
            <TableWrapper>
              <table class="table" id="dataTable" >
                <thead>
                  <tr>
                    <th>Block</th>
                    <th>Date</th>
                    <th>Lift</th>
                    <th>Weight</th>
                    <th>Rpe</th>
                    <th>Reps</th>
                    <th>Estimated 1rm</th>
                  </tr>
                </thead>
                <tbody id="liftData">

                </tbody>
                <tbody id='startHere'>

                </tbody>
              </table>
            </TableWrapper>
            
            </div>
            <br />
            <TableWrapper>
              <Charts />
            </TableWrapper>
           
            
        </div>
    )
}
export default Dashboard