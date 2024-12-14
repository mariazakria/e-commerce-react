import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import  React,{ createContext } from 'react'
export const allProductPorvider = createContext()
export default function ProductContextProvider({children}) {
    function getProduct() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products")
    }
    const { data:allPorduct, isLoading, isError } = useQuery({
        queryKey: ["product"],
        queryFn: getProduct,
        staleTime: 5000,
        refetchInterval: 5000000,
        retry: 3,
        retryDelay: 5000,
        gcTime: 5000,
        select: (data) => data.data.data
    });
    return <>
    <allProductPorvider.Provider value={{allPorduct, isLoading, isError }}>
        {children}
    </allProductPorvider.Provider>
    </>
}
