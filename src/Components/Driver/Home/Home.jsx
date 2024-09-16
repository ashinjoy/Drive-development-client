import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto'
import BarChart from "../Chart/BarChart";
import ChartConfig from "../Chart/ChartConfig";

import { useDispatch, useSelector } from "react-redux";
import { tripChart } from "../../../Features/Driver/driverActions";
import Card from "../DashBoard/Card";


function Home() {
  
  const dispatch = useDispatch();
  const [data,setData]  = useState()

  const { report,driver } = useSelector((state) => state.driver);
  const [filter,setFilter] =useState('Daily')
  useEffect(()=>{
    dispatch(tripChart({filter:filter,driverId:driver?.id}))
  },[])
  useEffect(() => {
    if (report) {
      const dataFromReport = ChartConfig(report)
      setData(dataFromReport)
      console.log('data',dataFromReport);
      
    }
  }, [report]);

  const handleFilter = (e)=>{
    console.log('event',e.target.id);
    setFilter(e.target.id)
    dispatch(tripChart({filter:e.target.id,driverId:driver?.id}))
  }
  return (

    <>
     
   <div className='flex gap-3  w-[20%]'>
        <p id='Daily' onClick={(e)=>handleFilter(e)}>Daily</p>
        <p id='Weekly' onClick={(e)=>handleFilter(e)}>Weekly</p>
        <p id='Monthly' onClick={(e)=>handleFilter(e)}>Monthly</p>
        <p id='Yearly' onClick={(e)=>handleFilter(e)}>Yearly</p>

    </div>
    <div className="w-[100%]">
      <BarChart data={data} />
    </div> 
    
    </>
  );
}

export default Home;
