import { logDOM } from '@testing-library/react'
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'

function CancelConfirmedModal() {
  const {tripStatus,cancelData} = useSelector(state=>state.trip)

  return createPortal(
    <>
    <div className='fixed inset-0 flex flex-col justify-center items-center bg-slate-900 bg-opacity-75 z-40'>
    <div className="flex flex-col w-[90%] max-w-md h-auto rounded-lg bg-white shadow-lg p-6 items-center gap-6">
    
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Ride Cancelled</h2>
      <p className="text-gray-600 text-sm">
        You've canceled the ride after it was started. A cancellation fee is applicable.
      </p>
    </div>
    
    
   {(cancelData?.cancelPeriod == "After Accepting Ride" || cancelData?.cancelPeriod == "After starting Ride") && ( <div className="bg-red-100 text-red-600 w-full text-center rounded-md py-4">
      <p className="text-lg">Cancellation Fee: ₹{cancelData?.fineAmount}</p>
    </div>)}

    
   {(cancelData?.cancelPeriod == "After Accepting Ride" || cancelData?.cancelPeriod == "After starting Ride") && ( <div className="flex flex-col w-full gap-4">
      <button className="bg-blue-600 text-white py-3 rounded-lg w-full text-center text-lg hover:bg-blue-700">
        Proceed to Payment
      </button>
      <button className="text-blue-600 hover:underline text-center w-full">Contact Support</button>
    </div>)}
  </div>
      
    </div>
    </>,document.getElementById('cancel-modal')
  )
}

export default CancelConfirmedModal
