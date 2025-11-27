import {useQuery} from '@tanstack/react-query'
import axiosInstance from '../api/axios';

const useFetch = (key, url, options = {}) => {
    return useQuery({
        queryKey: [key, url],
        queryFn: async () => {
            // Avoid making a request when no url provided (caller should control 'enabled')
            if (!url) return null;
            const response = await axiosInstance.get(url);
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // cache for 5 minutes
        enabled: options.enabled ?? !!url,
        ...options,
    });
};

export default useFetch;




