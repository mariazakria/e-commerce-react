import axios from 'axios'
import React, { useContext } from 'react'
import { userContextProvider } from '../../Context/UserContextProvider'
import { useQuery } from '@tanstack/react-query'
import Loading from '../../components/Loading/Loading'
import Error from '../../components/Error/Error'

export default function Brand() {
    const { token } = useContext(userContextProvider)
    async function getAllBrand() {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands", {
            headers: {
                token
            }
        })
        return data
    }
    const { data,isLoading,isError } = useQuery({
        queryKey: ["brands"],
        queryFn: getAllBrand
    })
    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        return <Error />
    }

    return (


        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.data.map(brands =>
            (<div key={brands._id}>
                <img className="h-auto max-w-full rounded-lg mx-auto"  src={brands.image} alt={brands.title} />
            </div>)
            )}
        </div>

    )
}
