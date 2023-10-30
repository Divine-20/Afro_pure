import React from 'react'
import Image from "next/image";
import AfroLogo from "../../../public/afropurelogo.png"
function SideBar() {
  return (
  <div>
    <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" />
    
    <div className="min-h-screen flex flex-row ">
      <div className="flex flex-col w-56 bg-white overflow-hidden">
      <div className="flex justify-center mt-8">
            <Image src={AfroLogo} height={150} width={150} alt="logo"/>
        </div>
        <ul className="flex flex-col py-6">
          <li>
            <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-home"></i></span>
              <span className="text-sm font-medium">Dashboard</span>
            </a>
          </li>
         
          <li>
            <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-log-out"></i></span>
              <span className="text-sm font-medium">Logout</span>
            </a>
          </li>
        </ul>
      </div>
      </div>
    </div>
  )
}

export default SideBar