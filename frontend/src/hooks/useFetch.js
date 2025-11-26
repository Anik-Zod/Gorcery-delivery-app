import {useQuery} from '@tanstack/react-query'
import axiosInstance from '../api/axios';

const useFetch = (key, url) => {
    return useQuery({
        queryKey:[key,url],
        queryFn:async()=>{
            const response = await axiosInstance.get(url)
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // cache for 5 minutes
    });
};

export default useFetch;




