import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import Login from './components/Login'
import { UseAppContext } from './context/Appcontext'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'

const App = () => {

  const isSellerPath = useLocation().pathname.includes('/seller');
  const {showUserLogin} = UseAppContext();
  
  return (
    <div>
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
    
      <Toaster/>

      <div className={` ${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"} `}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Products' element={<AllProducts />} />
          <Route path='/Products/:category' element={<ProductCategory />} />
          <Route path='/Products/:category/:id' element={<ProductDetails />} />
        </Routes> 
      </div>
      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App