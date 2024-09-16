import React, { useEffect, useState } from 'react'
import { companyBalanceService, tripsCountService } from '../../../Features/Admin/adminService'

function Cards({type}) {
    const [companyBalance,setCompanyBalance] = useState(0)
    const [TripCount,setTripCount] = useState(0)

    useEffect(()=>{
        const getData = async()=>{
            if(type == "companyBalance"){
                const response = await companyBalanceService()
                console.log('response',response);
                setCompanyBalance(response?.balance?.balance)
                return
            }
            if(type == "trips"){
                const response = await tripsCountService()
                console.log('response',response);
                setTripCount(response?.data)
                return
            }
        }
        getData()
    },[])
  return (
    <div className="w-[25dvw] h-[25dvh] border-2 border-gray-300 bg-white shadow-lg  rounded-lg p-6">
    <div className='flex flex-col items-center gap-7'>
    <h1 className='text-2xl font-bold'>{type == "companyBalance" ? "Revenue Earned" : "Total Trips Completed"}</h1>
    <h1 className='text-3xl font-bold'>{type ==  "companyBalance" ? `₹${companyBalance}` : TripCount }</h1>
    </div>
  </div>
  )
}

export default Cards
