import React from 'react'
import { categories } from '../assets/assets'
import { UseAppContext } from '../context/Appcontext'

const Categories = () => {
    const {navigate}=UseAppContext()
  return (
    <div className='mt-16'>
        <p className='text-2xl md:text-3xl font-medium'>Categories</p>
        <div className='grid grid-cols-2 sd:grid-cols-3 md:grid-cols-4 lg:grid-cols-6
        xl:grid-cols-7 mt-6 gap-6'>

            {categories.map((actegory,index) => (
           <div  key={index} className='group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col
                 justify-center items-center '
                style={{backgroundColor:actegory.bgColor}} 
                onClick={()=>{navigate(`/products/${actegory.path.toLocaleLowerCase()}`);
                window.scrollTo(0,0)}}>
                <img src={actegory.image} alt='img' className='group-hover:scale-110 transition max-w-28'/>
                <p className='text-sm font-medium'>{actegory.text}</p>
            </div>
            ))}
          
            
        </div>
    </div>
  )
}

export default Categories