import React from 'react';
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import { useState, useEffect } from 'react';


function App(){
    // let liftData = [];
    let squatDates = [];
    let squatData = [];
    let benchDates = [];
    let benchData = [];
    let deadliftDates = [];
    let deadliftData = [];
    const [liftData, setLiftData] = useState('')

  
    async function getLiftCharts() {
        const req = await fetch('http://localhost:1337/api/get_lift', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })

        const data = await req.json();
        if(data.status === 'fine'){
            console.log("setting lift data")
            setLiftData(data.data, []);
        } else {
            alert(data.error + "loc1")
        }
       
    }
    function createData(data){
        for(let i = 0; i < liftData.length; i++){
            // console.log(liftData[i]);
            if(liftData[i].lift == "squat"){
                squatDates.push(liftData[i].date);
                squatData.push(parseInt(liftData[i].weight));
            } else if(liftData[i].lift == "bench"){
                benchDates.push(liftData[i].date);
                benchData.push(parseInt(liftData[i].weight));
            } else if(liftData[i].lift == "deadlift"){
                deadliftDates.push(liftData[i].date);
                deadliftData.push(parseInt(liftData[i].weight));
            }
       
        }
    }
    if(liftData != ''){
        createData(liftData);
    }
    // console.log(liftData)
    // console.log(squatData);
    // console.log(benchData);
    // console.log(deadliftData);

    useEffect(() => {
        getLiftCharts();
      }, []);
    
    const Sdata = {
        labels: ["12-01-21","12-02-21","12-03-21","12-04-21"],
        datasets: [{
            label: 'Squat',
            data:  [180, 185, 190, 195],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(81, 163, 0, 1)',
            color: 'rgba(239, 0, 0, 1)',
            fill: false,
            borderWidth: 1
        }]
    };   
    const Bdata = {
        labels: ["12-01-21","12-02-21","12-03-21"],
        datasets: [{
            label: 'Bench',
            data:  [100,105,110],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(81, 163, 0, 1)',
            color: 'rgba(239, 0, 0, 1)',
            fill: false,
            borderWidth: 1
        }]
    };   
    const Ddata = {
        labels: ["12-01-21","12-02-21","12-03-21"],
        datasets: [{
            label: 'Deadlift',
            data:  [225,230,235],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(81, 163, 0, 1)',
            color: 'rgba(239, 0, 0, 1)',
            fill: false,
            borderWidth: 1
        }]
    };
        return (
            <div>
                <Line class="col-xs-6" data={Sdata}/>
                <Line class="col-xs-6" data={Bdata}/>
                <Line class="col-xs-6" data={Ddata}/>
            </div>

        );
}
export default App;