import React from 'react'
import {Line} from 'react-chartjs-2'

const options={
  plugins: {
    title: {
      display: true,
      text: "Users Gained between 2016-2020"
    }
  }
}

function Userchart({data}) {
 
  
  return (
    <div className=''>
      {console.log('hello usechaty')}
      {data && <Line data={data} options={options}/>}
    </div>
  )
}

export default Userchart
