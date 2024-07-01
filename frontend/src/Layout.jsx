import React from 'react'
import Header from './component/Header/Header.jsx'
import Footer from './component/Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

//outlet the part in which component is gonna change according to routes --header and footer are same for each pages and deos not rerender
function Layout() {
  return (

     <section className="home-section">
      <div className=''>
          <div className='gradient' />
      </div>
      <Header/>
      <Outlet/>
      <Footer/>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
    </section>
  )
}

export default Layout