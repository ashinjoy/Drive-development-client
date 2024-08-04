import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import AdminSidebar from "../../Components/Navbar/AdminSidebar";
import {
  blockUnblockDriver,
  getDriverDetails,
} from "../../Features/Admin/adminActions";

function DriverList() {
  // const dispatch = useDispatch();
  // const { driverData } = useSelector((state) => state.admin);
  // useEffect(() => {
  //   dispatch(getDriverDetails());
  // }, []);
  // const handleBlockUnBlock = (driverId) => {
  //   dispatch(blockUnblockDriver(driverId));
  // };

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
     
      <div classNameName="flex justify-center items-center mt-12 bg-gradient-to-r from-white to-yellow-50 h-screen">
  <div className="ml-48 w-4/5 h-4/5 border-2 rounded-lg shadow-2xl">
    <h1 className="text-left ml-10 mt-10 font-semibold text-2xl text-gray-700">
      {console.log("js load 1")}
      Drivers List
    </h1>
    <div className="flex justify-center items-center mt-10">
      <div className="relative overflow-x-auto w-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-sm bg-gray-100 text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 border-b-2 border-gray-300">
                Driver Name
              </th>
              <th scope="col" className="px-6 py-3 border-b-2 border-gray-300">
                Email
              </th>
              <th scope="col" className="px-6 py-3 border-b-2 border-gray-300">
                Phone
              </th>
              <th scope="col" className="px-6 py-3 border-b-2 border-gray-300">
                Status
              </th>
              <th scope="col" className="px-6 py-3 border-b-2 border-gray-300">
                Action
              </th>
              <th scope="col" className="px-6 py-3 border-b-2 border-gray-300">
                View Detail
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {driverData && driverData.length > 0 ? (
              driverData.map((driver) => (
                <tr
                  key={driver._id}
                  className="hover:bg-gray-100 transition duration-150"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {driver.name}
                  </th>
                  <td className="px-6 py-4 text-black">{driver.email}</td>
                  <td className="px-6 py-4 text-black">{driver.phone}</td>
                  <td className="px-6 py-4 text-black">
                    {driver.isBlocked ? "Blocked" : "Active"}
                  </td>
                  <td className="px-6 py-4 text-black">
                    <button
                      onClick={() => handleBlockUnBlock(driver._id)}
                      className={`px-4 py-2 rounded ${
                        driver.isBlocked
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      } hover:opacity-75 transition duration-150`}
                    >
                      {driver.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-black">
                    <Link
                      to={`/admin/viewDriver-Detail/${driver._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-black">
                  No Drivers Registered Yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>j
</div>






    </>
  );
}

export default DriverList;
