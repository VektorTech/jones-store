import useSWR from 'swr';

const fetcher = (...args: [any, any]) => fetch(...args).then((res) => res.json());

export default function useUser (id?: string) {
	const { data, error } = useSWR(id ? `/api/auth/user/${id}` : "", fetcher);

	return {
	  user: data?.data || {},
	  isError: error
	}
}