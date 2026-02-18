import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {

  const { navigate } = useContext(ShopContext);
  const [method, setMethod] = useState('cod'); // by default cash on delivery

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'>

      {/*Left Side - Input form for delivery details */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'Delivery'} text2={'Information'} />
        </div>

        <div className='flex gap-3'>
          <input type="text" placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input type="email" placeholder='Email Address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input type="text" placeholder='Enter Street Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />

        <div className='flex gap-3'>
          <input type="text" placeholder='Enter City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='Enter State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>

        <div className='flex gap-3'>
          <input type="number" placeholder='Enter ZIP Code' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='Enter Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input type="number" placeholder='Enter Contact Number' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
      </div>

      {/**right side - payment method layout section */}
      <div className='mt-8'>
        {/**Cart Total Section */}
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'Payment'} text2={'Method'} />
          {/**============Payment Method Selection========== */}
          <div className='flex gap-3 flex-col lg:flex-row'>

            <div className='flex items-center gap-3 border border-gray-500  p-2 px-3 cursor-pointer' onClick={() => setMethod('stripe')}>
              <p className={`min-w-3.5 h-3.5 border border-gray-500 rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} alt="stripe-logo" className='h-5 mx-4' />
            </div>

            <div className='flex items-center gap-3 border border-gray-500 p-2 px-3 cursor-pointer' onClick={() => setMethod('razorpay')}>
              <p className={`min-w-3.5 h-3.5 border border-gray-500 rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay_logo} alt="razorpay-logo" className='h-5 mx-4' />
            </div>

            <div className='flex items-center gap-3 border border-gray-500 p-2 px-3 cursor-pointer' onClick={() => setMethod('cod')}>
              <p className={`min-w-3.5 h-3.5 border border-gray-500  rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>Cash on Delivery</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button className='bg-black text-white px-16 py-3 text-sm cursor-pointer' onChange={navigate('/orders')}>Place Order</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PlaceOrder
