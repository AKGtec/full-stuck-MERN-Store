import React, { useEffect, useState } from 'react'
import { assets, dummyAddress } from '../assets/assets'
import { UseAppContext } from '../context/Appcontext'

const Cart = () => {

         const {navigate,Products,currency,updateCardItem,removeCardItem,CardItems,getCardCount,getCardAmount} = UseAppContext()
         const [cartArray,setcartArray]=useState([])
         const [addresses,setaddresses]=useState(dummyAddress)
         const [showAddress, setShowAddress] = useState(false)
         const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0])
         const [paymentOption, setpaymentOption] = useState("COD")

         const getCart = ()=>{
            let tempArray =[]
            for(const key in CardItems){
                const product = Products.find((item) => item._id === key)
                    product.quantity = CardItems[key]
                    tempArray.push(product)
                
            }
            setcartArray(tempArray)
         }

        
        useEffect(() => {
            if (Products.length > 0 && CardItems) {
              getCart()
            }
          }, [Products, CardItems]);

         const placeOrder = async() => {}

        return Products.length > 0 && CardItems ? (
            <div className="flex flex-col md:flex-row mt-16">
                <div className='flex-1 max-w-4xl'>
                    <h1 className="text-3xl font-medium mb-6">
                        Shopping Cart <span className="text-sm text-indigo-500">{getCardCount()}</span>
                    </h1>
    
                    <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                        <p className="text-left">Product Details</p>
                        <p className="text-center">Subtotal</p>
                        <p className="text-center">Action</p>
                    </div>
    
                    {cartArray.map((product, index) => (
                        <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                            <div className="flex items-center md:gap-6 gap-3">
                                <div onClick={()=>{
                                        navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                                        window.scrollTo(0, 0);
                                }} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                                    <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                                </div>
                                <div>
                                    <p className="hidden md:block font-semibold">{product.name}</p>
                                    <div className="font-normal text-gray-500/70">
                                        <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                        <div className='flex items-center'>
                                            <p>Qty:</p>
                                            <select onChange={x => updateCardItem(product._id,Number(x.target.value))}
                                            value={CardItems[product._id]} className='outline-none'>
                                                {Array(CardItems[product._id] > 9 ? CardItems[product._id] : 9).fill('').map((_, index) => (
                                                    <option key={index} value={index + 1}>{index + 1}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
                            <button onClick={()=>removeCardItem(product._id)} className="cursor-pointer mx-auto">
                                <img src={assets.remove_icon} alt='remove' className='inline-block w-6 h-6'/>
                            </button>
                        </div>)
                    )}
    
                    <button onClick={()=> {navigate("/products");window.scrollTo(0,0)}} className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium">
                        <img className='group-hover:-translate-x-1 transition' src={assets.arrow_right_icon_colored} alt='continue'/>
                        Continue Shopping
                    </button>
    
                </div>
    
                <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                    <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                    <hr className="border-gray-300 my-5" />
    
                    <div className="mb-6">
                        <p className="text-sm font-medium uppercase">Delivery Address</p>
                        <div className="relative flex justify-between items-start mt-2">
                            <p className="text-gray-500">{selectedAddress ? `${selectedAddress.street},${selectedAddress.city},
                            ${selectedAddress.state},${selectedAddress.country}`:"No address found"}</p>
                            <button onClick={() => setShowAddress(!showAddress)} className="text-indigo-500 hover:underline cursor-pointer">
                                Change
                            </button>
                            {showAddress && (
                                <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                    {addresses.map((addres,index)=>(
                                         <p key={index} onClick={() => {setSelectedAddress(addres) ;setShowAddress(false)}} className="text-gray-500 p-2 hover:bg-gray-100">
                                        {addres.street}, {addres.city}, {addres.state}, {addres.country}
                                        </p>))}
                                    <p onClick={() => navigate("/add-address")} className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10">
                                        Add address
                                    </p>
                                </div>
                            )}
                        </div>
    
                        <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
    
                        <select onChange={e => setpaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                            <option value="COD">Cash On Delivery</option>
                            <option value="Online">Online Payment</option>
                        </select>
                    </div>
    
                    <hr className="border-gray-300" />
    
                    <div className="text-gray-500 mt-4 space-y-2">
                        <p className="flex justify-between">
                            <span>Price</span><span>{currency}{getCardAmount()}</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Shipping Fee</span><span className="text-green-600">Free</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Tax (2%)</span><span>{currency}{getCardAmount()*2/100}</span>
                        </p>
                        <p className="flex justify-between text-lg font-medium mt-3">
                            <span>Total Amount:</span><span>{currency}{getCardAmount()+getCardAmount()*2/100}</span>
                        </p>
                    </div>
    
                    <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
                        {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
                    </button>
                </div>
            </div>
        ):null
    }
export default Cart