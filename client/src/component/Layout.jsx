import React from 'react'
import Header from '../component/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function Layout() {
  return (
    <div className='pt-4 px-3 md:px-6 lg:px-16 flex flex-col justify-between min-h-screen'>
    <Header/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default Layout
