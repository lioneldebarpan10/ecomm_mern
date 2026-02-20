import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom';

const heroImages = [
   assets.hero_img,
   assets.hero_img2,
   assets.hero_img3,
   assets.hero_img4,
];

const Hero = () => {

   const [currentIndex, setCurrentIndex] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentIndex(prev => (prev + 1) % heroImages.length);
      }, 3000);
      return () => clearInterval(interval);
   }, []);

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
               <div className='flex items-center gap-2 mt-5'>
                  <Link to='/collection' className='bg-[#333] text-white px-8 py-3 text-xs sm:text-sm uppercase font-medium hover:bg-black transition-all flex items-center gap-2'>
                     Explore Collection
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                     </svg>
                  </Link>
                  <Link to='/collection' className='bg-white text-[#333] px-8 py-3 text-xs sm:text-sm uppercase font-medium border border-[#333] hover:bg-gray-50 transition-all'>
                     View Categories
                  </Link>
               </div>

               {/* Dot indicators */}
               <div className='flex items-center gap-2 mt-6 justify-center sm:justify-start'>
                  {heroImages.map((_, i) => (
                     <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`rounded-full transition-all duration-300 cursor-pointer ${i === currentIndex
                           ? 'bg-[#414141] w-4 h-2'
                           : 'bg-gray-300 w-2 h-2'
                           }`}
                     />
                  ))}
               </div>
            </div>
         </div>

         {/**Hero Right - Crossfade Slideshow */}
         <div className='w-full sm:w-1/2 relative overflow-hidden max-h-[450px] sm:max-h-[525px]'>
            {/* Invisible placeholder keeps the natural image height */}
            <img src={heroImages[0]} alt="" className='w-full invisible max-h-[450px] sm:max-h-[525px] object-cover' aria-hidden="true" />
            {/* Crossfading images stacked on top */}
            {heroImages.map((src, i) => (
               <img
                  key={i}
                  src={src}
                  alt={`hero-slide-${i + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                     }`}
               />
            ))}
         </div>

      </div>
   )
}

export default Hero
