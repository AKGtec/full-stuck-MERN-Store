import React from 'react';
import { assets } from '../assets/assets';
import { UseAppContext } from '../context/Appcontext';


const ProductCard = ({product}) => {
   
    const {currency,addToCard,CardItems,removeCardItem,navigate} = UseAppContext();
  
    if (!product) return null;
    return (
        <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
            <div className="group cursor-pointer flex items-center justify-center px-2">
                <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={product.image[0]} alt={product.name} />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                       
                            <img key={i} className='md:w-3.5 w-3' src={i<4 ? assets.star_icon : assets.star_dull_icon} alt='img'/>
                     
                    ))}
                    <p>({4})</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-indigo-500">
                        {currency}${product.offerPrice}{" "} <span className="text-gray-500/60 md:text-sm text-xs line-through">{currency}${product.price}</span>
                    </p>
                    <div onClick={(e)=> {e.stopPropagation()}} className="text-indigo-500">
                        {!CardItems[product._id] ? (
                            <button className="flex cursor-pointer items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 "
                             onClick={() => addToCard(product._id)} >
                                <img src={assets.cart_icon}alt='add'/>
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-indigo-500/25 rounded select-none">
                                <button onClick={() => {removeCardItem(product._id)}} className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{CardItems[product._id]}</span>
                                <button onClick={() => {addToCard(product._id)}} className="cursor-pointer text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;