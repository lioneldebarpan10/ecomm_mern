import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'


export const ShopContext = createContext();

const ShopContextProvider = (props) => {
   const currency = '₹';
   const delivery_fee = 10;
   const [search, setSearch] = useState('');
   const [showSearch, setShowSearch] = useState(false);
   const [cartItems, setCartItems] = useState({});
   const [wishlistItems, setWishlistItems] = useState({});
   const [orders, setOrders] = useState([]);
   const navigate = useNavigate();

   {/**Add to cart function */ }
   const addToCart = async (itemId, size, quantity = 1) => {

      if (!size) {
         toast.error('Select Product Size')
         return;
      }

      let cartData = structuredClone(cartItems);
      // if cart has any property available with these Id
      if (cartData[itemId]) {
         // if cart has any existing data with these Id and size then increment count
         if (cartData[itemId][size]) {
            cartData[itemId][size] += quantity;
         }
         // if diff size then create new entry
         else {
            cartData[itemId][size] = quantity;
         }
      }
      // if no id exists in cart then create new item id entry
      else {
         cartData[itemId] = {};
         cartData[itemId][size] = 1;
      }

      setCartItems(cartData);
      toast.success('Added to Cart')
   }

   // Wishlist Functionality
   const addToWishlist = async (itemId) => {
      let wishlistData = structuredClone(wishlistItems);

      if (wishlistData[itemId]) {
         delete wishlistData[itemId];
         toast.success('Removed from Wishlist');
      } else {
         wishlistData[itemId] = true;
         toast.success('Added to Wishlist');
      }
      setWishlistItems(wishlistData);
   }

   const getWishlistCount = () => {
      return Object.keys(wishlistItems).length;
   }

   const getCartCount = () => {
      let totalCount = 0;
      for (const items in cartItems) {
         for (const item in cartItems[items]) {
            try {
               if (cartItems[items][item] > 0) {
                  totalCount += cartItems[items][item];
               }
            }
            catch (error) {

            }

         }
      }
      return totalCount;
   }

   const updateQuantity = async (itemId, size, quantity) => {

      const cartData = structuredClone(cartItems);

      cartData[itemId][size] = quantity;
      setCartItems(cartData);
   }

   // Order Placement Logic
   const placeOrder = (deliveryData) => {
      // Create order items from cart
      let orderItems = [];
      for (const items in cartItems) {
         for (const item in cartItems[items]) {
            if (cartItems[items][item] > 0) {
               const itemInfo = structuredClone(products.find(product => product._id === items));
               if (itemInfo) {
                  itemInfo.size = item;
                  itemInfo.quantity = cartItems[items][item];
                  itemInfo.date = new Date().toDateString(); // Add current date
                  itemInfo.status = 'Order Placed';
                  itemInfo.paymentMethod = deliveryData.method;
                  itemInfo.address = deliveryData.address;
                  orderItems.push(itemInfo);
               }
            }
         }
      }

      // Add to orders state (prepend new orders)
      setOrders(prev => [...orderItems, ...prev]);

      // Clear Cart
      setCartItems({});

      // Navigate to orders
      navigate('/orders');
      toast.success('Order Placed Successfully');
   }

   {/**Total amount in Cart logic */ }
   const getCartAmount = () => {
      let totalAmount = 0;
      for (const items in cartItems) {

         let itemInfo = products.find((product) => product._id === items);
         for (const item in cartItems[items]) {

            try {
               if (cartItems[items][item] > 0) {
                  totalAmount += itemInfo.price * cartItems[items][item];
               }
            }
            catch (error) {

            }
         }
      }
      return totalAmount
   }

   const value = {
      products, currency, delivery_fee,
      search, setSearch, showSearch, setShowSearch,
      cartItems, addToCart, getCartCount, updateQuantity,
      getCartAmount, navigate,
      wishlistItems, addToWishlist, getWishlistCount,
      orders, placeOrder
   }

   return (
      <ShopContext.Provider value={value}>
         {props.children}
      </ShopContext.Provider>
   )
}
export default ShopContextProvider;
