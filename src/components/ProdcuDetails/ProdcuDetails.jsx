import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
import Slider from 'react-slick';
import Button from '../Button/Button';
import { allProductPorvider } from '../../Context/ProductContextProvider';
import { cartUserProvuder } from '../../Context/CartProvider';
import Rating from '../Ratting/Rating';
import { wishList } from '../../Context/WishListPorvider';
import Error from '../Error/Error';
export default function ProdcuDetails() {
    //that for prodcutDeltails and RelatedItem
    const { allPorduct, isLoading, isError } = useContext(allProductPorvider)
    const { addToCart } = useContext(cartUserProvuder)
    const { addToWishList } = useContext(wishList)

    let { id, category } = useParams()
    function getSpecificProduct(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }
    const { data: specifciProduct } = useQuery({
        queryKey: ["productDetails", id],
        queryFn: () => getSpecificProduct(id),
        staleTime: 5000,
        refetchInterval: 5000000,
        retry: 3,
        retryDelay: 5000,
        gcTime: 5000,
        select: (specifciProduct) => specifciProduct.data.data
    })
    const reladtedProdect = allPorduct?.filter(product => product.category.name == category)
    const [mainImage, setMainImage] = useState("");
    useEffect(() => {
        if (specifciProduct) setMainImage(specifciProduct?.imageCover);
    }, [specifciProduct]);
    const thumbnailSettings = {
        slidesToShow: 4,
        slidesToScroll: 2,
        infinite: true,
        focusOnSelect: true,
        responsive: [
            { breakpoint: 768, settings: { slidesToShow: 3 } },
            { breakpoint: 480, settings: { slidesToShow: 2 } },
        ],
    };
    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        return <Error />
    }
    { console.log(specifciProduct) }

    return (
        <>
            {
                <div className="grid grid-cols-[1fr_1.5fr] gap-5 mt-10 container mx-auto ">
                    <div className="overflow-hidden ">
                        <div className="main-image">
                            <img
                                src={mainImage}
                                alt={specifciProduct?.title}
                                className="w-[70%] mx-auto object-cover rounded-md"
                            />
                        </div>
                        {specifciProduct?.images && (
                            <div className="thumbnail-slider mt-4">
                                <Slider {...thumbnailSettings}>
                                    {specifciProduct?.images.map((img, index) => (
                                        <div
                                            key={index}
                                            className="thumbnail-item cursor-pointer"
                                            onClick={() => setMainImage(img)}
                                        >
                                            <img
                                                src={img}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="w-full h-[100px] object-cover rounded-md border hover:opacity-80"
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        )}
                    </div>
                    <div className="flex  flex-col ">
                        <p className='text-[14px] text-black/80'>{specifciProduct?.brand.name}</p>
                        <h2 className="font-bold mb-2">{specifciProduct?.title}</h2>
                        {specifciProduct?.priceAfterDiscount ?
                            <>
                                {console.log(specifciProduct)}
                                <div>
                                    <span className=' line-through text-[12px] font-bold  text-black/60 me-4' >{specifciProduct.price} EGP </span>
                                    <span className='text-[#DB4444] font-bold '>{specifciProduct.priceAfterDiscount} EGP </span>
                                    {specifciProduct?.priceAfterDiscount ? <span
                                        className="bg-[#DB4444]/80 text-white rounded-md px-1 ms-6 text-[16px]"
                                    >
                                        {Math.floor(((specifciProduct?.price - specifciProduct?.priceAfterDiscount) / specifciProduct?.price * 100).toFixed(2))}%
                                    </span> : ""}
                                </div> </> : <span className='text-[#DB4444]  font-bold ' >{specifciProduct?.price} EGP </span>
                        }
                        <div className='flex flex-col'>
                            <div className='flex gap-4 items-center '>
                                <div className="text-[16px] space-x-1">
                                    {Array.from({ length: 5 }).map((_, index) => {
                                        if (index + 1 <= Math.floor(specifciProduct?.ratingsAverage)) {
                                            // نجمة ممتلئة
                                            return <i key={index} className="fas fa-star text-[#FFA622]"></i>;
                                        } else if (index < specifciProduct?.ratingsAverage) {
                                            // نجمة نصف ممتلئة
                                            return <i key={index} className="fas fa-star-half-alt text-[#FFA622]"></i>;
                                        } else {
                                            // نجمة فارغة
                                            return <i key={index} className="fa-regular fa-star"></i>;
                                        }
                                    })}
                                </div>
                                <span className='text-end text-textColor/60'>({specifciProduct?.ratingsAverage})</span>
                                <span className='text-end text-textColor/60'>{specifciProduct?.ratingsQuantity} Reviews</span>
                            </div>
                        </div>
                        <h4 className='font-semibold my-2 text-textColor '>Description</h4>
                        <p className='text-textColor/80 mb-2 max-w-[60%]'>{specifciProduct?.description}</p>

                        <div className="flex gap-5 items-center">
                            <Button onClick={() => addToCart(specifciProduct._id)} className="btn w-[80%] rounded-lg m-0">
                                Add to Cart
                            </Button>

                            <div onClick={() => addToWishList(specifciProduct._id)} className='w-8 h-full  self-start cursor-pointer rounded-full  hover:scale-110 transition-all duration-300  flex justify-center items-center bg-secondColor text-white  '>
                                <i className="fa-regular fa-heart self-center  "></i>
                            </div>

                        </div>
                        <p className=' text-[14px] font-bold mt-4  text-black/80 me-4'> <i className="fa-solid fa-truck-moving"></i> <span className=' text-[14px] font-bold  text-black/60 me-4'>Free deliver on orders over $30.0</span></p>
                    </div>
                </div>
            }
            <>
                <p className='text-lg font-semibold my-6 text-textColor'>This item can be cool with this</p>
                <div className='grid lg:grid-cols-4 xl:grid-cols-6  md:grid-cols-3 sm:grid-cols-2   gap-5  mb-6 container mx-auto overflow-x-hidden-hidden'>

                    {reladtedProdect?.map((product) =>
                        <div key={product.id} className='shadow-lg shadow-t-lg p-3 rounded-lg relative hover:scale-105 transition-all duration-500'>

                            <div className=' relative'>
                                <img src={product.imageCover} className='w-full h-full object-cover' alt={product.title} />
                                <div className="layer space-x-2 cursor-pointer flex justify-center items-center  opacity-0 hover:opacity-100 bg-black/20 absolute top-0 start-0 end-0 bottom-0 w-full h-full duration-300 transition-all">
                                    <span onClick={() => addToCart(specifciProduct._id)} className='w-7 h-7 rounded-full hover:scale-110 transition-all duration-300 hover:rotate-3  flex justify-center items-center bg-secondColor text-white'>
                                        <i className="fa-solid fa-cart-shopping"></i>
                                    </span>
                                    <span onClick={() => addToWishList(product._id)} className='w-7 h-7 cursor-pointer rounded-full  hover:scale-110 transition-all duration-300 hover:rotate-3  flex justify-center items-center bg-secondColor text-white  '>
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
                    )}
                </div></>
            <h3 className='font-semibold text-xl text-textColor  '>Customer Feedback</h3>
            <Rating />
        </>
    )
}
