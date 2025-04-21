import React, { useEffect, useState } from 'react'
import { UseAppContext } from '../context/Appcontext';
import { dummyOrders } from '../assets/assets';

const MyOrders = () => {

    const [myOrders,setmyOrders]=useState([])
    const {currency} = UseAppContext();
    const fetchMyOrders = async () => {
        setmyOrders(dummyOrders)
    }

    useEffect(() => {
        fetchMyOrders()
    }, []);

  return (
    <div className='mt-16 pb-16'>
        <div className='flex flex-col items-end w-max mb-8'>
            <p className='text-2xl font-medium uppercase'>My Orders</p>
            <div className='w-16 h-0.5 bg-indigo-500 rounded-full'></div>
        </div>
        {myOrders.map((order, index) => (
            <div className='border border-gray-300 rounded-lg p-4 mb-10 py-5 max-w-4xl' key={index}>
                <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
                    <span>OrderId : {order._id}</span>
                    <span>Payment : {order.paymentType}</span>
                    <span>Total Amount : {currency}{order.amount}</span>
                </p>
                {order.items.map((item, index) => (
                    <div key={index} className={`relative bg-white text-gray-500/70 ${order.items.length !== index +1 && "border-b "}
                    border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 
                    py-5 md:gap-16 w-full max-w-4xl`}>
                        <div className='flex items-center mb-4 md:mb-0'>
                            <div className='bg-green-100 p-4 rounded-lg'>
                                <img className='w-16 h-16' src={item.product.image[0]} alt='img'/>
                            </div>
                            <div className='m-l-4'>
                                <h2 className='text-xl font-medium text-gray-800'>{item.product.name}</h2>
                                <p>Category :{item.product.category}</p>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
                            <p>Quantity :{item.quantity || "1"}</p>
                            <p>Status :{order.status || "1"}</p>
                            <p>Date :{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <p className='text-indigo-500 text-lg font-medium'>Amount :{currency}{item.product.offerPrice * item.quantity}</p>

                    </div>
                ))}
            </div>
        ))}
        
    </div>
  )
}

export default MyOrders