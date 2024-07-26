import React from 'react'
import UserNavbar from '../../../Components/Navbar/UserNavbar'
import Home from '../../../Components/User/Home/Home';
import Footer from '../../../Components/Footer/Footer';
console.log('home');

function HomePage() {
  return (
    <>
    <UserNavbar/>
    <Home/>
    <Footer/>
    </>
  )
}

export default HomePage
