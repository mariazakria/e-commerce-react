import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import CategorySliderHome from '../CategorySliderHome/CategorySliderHome'
import { allProductPorvider } from '../../Context/ProductContextProvider'
import Error from '../Error/Error'
import Produtcs from '../Produtcs/Produtcs'
export default function AllProducts() {
    //this components for display all products
    const { allPorduct, isLoading, isError } = useContext(allProductPorvider)
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
        return <Error />
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
                    <Produtcs key={product.id} product={product} />
                ))}
            </section>
        </>
    );

}