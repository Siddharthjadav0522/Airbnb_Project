import React from 'react'
import Header from '../component/Header'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='py-3 px-5 md:px-10 lg:px-20 flex flex-col min-h-screen'>
    <Header/>
    <Outlet/>
    
    </div>
  )
}

export default Layout
