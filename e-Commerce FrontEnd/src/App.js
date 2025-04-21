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
import Cart from './pages/Cart'
import AddAddresse from './pages/AddAddresse'
import MyOrders from './pages/MyOrders'
import SellerLogin from './components/seller/SellerLogin'
import SellerLyout from './pages/seller/SellerLyout'
import AddProduct from './pages/seller/AddProduct'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'

const App = () => {

  const isSellerPath = useLocation().pathname.includes('/seller');
  const {showUserLogin,isSeller} = UseAppContext();
  
  return (
    <div className='text-defult min-h-screen text-gray-700 bg-white'>

      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
    
      <Toaster/>

      <div className={` ${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"} `}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Products' element={<AllProducts />} />
          <Route path='/Products/:category' element={<ProductCategory />} />
          <Route path='/Products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddresse />} />
          <Route path='/my-orders' element={<MyOrders />} />
          <Route path='/seller' element={isSeller ? <SellerLyout/> : <SellerLogin />} >
                  <Route index element={isSeller ? <AddProduct/>:null}/>
                  <Route path='product-list' element={<ProductList/>}/>
                  <Route path='orders' element={<Orders/>}/>
          </Route>
        </Routes> 
      </div>
      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App