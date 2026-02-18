import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import {toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'


export const ShopContext = createContext();

const ShopContextProvider = (props) => {
   const currency = '$';
   const delivery_fee = 10;
   const [search, setSearch] = useState('');
   const [showSearch, setShowSearch] = useState(false);
   const [cartItems, setCartItems] = useState({});
   const navigate = useNavigate();

   {/**Add to cart function */ }
   const addToCart = async (itemId, size) => {

      if(!size){
         toast.error('Select Product Size')
         return;
      }

      let cartData = structuredClone(cartItems);
      // if cart has any property available with these Id
      if (cartData[itemId]) {
         // if cart has any existing data with these Id and size then increment count
         if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
         }
         // if diff size then create new entry
         else {
            cartData[itemId][size] = 1;
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

   const getCartCount = () => {
      let totalCount = 0;
      for(const items in cartItems){
         for(const item in cartItems[items]){
            try{
               if(cartItems[items][item] > 0){
                  totalCount += cartItems[items][item];
               }
            }
            catch(error){

            }

         }
      }
      return totalCount;
   }

   const updateQuantity = async (itemId , size , quantity) => {

      const cartData = structuredClone(cartItems);

      cartData[itemId][size] = quantity;
      setCartItems(cartData);
   }

   {/**Total amount in Cart logic */}
   const getCartAmount = () => {
      let totalAmount = 0;
      for(const items in cartItems){

         let itemInfo = products.find((product) => product._id === items);
         for(const item in cartItems[items]){

            try{
               if(cartItems[items][item] > 0){
                  totalAmount += itemInfo.price * cartItems[items][item];
               }
            }
            catch(error){

            }
         }
      }
      return totalAmount
   }

   const value = {
      products, currency, delivery_fee,
      search, setSearch, showSearch, setShowSearch,
      cartItems, addToCart ,getCartCount, updateQuantity,
      getCartAmount, navigate,
   }

   return (
      <ShopContext.Provider value={value}>
         {props.children}
      </ShopContext.Provider>
   )
}
export default ShopContextProvider;
