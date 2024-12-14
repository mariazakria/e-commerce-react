import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { cartUserProvuder } from '../../Context/CartProvider';
import { wishList } from '../../Context/WishListPorvider';

export default function Produtcs({product}) {
        const { addToCart } = useContext(cartUserProvuder)
        const { addToWishList } = useContext(wishList)
    return (
        <div key={product.id} className='shadow-lg shadow-t-lg p-3 rounded-lg relative hover:scale-105 transition-all duration-500'>
            <div className=' relative'>
                <img src={product.imageCover} className='w-full h-full object-cover' alt={product.title} />
                <div className="layer space-x-2 flex  cursor-pointer justify-center items-center  opacity-0 hover:opacity-100 bg-black/20 absolute top-0 start-0 end-0 bottom-0 w-full h-full duration-300 transition-all">
                    <span onClick={() => addToCart(product.id)} className='w-7 h-7 rounded-full hover:scale-110 transition-all duration-300 hover:rotate-3  flex justify-center items-center bg-secondColor text-white'>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </span>
                    <span onClick={() => addToWishList((product.id))} className='w-7 h-7 rounded-full cursor-pointer  hover:scale-110 transition-all duration-300 hover:rotate-3  flex justify-center items-center bg-secondColor text-white  '>
                        <i className="fa-regular fa-heart self-center  "></i>
                    </span>
                    <Link to={`/ProdcuDetails/${product.id}/${product.category.name}`} className='w-7 h-7 rounded-full  hover:scale-110 transition-all duration-300 hover:rotate-3  flex justify-center items-center bg-secondColor text-white  '>
                        <i className="fa-regular fa-eye"></i>
                    </Link>
                </div>
            </div>
            <p className='text-black font-semibold '>{product.title.split(" ", 2).join(" ")}</p>
            <div className='flex flex-col'>
                {product.priceAfterDiscount ?
                    <>
                        <div>
                            <span className='text-[#DB4444] '>{product.priceAfterDiscount} EGP </span>
                            <span className=' line-through text-[12px] text-black/80' >{product.price} EGP </span>
                        </div> </> : <span className='text-[#DB4444] ' >{product.price} EGP </span>
                }
                <div className='flex justify-between items-center '>
                    <div className="text-[16px] space-x-1">
                        {Array.from({ length: 5 }).map((_, index) => {
                            if (index + 1 <= Math.floor(product.ratingsAverage)) {
                                // نجمة ممتلئة
                                return <i key={index} className="fas fa-star text-[#FFA622]"></i>;
                            } else if (index < product.ratingsAverage) {
                                // نجمة نصف ممتلئة
                                return <i key={index} className="fas fa-star-half-alt text-[#FFA622]"></i>;
                            } else {
                                // نجمة فارغة
                                return <i key={index} className="fa-regular fa-star"></i>;
                            }
                        })}
                    </div>
                    <span className='text-end text-textColor/60'>({product.ratingsQuantity})</span>
                </div>
            </div>
            {product.priceAfterDiscount ? <span
                className="bg-[#DB4444] text-white left-4 rounded-md px-2  absolute top-4"
            >
                {Math.floor(((product.price - product.priceAfterDiscount) / product.price * 100).toFixed(2))}%
            </span> : ""}
        </div>
    )
}
