import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
   return (
      <div className='flex flex-col sm:flex-row border border-gray-400 mt-5'>
         {/**Hero Left */}
         <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 bg-gray-50'>
            <div className='text-[#414141] text-center sm:text-left px-4'>
               <div className='flex items-center gap-2 justify-center sm:justify-start mb-2'>
                  <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                  <p className='font-medium text-sm md:text-base uppercase tracking-widest'>Our Bestsellers</p>
               </div>
               <h1 className='text-4xl sm:py-3 lg:text-6xl leading-tight prata-regular mb-4'>Latest Arrivals</h1>
               <div className='flex items-center gap-2 justify-center sm:justify-start hover:text-gray-600 transition-colors cursor-pointer'>
                  <p className='font-semibold text-sm md:text-base uppercase tracking-wide'>Shop Now</p>
                  <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
               </div>
            </div>

         </div>
         {/*Hero right */}
         <img src={assets.hero_img} alt="hero-image" className='w-full sm:w-1/2 object-cover' />

      </div>
   )
}

export default Hero
