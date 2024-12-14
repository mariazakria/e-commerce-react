import React,{ createContext, useContext } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import  { userContextProvider } from './UserContextProvider';
export const wishList = createContext();
export default function WishListPorvider({ children }) {
    const { token } = useContext(userContextProvider)
    //for add item to cart
    async function addToWishList(productId) {
        let id;
        try {
            id = toast.loading("Waiting to add .....")
            let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", {
                productId
            }, {
                headers: {
                    token
                }
            })
            toast.dismiss(id)
            toast.success(data.message);
        } catch {
            toast.error("please try add your product again")
            toast.dismiss(id);
        }
    }
    //for get all item what i add and display it
    async function displayWishList() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: {
                    token
                }
            })
            return data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function deletWishList(id) {
        let load;
        try {
            load = toast.loading("waiting to delete product from your WishList ......");
            const { data } = await axios.delete( `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
                { headers: { token } }
            );
            toast.dismiss(load);
            toast.success("Product has been deleted from wishlist");
            return data;
        } catch (error) {
            toast.error("There is some error plasse try again later..");
            console.error(error);
            throw error;
        } finally {
            toast.dismiss(load);
        }
    }
    return (
        <wishList.Provider value={{ addToWishList, displayWishList, deletWishList }}>
            {children}
        </wishList.Provider>
    )
}

