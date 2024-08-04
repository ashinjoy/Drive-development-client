import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {resetAdminState} from '../../Features/Admin/adminSlice'
import { adminLogin } from '../../Features/Admin/adminActions'
import { useNavigate } from 'react-router-dom'


function AdminLogin() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {error,success,message} = useSelector((state) => state.admin)

    const handleSubmit = (e)=>{
        e.preventDefault()
        const formData = {
            name,
            email,
            password
        }
        
        dispatch(adminLogin(formData))
    }

    useEffect(()=>{
      if(error){
        toast(error)
        dispatch(resetAdminState())
        return
      }else if(success){
        toast(message)
        setTimeout(()=>{
          navigate('/admin/home',{replace:true})
        },1000)
      }

    },[error,success])

  return (
    <>
    <section class="bg-gray-50 bg-gradient-to-r from-white to-yellow-50 h-screen">
  <div class="flex flex-col items-center justify-center px-6 py-8 mt-6 mx-auto md:h-screen lg:py-0">
    <div class="w-full bg-white rounded-lg shadow-lg md:mt-16 sm:max-w-md xl:p-0 border border-yellow-300 bg-gradient-to-t from-white to-yellow-100">
      <div class="p-6 space-y-6 md:space-y-8 sm:p-8">
        <h1 class="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-black md:text-3xl">
          Login
        </h1>
        <form class="space-y-6 md:space-y-5" action="" onSubmit={(e)=>handleSubmit(e)}>
        <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Name</label>
            <input type="text" name="email" id="email" class="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-yellow-500 focus:border-yellow-500" placeholder="Enter your email" value={name} onChange={(e)=>setName(e.target.value)} />
          </div>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email</label>
            <input type="text" name="email" id="email" class="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-yellow-500 focus:border-yellow-500" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password</label>
            <input type="password" name="password" id="password" class="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-yellow-500 focus:border-yellow-500" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <button type="submit" class="w-full text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200">
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default AdminLogin
