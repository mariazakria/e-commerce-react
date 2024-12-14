import React,{ useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import CategorySliderHome from '../CategorySliderHome/CategorySliderHome'
import { allProductPorvider } from '../../Context/ProductContextProvider'
import { cartUserProvuder } from "../../Context/CartProvider";
import { wishList } from '../../Context/WishListPorvider'
import Error from '../Error/Error'

export default function AllProducts() {
    //this components for display all products
    const { allPorduct, isLoading, isError } = useContext(allProductPorvider)
    const { addToCart } = useContext(cartUserProvuder)
    const { addToWishList } = useContext(wishList)

    //add item to cart 
    const [filter, setFilter] = useState({
        search: '',
        priceOrder: '', // Empty, 'asc', 'desc'
        ratingOrder: '', // Empty, 'asc', 'desc'
    });
    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        return  <Error />
    }

    // تطبيق الفلاتر
    const filteredProducts = allPorduct?.filter((product) =>
        product.title.toLowerCase().includes(filter.search.toLowerCase()) // البحث
    );
    // فلترة السعر
    if (filter.priceOrder) {
        filteredProducts.sort((a, b) => {
            return filter.priceOrder === 'asc'
                ? a.price - b.price
                : b.price - a.price;
        });
    }
    // فلترة التقييم
    if (filter.ratingOrder) {
        filteredProducts.sort((a, b) => {
            return filter.ratingOrder === 'asc'
                ? a.ratingsAverage - b.ratingsAverage
                : b.ratingsAverage - a.ratingsAverage;
        });
    }

    return (
        <>
            <CategorySliderHome />
            <div className="filters mb-4 container mx-auto flex justify-center gap-4 sm:flex-row flex-col">
                {/* مربع البحث */}
                <input
                    type="text"
                    placeholder="Search products..."
                    value={filter.search}
                    onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                    className="p-2 border rounded  focus:outline-none "
                />
                {/* الفلاتر */}
                <div className="flex gap-4">
                    {/* فلتر السعر */}
                    <select
                        value={filter.priceOrder}
                        onChange={(e) => setFilter({ ...filter, priceOrder: e.target.value })}
                        className="p-2 border rounded"
                    >
                        <option value="">Price Filter</option>
                        <option value="asc">Lowest to Highest</option>
                        <option value="desc">Highest to Lowest</option>
                    </select>
                    {/* فلتر التقييم */}
                    <select
                        value={filter.ratingOrder}
                        onChange={(e) => setFilter({ ...filter, ratingOrder: e.target.value })}
                        className="p-2 border rounded"
                    >
                        <option value="">Rating Filter</option>
                        <option value="asc">Lowest to Highest</option>
                        <option value="desc">Highest to Lowest</option>
                    </select>
                </div>
            </div>

            {/* عرض المنتجات */}
            <section className='grid lg:grid-cols-4 xl:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-5 mb-6 container mx-auto'>
                {filteredProducts?.map((product) => (
                    <div key={product.id} className='shadow-lg p-3 rounded-lg relative hover:scale-105 transition-all duration-500'>
                        <div className='relative'>
                            <img src={product.imageCover} className='w-full h-full object-cover' alt={product.title} />
                            <div className="layer space-x-2 flex justify-center cursor-pointer  items-center opacity-0 hover:opacity-100 bg-black/20 absolute top-0 start-0 end-0 bottom-0 w-full h-full duration-300 transition-all">
                                <span onClick={() => addToCart(product.id)}  className='w-7 h-7 rounded-full hover:scale-110 transition-all duration-300 hover:rotate-3 flex justify-center items-center bg-secondColor text-white'>
                                    <i className="fa-solid fa-cart-shopping"></i>
                                </span>
                                <span  onClick={()=>addToWishList(product.id)} className='w-7 cursor-pointer h-7 rounded-full hover:scale-110 transition-all duration-300 hover:rotate-3 flex justify-center items-center bg-secondColor text-white'>
                                    <i className="fa-regular fa-heart self-center"></i>
                                </span>
                                <Link to={`/ProdcuDetails/${product.id}/${product.category.name}`} className='w-7 h-7 rounded-full  hover:scale-110 transition-all duration-300 hover:rotate-3  flex justify-center items-center bg-secondColor text-white  '>
                                    <i className="fa-regular fa-eye"></i>
                                </Link>
                            </div>
                        </div>
                        <p className='text-black font-semibold'>{product.title.split(" ", 2).join(" ")}</p>
                        <div className='flex flex-col'>
                            {product.priceAfterDiscount ? (
                                <>
                                    <div>
                                        <span className='text-[#DB4444]'>{product.priceAfterDiscount} EGP </span>
                                        <span className='line-through text-[12px] text-black/80'>{product.price} EGP </span>
                                    </div>
                                </>
                            ) : <span className='text-[#DB4444]'>{product.price} EGP </span>}
                            <div className='flex justify-between items-center'>
                                <div className="text-[16px] space-x-1">
                                    {Array.from({ length: 5 }).map((_, index) => {
                                        if (index + 1 <= Math.floor(product.ratingsAverage)) {
                                            return <i key={index} className="fas fa-star text-[#FFA622]"></i>;
                                        } else if (index < product.ratingsAverage) {
                                            return <i key={index} className="fas fa-star-half-alt text-[#FFA622]"></i>;
                                        } else {
                                            return <i key={index} className="fa-regular fa-star"></i>;
                                        }
                                    })}
                                </div>
                                <span className='text-end text-textColor/60'>({product.ratingsQuantity})</span>
                            </div>
                        </div>
                        {product.priceAfterDiscount ? (
                            <span className="bg-[#DB4444] text-white left-4 rounded-md px-2 absolute top-4">
                                {Math.floor(((product.price - product.priceAfterDiscount) / product.price * 100).toFixed(2))}% Off
                            </span>
                        ) : ""}
                    </div>
                ))}
            </section>
        </>
    );

}