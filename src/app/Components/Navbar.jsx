"use client"
import { useEffect, useState, useContext } from 'react'
import { TrackingContext } from '../Context/Tracking'
import Nav1 from "./SVG/Nav1"
import Nav2 from "./SVG/Nav2"
import Nav3 from "./SVG/Nav3"


export default  ()=>{
  // state to manage the menu's open/close state.
  const[state, setState] =useState(false)
  const {currentUser, connectWallet} = useContext(TrackingContext)

  const navigation=[
    {title:"Home", path: "#"},
    {title:"Services", path:"#"},
    {title:"Contact Us", path:"#"},
    {title:"Erc20", path:"#"},
  ];
//This sets up an event handler for the onclick event on the entire document. This means the code inside this function will run whenever you click anywhere on the page.
  useEffect(()=>{
    document.onClick =(e)=>{
      const target = e.target;
      if(!target.closest(".menu-btn")) setState(false)
    };
  },[])

  return(
    <nav
    className={`bg-white w-full pb-5 md:text-sm ${
      state ?
      "shadow-ld rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0"
      : ""
    }`}
    >
    <div className="gap-x-14 items-center mx-w-screen-xl mx-auto px-4 md:flex md:px-8">
      <div className="flex items-center justify-between py-5 md:block">
        <a href='javascript:void(0)'>
          <img
          src='https://www.floatui.com/logo.svg'
          width={120}
          height={50}
          alt='Float UI logo'
          />
          </a>
          <div className='md:hidden'>
            <button
            className='menu-btn text-gray-500 hover:text-gray-800'//This button is part of the navigation bar (<nav>) component in your React application. 
                                                                 //It is used to toggle the visibility of the navigation menu, especially on smaller screens where a menu button is often used to show or hide the menu items.
            onClick={()=>setState(!state)}>
              {state ? <Nav1/> : <Nav2/>}
            </button>
          </div>
        </div>
        <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
          state? "block" : "hidden"
        }`}>
          <ul className='justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0'>
            {navigation.map((item,idx)=>{
              return(
                <li key={idx} className='text-gray-700 hover:text-gray-900'>
                  <a href={item.path} className='block'>
                    {item.title}
                  </a>
                  </li>  
              )
            })}
          </ul>
          <div className='flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0'>
            {currentUser ? (
              <p className='flex item-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 
              hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex'>
                {currentUser.slice(0,25)}..
              </p>
            ):(
              <button onClick={()=>connectWallet()}
              className='flex item-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 
              active:bg-gray-900 rounded-full md:inline-flex'>Connect Wallet <Nav3/></button>
            )}
          </div>
        </div>
    </div>
    </nav>
    )
  
}

