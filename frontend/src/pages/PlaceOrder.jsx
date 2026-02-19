import React, { useContext, useState, useEffect } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify';

const PlaceOrder = () => {

  const { navigate, token, cartItems, setCartItems, addToCart, products, currency, placeOrder } = useContext(ShopContext);
  const [method, setMethod] = useState('cod'); // by default cash on delivery
  const [cartData, setCartData] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      // Validate if all fields are filled
      for (const key in formData) {
        if (formData[key] === "") {
          toast.error("Please fill all delivery details");
          return;
        }
      }

      // Prepare order data
      const orderData = {
        address: formData,
        items: cartItems,
        amount: 0, // Calculate amount if needed/available, otherwise handled in context
      }

      // Call placeOrder from context
      placeOrder({ method, address: formData });

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, products]);

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'>

      {/*Left Side - Input form for delivery details */}
      <form onSubmit={onSubmitHandler} className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'Delivery'} text2={'Information'} />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email Address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Enter Street Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='Enter City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='Enter State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" placeholder='Enter ZIP Code' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder='Enter Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder='Enter Contact Number' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
      </form>

      {/**right side - payment method layout section */}
      <div className='mt-8'>
        {/**Cart Total Section */}
        <div className='mt-8 min-w-80'>
          {/* Cart Summary */}
          <div className='mb-8'>
            <Title text1={'Cart'} text2={'Summary'} />
            <div className='flex flex-col gap-3 mt-4'>
              {cartData.map((item, index) => {
                const productData = products.find(product => product._id === item._id);
                if (!productData) return null;
                return (
                  <div key={index} className='flex items-start gap-4 border-b pb-3'>
                    <img src={productData.image[0]} className='w-16 h-16 object-cover rounded' alt={productData.name} />
                    <div className='flex-1'>
                      <p className='text-sm font-medium'>{productData.name}</p>
                      <div className='flex justify-between items-center mt-1'>
                        <p className='text-xs text-gray-500'>Size: {item.size} | Qty: {item.quantity}</p>
                        <p className='text-sm font-medium'>{currency}{productData.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
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
            <button className='bg-black text-white px-16 py-3 text-sm cursor-pointer' onClick={onSubmitHandler}
            >Place Order</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PlaceOrder
