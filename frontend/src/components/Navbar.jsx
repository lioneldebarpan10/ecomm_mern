import React from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

   const [visible, setVisible] = useState(false);
   const { setShowSearch, getCartCount } = useContext(ShopContext);
   return (
      <div className='flex items-center justify-between py-5 font-medium'>
         {/*Left Section Logo  */}
         <Link to='/'>
            <img src={assets.logo} className='w-36' alt='logo' />
         </Link>

         {/*Centered Navlinks */}
         <ul className='hidden sm:flex gap-5 text-sm  text-gray-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
               <p>Home</p>
               <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1'>
               <p>Collection</p>
               <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
               <p>About</p>
               <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
               <p>Contact</p>
               <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
         </ul>

         <div className='flex items-center gap-6'>
            {/*Search Icon */}
            <img src={assets.search_icon} alt="search-icon" className='w-5 cursor-pointer' onClick={() => setShowSearch(true)} />

            {/*Profile Menu design & dropdown */}
            <div className='group relative'>
               <img src={assets.profile_icon} alt="profile-icon" className='w-5 cursor-pointer' />
               <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                  <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-200 text-gray-500 rounded'>
                     <p className='cursor-pointer hover:text-black'>My Profile</p>
                     <p className='cursor-pointer hover:text-black'>Orders</p>
                     <p className='cursor-pointer hover:text-black'>Log out</p>
                  </div>
               </div>
            </div>

            {/*Cart Icon Design Section */}
            <Link to='/cart' className='relative'>
               <img src={assets.cart_icon} alt="cart-icon" className='w-5 min-w-5' />
               <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link>


            {/**Side bar Menu icon for smaller screens */}
            <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="sidebar-menu" className='w-5 cursor-pointer sm:hidden' />
         </div>

         {/*Sidebar Menu for Smaller screens */}
         <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all  ${visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
               <div className="flex items-center p-3 gap-4 cursor-pointer" onClick={() => setVisible(false)}>
                  <img src={assets.dropdown_icon} alt="sidebar-dropdown" className='h-4 rotate-180' />
                  <p>Back</p>
               </div>

               <NavLink to='/' className='py-2 pl-6 border' onClick={() => setVisible(false)}>Home</NavLink>
               <NavLink to='/collection' className='py-2 pl-6 border' onClick={() => setVisible(false)}>Collection</NavLink>
               <NavLink to='/about' className='py-2 pl-6 border' onClick={() => setVisible(false)}>About</NavLink>
               <NavLink to='/contact' className='py-2 pl-6 border' onClick={() => setVisible(false)}>Contact</NavLink>

            </div>

         </div>

      </div>
   )
}

export default Navbar
