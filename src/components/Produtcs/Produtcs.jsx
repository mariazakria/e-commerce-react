import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { cartUserProvuder } from '../../Context/CartProvider';
import { wishList } from '../../Context/WishListPorvider';

export default function Produtcs({product}) {
    const { addToCart } = useContext(cartUserProvuder);
    const { addToWishList } = useContext(wishList);

    return (
        <div key={product.id} className='shadow-lg shadow-t-lg p-3 rounded-lg relative hover:scale-105 transition-all duration-500'>
            <div className='relative'>
                <img src={product.imageCover} className='w-full h-full object-cover' alt={product.title} />
                <div className="layer space-x-2 flex cursor-pointer justify-center items-center opacity-0 hover:opacity-100 bg-black/20 absolute top-0 start-0 end-0 bottom-0 w-full h-full duration-300 transition-all">
                    <span onClick={() => addToCart(product.id)} className='w-7 h-7 rounded-full hover:scale-110 transition-all duration-300 hover:rotate-3 flex justify-center items-center bg-secondColor text-white'>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </span>
                    <span onClick={() => addToWishList((product.id))} className='w-7 h-7 rounded-full cursor-pointer hover:scale-110 transition-all duration-300 hover:rotate-3 flex justify-center items-center bg-secondColor text-white'>
                        <i className="fa-regular fa-heart self-center"></i>
                    </span>
                    <Link to={`/ProdcuDetails/${product.id}/${product.category.name}`} className='w-7 h-7 rounded-full hover:scale-110 transition-all duration-300 hover:rotate-3 flex justify-center items-center bg-secondColor text-white'>
                        <i className="fa-regular fa-eye"></i>
                    </Link>
                </div>
            </div>
            <div className="space-y-3 card-body p-4">
                <header>
                    <h3 className="text-lg text-gray-600 font-semibold line-clamp-1">{product.title}</h3>
                    <h4 className="text-primary-500 font-semibold">{product.category.name}</h4>
                </header>
                <p className="text-gray-400 line-clamp-2 text-sm">{product.description}</p>
                <span className="text-primary-800 font-semibold">{product.price} EGP</span>
            </div>
        </div>
    );
}
