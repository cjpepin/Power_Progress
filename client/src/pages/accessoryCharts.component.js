// import React from 'react';
// import { Line } from 'react-chartjs-2'
// import Chart from 'chart.js/auto';
// import { useState, useEffect } from 'react';


// function AccessoryCharts(){
//     // let liftData = [];
//     let chartlbsorkg = localStorage.getItem('lborkg');
//     let totData = [];
    
//     let stringTogether = '';
//     const [liftData, setLiftData] = useState('')
//     function plateMath(weight, rpe, reps){
//         const rpeArr = new Object;
//               rpeArr["10"] = 1;
//               rpeArr["9.5"] = 0.978;
//               rpeArr["9"] = 0.955;
//               rpeArr["8.5"] = 0.939;
//               rpeArr["8"] = 0.922;
//               rpeArr["7.5"] = 0.907;
//               rpeArr["7"] = 0.892;
//               rpeArr["6.5"] = 0.878;
//               rpeArr["6"] = 0.863;
//               rpeArr["5.5"] = 0.848;
//               rpeArr["5"] = 0.834;

//         const rpeReps = (10 - parseInt(rpe));
//         const totReps = (+rpeReps + +reps);
//         let diffQ = ((100 - (totReps*2.5))/100);
//         let e1rm = weight/diffQ;
//         e1rm = Math.round(e1rm * 100)/100;
//         return e1rm;
//       }
//   //Gets data for lift charts
//     async function getLiftCharts() {
//         console.log("charts test")
//         let block;
//         if(localStorage.getItem('block')){
//             block = localStorage.getItem('block');
//         } else {
//             block = '';
//         }
//         const req = await fetch('http://localhost:1337/api/get_lift', {
//             headers: {
//                 'x-access-token': localStorage.getItem('token'),
//                 'block': block,
//             }
//         })

//         const data = await req.json();
//         if(data.status === 'fine'){
//             console.log("setting lift data")
//             setLiftData(data.data, []);
//             createCharts(data.data);
//         } else {
//             alert(data.error + "loc1")
//         }
       
//     }
//     function createCharts(data){
//         let liftArr = []
//         let chartDiv = document.getElementById('accessoryCharts')
        
       
//         let e1rm;
//         let chartsArr = [];
       
//         for(const key in data){
//             let liftData = [];
//             let dates = [];
//             if(data.hasOwnProperty(key)){
//                 let curLift = data[key].lift
//                 if(curLift == "Competition Squat" || curLift == "Competition Bench" || curLift == "Competition Deadlift"){
//                     continue;
//                 }
//                 if(!(liftArr.includes(curLift))){
//                     liftArr.push(curLift)
//                     for(const lift in data){
//                         let curWeight;
//                         if(data.hasOwnProperty(lift)){
//                             let compareLift = data[lift].lift
//                             if(compareLift == curLift){
//                                 if(dates.includes(data[lift].date)){
//                                     continue;
//                                 }
//                                 if(chartlbsorkg == 'lb'){
//                                     if(data[lift].lbsorkg == "kg"){
//                                         curWeight = toLB(data[lift].weight);
//                                         e1rm = plateMath(curWeight,data[lift].rpe,data[lift].reps)
//                                         liftData.push(e1rm)
//                                         dates.push(data[lift].date) 
//                                     }else {
//                                         curWeight = data[lift].weight;
//                                         e1rm = plateMath(curWeight,data[lift].rpe,data[lift].reps)
//                                         liftData.push(e1rm)
//                                         dates.push(data[lift].date) 
//                                     }
//                                 } else {
//                                     if(data[lift].lbsorkg == "lb"){
//                                         curWeight = toKG(data[lift].weight);
//                                         e1rm = plateMath(curWeight,data[lift].rpe,data[lift].reps)
//                                         liftData.push(e1rm)
//                                         dates.push(data[lift].date) 
//                                     }else {
//                                         curWeight = data[lift].weight;
//                                         e1rm = plateMath(curWeight,data[lift].rpe,data[lift].reps)
//                                         liftData.push(e1rm)
//                                         dates.push(data[lift].date) 
//                                 }     
//                             }
//                         }
//                     }
//                     }
//                     const curData = {
//                         labels: dates,
//                         datasets: [{
//                             label: curLift,
//                             data:  liftData,
//                             backgroundColor: 'rgba(255, 99, 132, 0.2)',
//                             borderColor: 'rgba(81, 163, 0, 1)',
//                             color: 'rgba(239, 0, 0, 1)',
//                             fill: false,
//                             borderWidth: 1
//                         }]
//                     };  
//                     chartsArr.push(<div><Line class="col-xs-6" data={curData}/></div>)

//                     // let newDiv = document.createElement('div')
//                     // newDiv.id = curLift;
//                     // newDiv.innerText = <Line class="col-xs-6" data={totData}/>
//                     // chartDiv.appendChild(newDiv)

//                     }
//                 }
//             }
//             return chartsArr;
//         }
//     function toKG(weight){
//         return weight/2.2;
//     }
//     function toLB(weight){
//         return weight*2.2;
//     }
//     useEffect(() => {
//         getLiftCharts();
//       }, []);
//         return (
//             <div id="accessoryCharts"style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr",width: "90vw", height: "60vh", marginLeft: "auto", marginRight: "auto"}}>
//                 {createCharts(liftData)}
//             </div>

//         );
// }
// export default AccessoryCharts;
import "./cssFiles/chartStyles.css";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    lift: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    lift: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    lift: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    lift: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    lift: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    lift: 4300,
    amt: 2100
  }
];

export default function App() {
  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line connectNulls
        type="monotone"
        dataKey="lift"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line connectNulls type="monotone" dataKey="uv" stroke="#82ca9d" />
      <Line connectNulls type="monotone" dataKey="amt" stroke="#82ca9d" />
    </LineChart>
  );
}