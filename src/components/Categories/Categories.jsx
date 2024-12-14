import React, { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
import CategorySliderHome from '../CategorySliderHome/CategorySliderHome';
import { allProductPorvider } from '../../Context/ProductContextProvider';
import Error from '../Error/Error';
import NoItem from '../NoItem/NoItem';
import Produtcs from '../Produtcs/Produtcs';
export default function Categories() {
    const { allPorduct, isLoading, isError } = useContext(allProductPorvider)
    //for filter card
    const [filter, setFilter] = useState({
        search: '',
        priceOrder: '', // Empty, 'asc', 'desc'
        ratingOrder: '', // Empty, 'asc', 'desc'
    });
    let { category } = useParams()
    const categoryProdect = allPorduct?.filter(product => product.category.name == category)
    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        return <Error />
    }
    if (categoryProdect.length === 0) {
        //for show messge when   categoryProdect is empty
        return < NoItem >
            {"No item yet, please check later."}
            {"We'll show you new items shortly."}
        </NoItem>
    }
    const filteredProducts = categoryProdect?.filter((product) =>
        product.title.toLowerCase().includes(filter.search.toLowerCase())
    );

    if (filter.priceOrder) {
        filteredProducts.sort((a, b) => {
            return filter.priceOrder === 'asc'
                ? a.price - b.price
                : b.price - a.price;
        });
    }

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
                <input
                    type="text"
                    placeholder="Search products..."
                    value={filter.search}
                    onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                    className="p-2 border rounded  focus:outline-none "
                />
                <div className="flex gap-4">
                    <select
                        value={filter.priceOrder}
                        onChange={(e) => setFilter({ ...filter, priceOrder: e.target.value })}
                        className="p-2 border rounded"
                    >
                        <option value="">Price Filter</option>
                        <option value="asc">Lowest to Highest</option>
                        <option value="desc">Highest to Lowest</option>
                    </select>
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
            <section className='grid lg:grid-cols-4 xl:grid-cols-6  md:grid-cols-3 sm:grid-cols-2   gap-5  mb-6 container mx-auto overflow-x-hidden-hidden'>

                {filteredProducts?.map((product) =>
                    <Produtcs key={product.id} product={product} />
                )}
            </section></>
    )
}
