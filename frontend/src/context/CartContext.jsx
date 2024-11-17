import React,{createContext,useContext,useState} from "react";
import useAxios from '../utils/useAxios'
import axios from "axios";

const cartContext = createContext();

export const useCart = ()=>{
    return useContext(cartContext)
}
export const CartProvider = ({children})=>{
    const axiosInstance = useAxios()

    const addCourseToCart = async (course_id) => {
        try {
            const response = axiosInstance.post('/cart/cart-item/',{
                "course" : course_id
            })
        } catch (error) {
            console.log(error)
        }
    }
    const removeCourseFromCart = async (course_id) => {
        try {
            const response =await axiosInstance.delete(`/cart/cart-item/${course_id}`)
        } catch (error) {
            console.log(error)
        }
    }
    const addCourseToWishlist = async(course_id)=>{
        try{
          const response = await axiosInstance.post(`/cart/wishlist-item/`,{
            'course':course_id
          })
        }catch(error){
          console.error(error)
        }
      }

    const removeCourseFromWishlist= async(item_id)=>{
        try{
            const  response = await axiosInstance.delete(`/cart/wishlist-item/${item_id}`)
        } catch(error){
          console.error(error);
        } 
      }
    return (
        <cartContext.Provider value={{addCourseToCart,removeCourseFromCart,addCourseToWishlist,removeCourseFromWishlist}}>
            {children}
        </cartContext.Provider>
    )
}