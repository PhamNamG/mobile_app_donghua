import { useQuery } from '@tanstack/react-query';
import { posterApi, PosterResponse } from '@/lib/api/services/posters';

export function usePoster() {
	return useQuery<PosterResponse>({
		queryKey: ['poster'],
		queryFn: () => posterApi.getAll(),
	});
} 