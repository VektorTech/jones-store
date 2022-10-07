import useSWR from 'swr';
let fetcher: null = null;
export default function useUser () {
	const { data, error } = useSWR(`/api/auth/profile`, fetcher)

	return {
	  user: data,
	  isLoading: !error && !data,
	  isError: error
	}
}