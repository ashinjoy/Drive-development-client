import React from 'react'
import {Bar} from 'react-chartjs-2'


const options={
  plugins: {
    title: {
      display: true,
      text: "Users Gained between 2016-2020"
    }
  }
}

function BarChart({data}) {
 
  return (
    <div className='w-[100%] h-[100%]'>
    {data && <Bar data={data} options={options}/>}
    </div>
  )
}

export default BarChart
