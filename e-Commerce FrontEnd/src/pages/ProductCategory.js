import React from 'react'
import { UseAppContext } from '../context/Appcontext';
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';

const ProductCategory = () => {
    const {Products} = UseAppContext();
    const {category} =useParams()
    const searchCategory = categories.find((item)=> item.path.toLowerCase()===category)
    const filteredProducts = Products.filter((product) => product.category.toLowerCase() === category)
   
 
    return (
    <div className='mt-16'>
        {searchCategory && (
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl font-medium'> {searchCategory.text.toUpperCase()}</p>
                <div className='w-16 h-0.5 bg-indigo-500 rounded-full'></div>
     
            </div>
        )}
        {filteredProducts.length >0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6'>
                {filteredProducts.map((product)=>(
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>
        ) :(
            <div className='flex items-center justify-center h-[60vh]'>
                <p className='text-2xl font-medium text-indigo-500'> No products found in this category .</p>
            </div>
        )      
        }
    </div>
  )
}

export default ProductCategory