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


function Charts(){
    // let liftData = [];
    let chartlbsorkg = localStorage.getItem('lborkg');    
    let stringTogether = '';
    // let totData = [];
    const [colors, setColors] = useState('')
    const [liftData, setLiftData] = useState('')
    const [totData, setTotData] = useState([])
    // let totData = [];
    const [lines, setLines] = useState([])
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
        const req = await fetch('https://powerprogress.herokuapp.com/api/get_lift', {
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
    async function getColors(){
        const req = await fetch('https://powerprogress.herokuapp.com/api/get_colors', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }
        })
        const colorArr = await req.json();
        if(colorArr.status == 'good'){
            console.log(colorArr.colors)
        } else{
            console.log(colorArr.error)
        }
        setColors(colorArr.colors)
    }

    function createDataObject(data){
        let liftArr = []
        let chartDiv = document.getElementById('accessoryCharts')
        let e1rm;
        let curObj = {};
        let curDate;
        let curLine = [];
        let curData = [];
        let liftsArr = [];
        let bothArrs = [];
        let colorCounter = 0;
        for(const key in data){
            if(data.hasOwnProperty(key)){
                if(data[key].lift == "Pause Squat" ||data[key].lift == "Competition Bench" ||data[key].lift == "Conventional Deadlift"){
                    if(key == 0){
                        curDate = data[0].date;
                    }
                    if(curDate != data[key].date){
                        curData.push(curObj);
                        curObj = {};
                        curDate = data[key].date
                        curObj['date'] = curDate
                    } else {
                        if(Object.keys(curObj).length == 0){
                            curObj['date'] = curDate
                        } else if(Object.keys(curObj).indexOf(`${data[key].lift}`) == -1){
                            if(localStorage.getItem('lbsorkg') == data[key].lbsorkg){
                                curObj[`${data[key].lift}`.split(" ").join("")] = parseInt(data[key].e1rm)
                            } else if(localStorage.getItem('lbsorkg') != data[key].lbsorkg){
                                if(data[key].lbsorkg == 'kg'){
                                    curObj[`${data[key].lift}`.split(" ").join("")] = parseInt(data[key].e1rm*2.2)
                                } else if(data[key].lbsorkg == 'lb'){
                                    curObj[`${data[key].lift}`.split(" ").join("")] = parseInt(data[key].e1rm/2.2)
                                }
                            }
                            if(liftsArr.indexOf(`${data[key].lift}`) == -1){
                                if(colorCounter >= colors.length){
                                    colorCounter = 0;
                                }
                                if(!colors[colorCounter]){
                                    continue;
                                } else{
                                    liftsArr.push(`${data[key].lift}`);
                                    curLine.push(<Line connectNulls type="monotone" dataKey={data[key].lift.split(" ").join("")} stroke={`#${colors[colorCounter].color}`} />)

                                    colorCounter +=1;
                                }
                            }
                        } else {
                            continue;
                        }
                    }
                }
               
                
            }
            
        }
        bothArrs.push(curData);
        bothArrs.push(curLine);
        return bothArrs;
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
    useEffect(() => {
        getColors();
    }, []);
        return (
            <LineChart
                width={800}
                height={500}
                data={createDataObject(liftData)[0]}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
                {createDataObject(liftData)[1]}
            </LineChart>

        );
}
export default Charts;