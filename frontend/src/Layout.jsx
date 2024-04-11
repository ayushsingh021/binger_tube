import React from 'react'
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'
import { Outlet } from 'react-router-dom'

//outlet the part in which component is gonna change according to routes --header and footer are same for each pages and deos not rerender
function Layout() {
  return (

     <div className="h-screen">
         <Header/>
      
      <Outlet/>
      
      <Footer/>
    </div>

   
     
      
   
  )
}

export default Layout