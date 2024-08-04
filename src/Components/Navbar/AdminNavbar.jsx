import React from "react";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { FaRegUser } from "react-icons/fa";


function AdminNavbar() {
  return (

    <nav className='fixed top-0 left-[12rem] flex flex-row justify-around items-center  h-[5rem] drop-shadow-lg w-full 9 bg-white z-40 border'>
      <div className="w-1/3 h-10 flex">
      <form action="" className="flex w-full h-full">
        <input
          type="search"
          name=""
          id=""
          className="outline-none rounded-l-lg border-2 border-black w-full h-full px-3"
          placeholder="Search Here ...."
        />
        <button type="submit" className="flex items-center justify-center rounded-r-lg border-2 border-l-0 border-black w-10 h-full bg-white">
          <FcSearch size={22} />
        </button>
      </form>
    </div >
    <div className="flex gap-[3rem]">
      <IoIosNotifications size={25} className="cursor-pointer text-gray-600 hover:text-gray-800 transition" />
      <FaRegUser size={25}/>
      </div>
    </nav>

  );
}

export default AdminNavbar;
