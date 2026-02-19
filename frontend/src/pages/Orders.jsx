import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';

const Orders = () => {
  const { products, currency, orders } = useContext(ShopContext);


  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'My'} text2={'orders'} />
      </div>

      <div>
        {
          orders.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start text-sm gap-4'>
                <img src={item.image[0]} alt="product-image" className='w-16 sm:w-20' />

                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mt-2 text-base text-gray-700'>
                    <p className='text-lg'>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-2 text-sm'>Date: <span className='text-gray-400'>{item.date}</span></p>
                  <p className='mt-2 text-sm'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>

              <div className='md:w-1/2 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 mt-4 md:mt-0'>
                <div className='flex items-center gap-2'>
                  <span className='w-2 h-2 rounded-full bg-green-500 inline-block'></span>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>

                <button className='border px-4 py-2 text-sm font-medium rounded-sm self-start md:self-auto'>Track Order</button>

              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Orders
