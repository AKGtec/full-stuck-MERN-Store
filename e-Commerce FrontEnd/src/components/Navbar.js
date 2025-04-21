import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import{ assets } from '../assets/assets' 
import { UseAppContext } from '../context/Appcontext'

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const {user, setUser,setShowUserLogin,navigate,setsearchQuery,searchQuery,getCardCount} = UseAppContext ();
    const logout = async() => {
        setUser(null);
        navigate("/")
    }
    useEffect(()=>{
        if(searchQuery.length > 0){
            navigate("/Products")}

    },[searchQuery])

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to={"/"}>
                <img className="h-9" src={assets.logo} alt="logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to ="/" onClick={()=> setOpen(false)}>Home</NavLink>
                <NavLink to ={"/Products"}>All Products</NavLink>
                <NavLink to ={"/Contact"}>Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e)=> setsearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt='Search' className='w-4 h-4'/>
                </div>

                <div onClick={()=> navigate("/cart")} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt='card' className='w6 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">{getCardCount()}</button>
                </div>

                {(!user ? <button onClick={()=> setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
                    Login
                </button> : 
                <div className='relative group'>
                   <img src={assets.profile_icon} alt='profile' className='w-10'/>
                   <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 w-30 text-sm py-2.5 z-40 rounded-md'>
                    <li onClick={()=> navigate("my-orders")} className='p-1.5 pl-3 hover:bg-indigo-500 cursor-pointer'>My Orders</li>
                    <li onClick={logout} className='p-1.5 pl-3 hover:bg-indigo-500 cursor-pointer'>Logout</li>
                   </ul>
                </div>)
                
            }
            </div>
            <div className='flex items-center gap-6 sm:hidden'>
                <div onClick={()=> navigate("/cart")} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt='card' className='w6 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">{getCardCount()}</button>
                </div>
                 <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" >
                    <img src={assets.menu_icon} alt='menu'/>
                 </button>
            </div>
           

            {/* Mobile Menu */}
            { open &&(
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink to={"/"} onClick={()=> setOpen(false)} className="block">Home</NavLink>
                <NavLink to={"/Products"} onClick={()=> setOpen(false)} className="block">All Products</NavLink>

                {user &&(
                <NavLink to={"/Orders"} onClick={()=> setOpen(false)} className="block">My Orders</NavLink>
                )}   

                <NavLink to={"/Contact"} onClick={()=> setOpen(false)} className="block">Contact</NavLink>

                {!user ? (
                    <button onClick={()=> {setOpen(false);setShowUserLogin(true)}} className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
                        Login
                    </button>
                ): (
                    <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
                    Logout
                    </button>
                )}    
                </div>
           )}

        </nav>
    )
}
export default Navbar