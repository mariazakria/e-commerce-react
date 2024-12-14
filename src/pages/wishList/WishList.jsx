import React,{ useContext } from "react"
import { wishList } from "../../Context/WishListPorvider"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import NoItem from "../../components/NoItem/NoItem";
import { cartUserProvuder } from "../../Context/CartProvider";
import { Link } from "react-router-dom";
export default function WishList() {
    const { displayWishList, deletWishList } = useContext(wishList)
    const { addToCart } = useContext(cartUserProvuder)
    const queryClient = useQueryClient();
    const { isLoading, isError, data } = useQuery({
        queryKey: ["displayWishList"],
        queryFn: displayWishList,
    });
    //useMutation for delet procuts from wishList
    const deleteMutation = useMutation({
        mutationFn: deletWishList,
        onSuccess: () => {
            queryClient.invalidateQueries(["displayWishList"]);
        },
    });
    function handleDelete(productId) {
        deleteMutation.mutate(productId);
    }
    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        return <Error />
    }
    if (data.data == 0) {
        return < NoItem >
            {"Your wishlist is empty"}
            {"  Add your favorite items and try again"}
        </NoItem>
    }
    return (
        <>
            <div className=" mx-auto my-4 flex flex-col gap-6">
                {data.data?.map((product) => (
                    <div
                        key={product._id}
                        className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800 md:p-6"
                    >
                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-6">
                            {/* Product Image */}
                            <div className="w-24 shrink-0">
                                <img
                                    className="h-20- w-24 object-cover rounded-md dark:hidden"
                                    src={product.imageCover}
                                    alt={product.title}
                                />
                            </div>
                            {/* Product Info */}
                            <div className="flex-1">
                                <Link to={`/ProdcuDetails/${product.id}/${product.category.name}`} >
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {product.title}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
                                        {product.description}
                                    </p>
                                </Link>
                                {/* Add to Favorites & Remove Button */}
                                <div className="flex items-center gap-4 mt-4">
                                    <button
                                        type="button"
                                        className="text-sm font-medium text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
                                        onClick={() => addToCart(product._id)}
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        type="button"
                                        className="text-sm font-medium text-red-600 hover:underline dark:text-red-400"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                            {/* Quantity & Price */}
                            <div className="flex items-center gap-4 mt-4 sm:mt-0">
                                {/* Product Price */}
                                <div className="text-right">
                                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                        ${product.priceAfterDiscount || product.price}
                                    </p>
                                    {product.priceAfterDiscount && (
                                        <p className="text-sm text-gray-500 line-through">
                                            ${product.price}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}
