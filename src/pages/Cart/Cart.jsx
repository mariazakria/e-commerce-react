import React,{ useContext } from "react"
import { cartUserProvuder } from "../../Context/CartProvider"
import Loading from "../../components/Loading/Loading"
import toast from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"
import Error from "../../components/Error/Error";

import { Link } from "react-router-dom"
import NoItem from "../../components/NoItem/NoItem"
import { wishList } from "../../Context/WishListPorvider"
export default function Cart() {
    const { productCart, updataCart, deletItemCart, displayAllCart, numOfCartItems, totalCartPrice } = useContext(cartUserProvuder)
    const { addToWishList } = useContext(wishList)
    let { isLoading, isError } = useQuery({
        queryKey: ["displayAllCart"],
        queryFn: displayAllCart,
    });
    //for update count
    async function flagToUpdata(id, count) {
        const idToast = toast.loading("witing...")
        let flag = await updataCart(id, count)
        if (flag) {
            toast.dismiss(idToast)
            toast.success(" has been added to your cart.", {
                duration: 3000,
                theme: {
                    primary: 'green',
                    secondary: 'black',
                },
            })
        }
        else {
            toast.error("Some error Now Please try again later")
            toast.dismiss(idToast)
        }
    }
    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        return <Error />
    }
    if (numOfCartItems == 0) {
        return < NoItem >
            {"Your cart is empty.."}
            {" Add some items and come back later.."}
        </NoItem>
    }

    return (
        <>
            {numOfCartItems == 0 ? <p>you have noe order uet</p> : <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl text-center mb-6">
                    Shopping Cart
                </h2>
                <div className="px-4 2xl:px-0 flex flex-wrap lg:flex-nowrap lg:justify-between gap-6">
                    {/* Products Section */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-6">
                        {productCart?.map((procuts) => (
                            <div
                                key={procuts._id}
                                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                            >
                                <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
                                    <div className="w-20 shrink-0">
                                        <img
                                            className="h-20 w-20 object-cover dark:hidden"
                                            src={procuts.product.imageCover}
                                            alt="Product"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Link to={`/ProdcuDetails/${procuts?.product._id}/${procuts?.product?.category?.name}`}  className="text-base cursor-pointer font-medium text-gray-900 cursor-default dark:text-white">
                                            {procuts.product.title}
                                        </Link>
                                        <div className="flex items-center gap-4 mt-2">
                                            <button
                                                type="button"
                                                className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400"
                                                onClick={() => addToWishList(procuts.product._id)}
                                            >
                                                Add to Favorites
                                            </button>
                                            <button
                                                onClick={() => deletItemCart(procuts.product._id)}
                                                type="button"
                                                className="text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-4 sm:mt-0">
                                        <button onClick={() => flagToUpdata(procuts.product._id, procuts.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                            </svg>
                                        </button>
                                        <div>
                                            <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={procuts.count} required />
                                        </div>
                                        <button onClick={() => flagToUpdata(procuts.product._id, procuts.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="text-end w-full sm:w-32">
                                        <p className="text-base font-bold text-gray-900 dark:text-white">
                                            {procuts.price}$
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary Section */}
                    <div className="rounded-lg border border-gray-200 h-full bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 w-full lg:w-1/3">
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">
                            Order Summary
                        </p>
                        <div className="space-y-4 mt-4">
                            <dl className="flex justify-between">
                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                    Original price
                                </dt>
                                <dd className="text-base font-medium text-gray-900 dark:text-white">
                                    {totalCartPrice}$
                                </dd>
                            </dl>
                            <dl className="flex justify-between">
                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                    Savings
                                </dt>
                                <dd className="text-base font-medium text-green-600">-$00</dd>
                            </dl>
                            <dl className="flex justify-between">
                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                    Store Pickup
                                </dt>
                                <dd className="text-base font-medium text-gray-900 dark:text-white">
                                    $00
                                </dd>
                            </dl>
                            <dl className="flex justify-between border-t pt-4 dark:border-gray-700">
                                <dt className="text-base font-bold text-gray-900 dark:text-white">
                                    Total item
                                </dt>
                                <dd className="text-base font-bold text-gray-900 dark:text-white">
                                    {numOfCartItems}
                                </dd>
                            </dl>
                            <dl className="flex justify-between border-t pt-4 dark:border-gray-700">
                                <dt className="text-base font-bold text-gray-900 dark:text-white">
                                    Total
                                </dt>
                                <dd className="text-base font-bold text-gray-900 dark:text-white">
                                    {totalCartPrice}$
                                </dd>
                            </dl>
                        </div>

                        <Link
                            to="/Payment"
                            className="block mt-4 w-full btn"
                        >
                            Proceed to Checkout
                        </Link>
                        <p className="text-center w-full">or</p>
                        <Link className="mt-4 w-full btn block " to="/AllProducts" >

                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </section>}

        </>

    )
}
