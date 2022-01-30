import React from 'react';
import Chart from 'chart.js/auto';
import { useState, useEffect } from 'react';
import "./cssFiles/chartStyles.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";


function AccessoryCharts(){
    // let liftData = [];
    let chartlbsorkg = localStorage.getItem('lborkg');    
    let stringTogether = '';
    let totData = [];

    const [liftData, setLiftData] = useState('')
    function plateMath(weight, rpe, reps){
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

        const rpeReps = (10 - parseInt(rpe));
        const totReps = (+rpeReps + +reps);
        let diffQ = ((100 - (totReps*2.5))/100);
        let e1rm = weight/diffQ;
        e1rm = Math.round(e1rm * 100)/100;
        return e1rm;
      }
  //Gets data for lift charts
    async function getLiftCharts() {
        let block;
        if(localStorage.getItem('block')){
            block = localStorage.getItem('block');
        } else {
            block = '';
        }
        const req = await fetch('http://localhost:1337/api/get_lift', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'block': block,
            }
        })

        const data = await req.json();
        if(data.status === 'fine'){
            console.log("setting lift data")
            setLiftData(data.data, []);
            createDataObject(data.data);
        } else {
            alert(data.error + "loc1")
        }
       
    }
    
    function createDataObject(data){
        let liftArr = []
        let chartDiv = document.getElementById('accessoryCharts')
        
        
        let e1rm;
        let curObj = {};
        let curDate;
        let lineObj = [];
        for(const key in data){
            if(data.hasOwnProperty(key)){
                if(key == 0){
                    curDate = data[0].date;
                }
                if(curDate != data[key].date){
                    totData.push(curObj);
                    curObj = {};
                    curDate = data[key].date
                    curObj['date'] = curDate
                } else {
                    if(Object.keys(curObj).length == 0){
                        curObj['date'] = curDate
                    } else if(Object.keys(curObj).indexOf(`${data[key].lift}`) == -1){
                        curObj[`${data[key].lift}`] = data[key].e1rm
                        lineObj.push(<Line connectNulls type="monotone" dataKey={data[key].lift} stroke="#82ca9d" />)
                    } else {
                        continue;
                    }
                }
                
                
            }
            
        }
        // for(const key in data){
        //     let liftData = [];
        //     let dates = [];
        //     if(data.hasOwnProperty(key)){
        //         let curLift = data[key].lift
        //         if(curLift == "Competition Squat" || curLift == "Competition Bench" || curLift == "Competition Deadlift"){
        //             continue;
        //         }
        //         if(!(liftArr.includes(curLift))){
        //             liftArr.push(curLift)
        //             for(const lift in data){
        //                 let curWeight;
        //                 if(data.hasOwnProperty(lift)){
        //                     let compareLift = data[lift].lift
        //                     if(compareLift == curLift){
        //                         if(dates.includes(data[lift].date)){
        //                             continue;
        //                         }
        //                         if(chartlbsorkg == 'lb'){
        //                             if(data[lift].lbsorkg == "kg"){
        //                                 curWeight = toLB(data[lift].weight);
        //                                 e1rm = plateMath(curWeight,data[lift].rpe,data[lift].reps)
        //                                 liftData.push(e1rm)
        //                                 dates.push(data[lift].date) 
        //                             }else {
        //                                 curWeight = data[lift].weight;
        //                                 e1rm = plateMath(curWeight,data[lift].rpe,data[lift].reps)
        //                                 liftData.push(e1rm)
        //                                 dates.push(data[lift].date) 
        //                             }
        //                         } else {
        //                             if(data[lift].lbsorkg == "lb"){
        //                                 curWeight = toKG(data[lift].weight);
        //                                 e1rm = plateMath(curWeight,data[lift].rpe,data[lift].reps)
        //                                 liftData.push(e1rm)
        //                                 dates.push(data[lift].date) 
        //                             }else {
        //                                 curWeight = data[lift].weight;
        //                                 e1rm = plateMath(curWeight,data[lift].rpe,data[lift].reps)
        //                                 liftData.push(e1rm)
        //                                 dates.push(data[lift].date) 
        //                         }     
        //                     }
        //                 }
        //             }
        //             }
        //             const curData = {
        //                 labels: dates,
        //                 datasets: [{
        //                     label: curLift,
        //                     data:  liftData,
        //                     backgroundColor: 'rgba(255, 99, 132, 0.2)',
        //                     borderColor: 'rgba(81, 163, 0, 1)',
        //                     color: 'rgba(239, 0, 0, 1)',
        //                     fill: false,
        //                     borderWidth: 1
        //                 }]
        //             };  
        //             chartsArr.push(<div><Line class="col-xs-6" data={curData}/></div>)

        //             // let newDiv = document.createElement('div')
        //             // newDiv.id = curLift;
        //             // newDiv.innerText = <Line class="col-xs-6" data={totData}/>
        //             // chartDiv.appendChild(newDiv)

        //             }
        //         }
        //     }
            // return chartsArr;
        }
    function toKG(weight){
        return weight/2.2;
    }
    function toLB(weight){
        return weight*2.2;
    }
    useEffect(() => {
        getLiftCharts();
      }, []);
        return (
            // <div id="accessoryCharts"style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr",width: "90vw", height: "60vh", marginLeft: "auto", marginRight: "auto"}}>
            //     {createCharts(liftData)}
            // </div>
            <LineChart
                width={500}
                height={300}
                data={totData}
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
                {createDataObject(liftData)}
                {console.log(totData)}
            </LineChart>

        );
}
export default AccessoryCharts;

// ADD GET LINES FUNCTION TO TURN THE DATA INTO A CHART


// export default function App() {
//   return (
//     <LineChart
//       width={500}
//       height={300}
//       data={data}
//       margin={{
//         top: 5,
//         right: 30,
//         left: 20,
//         bottom: 5
//       }}
//     >
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="name" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Line connectNulls
//         type="monotone"
//         dataKey="lift"
//         stroke="#8884d8"
//         activeDot={{ r: 8 }}
//       />
//       <Line connectNulls type="monotone" dataKey="uv" stroke="#82ca9d" />
//       <Line connectNulls type="monotone" dataKey="amt" stroke="#82ca9d" />
//     </LineChart>
//   );
// }