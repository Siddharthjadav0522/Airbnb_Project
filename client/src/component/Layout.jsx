import React from 'react'
import Header from '../component/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function Layout() {
  return (
    <div className='flex flex-col justify-between min-h-screen'>
    <Header/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default Layout
