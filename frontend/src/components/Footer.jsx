import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
   return (
      <div>

         <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
               <img src={assets.logo} alt="footer-logo" className='mb-5 w-32' />
               <p className='w-full md:w-2/3 text-gray-600'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis sapiente repellendus fugit maiores amet omnis!
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo dicta, aspernatur sint ut illum quaerat?
               </p>
            </div>

            <div>
               <p className='font-medium text-xl mb-5'>Company</p>
               <ul className='flex flex-col gap-1 text-gray-600'>
                  <li>Home</li>
                  <li>About us</li>
                  <li>Delivery</li>
                  <li>Privacy Policy</li>
               </ul>
            </div>

            <div>
               <p className='font-medium text-xl mb-5'>Get in touch</p>
               <ul className='flex flex-col gap-1 text-gray-600'>
                  <li>8617374285</li>
                  <li>dbrpn07cse@gmail.com</li>
                  <li></li>
               </ul>
            </div>

         </div>

         <div className='border-t border-gray-300'>
            <p className='py-5 text-sm text-center'>Copyright 2026 @DebarpanDeb | All rights reserved</p>
         </div>
      </div>
      
  )
}

export default Footer
