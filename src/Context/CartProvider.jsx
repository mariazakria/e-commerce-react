import axios from 'axios'
import React,{ createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { userContextProvider } from './UserContextProvider';
export let cartUserProvuder = createContext()
export default function CartProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [productCart, setCartProducts] = useState([]);
  const [cartId, setcartId] = useState(0)
  const { token } = useContext(userContextProvider)
  //for add item to cart
  async function addToCart(productId) {
    let id;
    try {
      id = toast.loading("Waiting to add .....")
      let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
        productId
      }, {
        headers: {
          token
        }
      })
      toast.dismiss(id)
      if (data.status == "success") {
        setNumOfCartItems(data.numOfCartItems)
        setTotalCartPrice(data.data.totalCartPrice)
        setCartProducts(data.data.products)
        setcartId(data.cartId)
        toast.success(data.message);
        console.log(data)
      }
    } catch (error) {
      toast.error("please try add your product again")
      toast.dismiss(id);
    }
  }
  //for get all item what i add and display it
  async function displayAllCart() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token
      }
    }).then(
      res => {
        setNumOfCartItems(res.data.numOfCartItems)
        setTotalCartPrice(res.data.data.totalCartPrice)
        setCartProducts(res.data.data.products)
        setcartId(res.data.cartId)
        return res.data;
      }
    )
  }
  async function updataCart(id, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      count
    }, {
      headers: {
        token
      }
    }).then((res) => {
      setNumOfCartItems(res.data.numOfCartItems)
      setTotalCartPrice(res.data.data.totalCartPrice)
      setCartProducts(res.data.data.products)
      return true
    }
    )
      .catch(() => {
        return false
      }
      )
  }

  async function deletItemCart(id) {
    let load;
    try {
      load = toast.loading("waiting to delete product from your Cart ......");
      const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token
        }
      })
      toast.dismiss(load);
      toast.success("Product has been deleted from Cart");
      setNumOfCartItems(data.numOfCartItems)
      setTotalCartPrice(data.data.totalCartPrice)
      setCartProducts(data.data.products)
    }
    catch (error) {
      toast.error("There is some error plasse try again later..");
    } finally {
      toast.dismiss(load);
    }
  }
  return (
    <cartUserProvuder.Provider value={{ addToCart, productCart, displayAllCart, deletItemCart, updataCart, numOfCartItems, totalCartPrice, cartId }}>
      {children}
    </cartUserProvuder.Provider>
  )
}
