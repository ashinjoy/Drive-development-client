import React, { useEffect, useState } from 'react'
import Userchart from '../Chart/Userchart'
import Chart from 'chart.js/auto'
import ChartConfig from '../Chart/ChartConfig'
import { newlyRegisteredUsers } from '../../../Features/Admin/adminActions'
import { useDispatch, useSelector } from 'react-redux'




function Home() {
  const [filter,setFilter] = useState('Daily')
  const [data,setData]  = useState()
  const dispatch = useDispatch()
  const {report} = useSelector(state=>state.admin)
  useEffect(()=>{
    dispatch(newlyRegisteredUsers(filter))
  },[])

  useEffect(()=>{
    if(report){
      console.log('user');
      
   const dataFromReport =  ChartConfig(report)
   setData(dataFromReport)    
    }
    
  },[report])

  const handleFilter = (e)=>{
    console.log('event',e.target.id);
    setFilter(e.target.id)
    dispatch(newlyRegisteredUsers(e.target.id))
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
        <Userchart data={data}/>
    </div>
    </>
  )
}

export default Home
