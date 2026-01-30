import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const useFetch = ({url, key}) => {
    const getData = async () => {
        const res = await axios.get(`https://fakestoreapi.com/${url}`)
        return res?.data
    }

    const { data, isLoading, isFetching } = useQuery({
        queryKey: key,
        queryFn: getData
    })
    return {data, isLoading, isFetching}
}

export default useFetch