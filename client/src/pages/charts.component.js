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
    let chartlbsorkg = localStorage.getItem('lborkg');
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
        console.log("charts test")
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
        } else {
            alert(data.error + "loc1")
        }
       
    }
    function toKG(weight){
        return weight/2.2;
    }
    function toLB(weight){
        return weight*2.2;
    }
    //Takes the data gotten and puts it into respective arrays
    function createData(data){
        
        for(let i = 0; i < liftData.length; i++){
            let curWeight;
            console.log(liftData[i].lift)
            // console.log(liftData[i]);
            if(chartlbsorkg == 'lb'){
                if(liftData[i].lbsorkg == "kg"){
                    curWeight = toLB(liftData[i].weight);
                    if(liftData[i].lift == "Competition Squat"){
                        squatDates.push(liftData[i].date);
                        let cure1rm = plateMath(curWeight, liftData[i].rpe, liftData[i].reps);
                        squatData.push(parseInt(cure1rm));
                    } else if(liftData[i].lift == "Competition Bench"){
                        console.log("WE here")
                        benchDates.push(liftData[i].date);
                        let cure1rm = plateMath(curWeight, liftData[i].rpe, liftData[i].reps);
                        benchData.push(parseInt(cure1rm));
                    } else if(liftData[i].lift == "Competition Deadlift"){
                        deadliftDates.push(liftData[i].date);
                        let cure1rm = plateMath(curWeight, liftData[i].rpe, liftData[i].reps);
                        deadliftData.push(parseInt(cure1rm));
                    }
                } else{
                    curWeight = liftData[i].weight
                    if(liftData[i].lift == "Competition Squat"){
                        squatDates.push(liftData[i].date);
                        let cure1rm = plateMath(curWeight, liftData[i].rpe, liftData[i].reps);
                        squatData.push(parseInt(cure1rm));
                    } else if(liftData[i].lift == "Competition Bench"){
                        console.log("WE here")
                        benchDates.push(liftData[i].date);
                        let cure1rm = plateMath(curWeight, liftData[i].rpe, liftData[i].reps);
                        benchData.push(parseInt(cure1rm));
                    } else if(liftData[i].lift == "Competition Deadlift"){
                        deadliftDates.push(liftData[i].date);
                        let cure1rm = plateMath(curWeight, liftData[i].rpe, liftData[i].reps);
                        deadliftData.push(parseInt(cure1rm));
                    }
                }
            } else{
                if(liftData[i].lbsorkg == "lb"){
                    curWeight = toKG(liftData[i].weight);
                    if(liftData[i].lift == "Competition Squat"){
                        squatDates.push(liftData[i].date);
                        let cure1rm = plateMath(curWeight, liftData[i].rpe, liftData[i].reps);
                        squatData.push(parseInt(cure1rm));
                    } else if(liftData[i].lift == "Competition Bench"){
                        console.log("WE here")
                        benchDates.push(liftData[i].date);
                        let cure1rm = plateMath(curWeight, liftData[i].rpe, liftData[i].reps);
                        benchData.push(parseInt(cure1rm));
                    } else if(liftData[i].lift == "Competition Deadlift"){
                        deadliftDates.push(liftData[i].date);
                        let cure1rm = plateMath(curWeight, liftData[i].rpe, liftData[i].reps);
                        deadliftData.push(parseInt(cure1rm));
                    }
                } else{
                    curWeight = liftData[i].weight
                    if(liftData[i].lift == "Competition Squat"){
                        squatDates.push(liftData[i].date);
                        let cure1rm = plateMath(curWeight, liftData[i].rpe, liftData[i].reps);
                        squatData.push(parseInt(cure1rm));
                    } else if(liftData[i].lift == "Competition Bench"){
                        console.log("WE here")
                        benchDates.push(liftData[i].date);
                        let cure1rm = plateMath(curWeight, liftData[i].rpe, liftData[i].reps);
                        benchData.push(parseInt(cure1rm));
                    } else if(liftData[i].lift == "Competition Deadlift"){
                        deadliftDates.push(liftData[i].date);
                        let cure1rm = plateMath(curWeight, liftData[i].rpe, liftData[i].reps);
                        deadliftData.push(parseInt(cure1rm));
                    }
                }
            }
       
        }
    }
    function createCharts(data){
        let liftArr = []
        let chartDiv = document.getElementById('accessoryCharts')
        
       
        let e1rm;
        let chartsArr = [];
       
        for(const key in data){
            let liftData = [];
            let dates = [];
            if(data.hasOwnProperty(key)){
                let curLift = data[key].lift
                if(curLift == "Competition Squat" || curLift == "Competition Bench" || curLift == "Competition Deadlift"){
                    if(!(liftArr.includes(curLift))){
                        liftArr.push(curLift)
                        for(const lift in data){
                            let curWeight;
                            if(data.hasOwnProperty(lift)){
                                let compareLift = data[lift].lift
                                if(compareLift == curLift){
                                    if(dates.includes(data[lift].date)){
                                        continue;
                                    }
                                    if(chartlbsorkg == 'lb'){
                                        if(data[lift].lbsorkg == "kg"){
                                            curWeight = toLB(data[lift].weight);
                                            e1rm = plateMath(curWeight,data[lift].rpe,data[lift].reps)
                                            liftData.push(e1rm)
                                            dates.push(data[lift].date) 
                                        }else {
                                            curWeight = data[lift].weight;
                                            e1rm = plateMath(curWeight,data[lift].rpe,data[lift].reps)
                                            liftData.push(e1rm)
                                            dates.push(data[lift].date) 
                                        }
                                    } else {
                                        if(data[lift].lbsorkg == "lb"){
                                            curWeight = toKG(data[lift].weight);
                                            e1rm = plateMath(curWeight,data[lift].rpe,data[lift].reps)
                                            liftData.push(e1rm)
                                            dates.push(data[lift].date) 
                                        }else {
                                            curWeight = data[lift].weight;
                                            e1rm = plateMath(curWeight,data[lift].rpe,data[lift].reps)
                                            liftData.push(e1rm)
                                            dates.push(data[lift].date) 
                                    }     
                                }
                            }
                        }
                        }
                        const curData = {
                            labels: dates,
                            datasets: [{
                                label: curLift,
                                data:  liftData,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(81, 163, 0, 1)',
                                color: 'rgba(239, 0, 0, 1)',
                                fill: false,
                                borderWidth: 1
                            }]
                        };  
                        chartsArr.push(<div><Line class="col-xs-6" data={curData}/></div>)
                        }
                }
                
                }
            }
            return chartsArr;
        }

    //gets the data every time the page relaods
    useEffect(() => {
        getLiftCharts();
      }, []);
        return (
            <div id="accessoryCharts"style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr",width: "90vw", height: "60vh", marginLeft: "auto", marginRight: "auto"}}>
                {createCharts(liftData)}
            </div>

        );
}
export default App;

