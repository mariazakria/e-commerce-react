import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { allProductPorvider } from '../../Context/ProductContextProvider'
import Error from "../Error/Error";
import Produtcs from '../Produtcs/Produtcs'
export default function TopProducts() {
    //To product to show in Home Page

    const { allPorduct, isLoading, isError } = useContext(allProductPorvider)
    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        return   <Error />
    }
    return (
        <>
            <section className='text-center mb-10'>
                <h2 className='font-semibold text-xl mb-3  text-textColor  p-1  '>
                    Popular  Products
                </h2>
                <div className='grid lg:grid-cols-4 xl:grid-cols-6  md:grid-cols-3 sm:grid-cols-2   gap-5  mb-6 container mx-auto overflow-x-hidden-hidden'>
                    {allPorduct.slice(26, 38)?.map((product) => 
                        <Produtcs  key={product.id} product={product}/>
                    )}
                </div>
                <Link to={'/AllProducts'} className='btn mx-auto '>
                    see more
                </Link>
            </section>
        </>
    )
}
