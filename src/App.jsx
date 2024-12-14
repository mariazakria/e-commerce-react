import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Layout from './layout/Layout'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import NotFound from './pages/NotFound/NotFound'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import EmailCode from './components/EmailCode/EmailCode'
import ResetPassword from './components/ResetPassword/ResetPassword'
import ProtectedRouter from './components/ProtectedRouter/ProtectedRouter'
import AllProducts from './components/AllProduct/AllProducts'
import ProdcuDetails from './components/ProdcuDetails/ProdcuDetails'
import Categories from './components/Categories/Categories'
import UserContextProvider from './Context/UserContextProvider'
import ProductContextProvider from './Context/ProductContextProvider'
import CartProvider from './Context/CartProvider'
import Cart from './pages/Cart/Cart'
import Payment from './pages/Payment/Payment'
import Allorders from './pages/allorders/Allorders'
import WishListPorvider from './Context/WishListPorvider'
import WishList from './pages/wishList/WishList'
import Brand from './pages/Brand/Brand'
let client = new QueryClient()
function App() {
  const router = createBrowserRouter([{
    path: "", element: <Layout />, children: [
      { index: true, element: <ProtectedRouter><Home /></ProtectedRouter> },
      { path: "Cart", element: <ProtectedRouter><Cart /></ProtectedRouter> },
      { path: "Brands", element: <ProtectedRouter><Brand /></ProtectedRouter> },
      { path: "AllProducts", element: <ProtectedRouter><AllProducts /></ProtectedRouter> },
      { path: "Payment", element: <ProtectedRouter><Payment /></ProtectedRouter> },
      { path: "allorders", element: <ProtectedRouter><Allorders /></ProtectedRouter> },
      { path: "WishList", element: <ProtectedRouter><WishList /></ProtectedRouter> },
      { path: "ProdcuDetails/:id/:category", element: <ProtectedRouter><ProdcuDetails /></ProtectedRouter> },
      { path: "Categories/:category", element: <ProtectedRouter><Categories /></ProtectedRouter> },
      { path: "ForgetPassword", element: <ForgetPassword /> },
      { path: "EmailCode", element: <EmailCode /> },
      { path: "ResetPassword", element: <ResetPassword /> },
      { path: "*", element: <NotFound /> },
      { path: "Register", element: <Register /> },
      { path: "Login", element: <Login /> },
    ]
  }])
  return (
    <>
      <UserContextProvider>
        <QueryClientProvider client={client}>
          <ProductContextProvider>
            <WishListPorvider>
              <CartProvider>
                <RouterProvider router={router}>
                </RouterProvider>
                <Toaster />
              </CartProvider>
            </WishListPorvider>
          </ProductContextProvider>
        </QueryClientProvider>
      </UserContextProvider>
    </>
  )
}

export default App
