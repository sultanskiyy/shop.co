import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import SinglePage from '../pages/single/SinglePage'

const Layout = () => {
  return (
    <>
    <Header/>
    <main className='mt-17'>
        <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default Layout