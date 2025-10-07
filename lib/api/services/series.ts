/**
 * Series API Service
 * All series-related API calls
 */

import { get, post } from '../client';
import { Series, Category, Episode } from '@/types/movie';

export interface GetSeriesParams {
  page?: number;
  limit?: number;
  category?: string;
  status?: 'ongoing' | 'completed' | 'upcoming';
  search?: string;
}

export interface GetSeriesResponse {
  series: Series[];
  total: number;
  page: number;
  totalPages: number;
}

/**
 * Get all series with pagination and filters
 */
export async function getSeries(params?: GetSeriesParams): Promise<GetSeriesResponse> {
  const searchParams = new URLSearchParams();
  
  if (params?.page) searchParams.append('page', params.page.toString());
  if (params?.limit) searchParams.append('limit', params.limit.toString());
  if (params?.category) searchParams.append('category', params.category);
  if (params?.status) searchParams.append('status', params.status);
  if (params?.search) searchParams.append('search', params.search);

  const query = searchParams.toString();
  const endpoint = `/series${query ? `?${query}` : ''}`;
  
  return get<GetSeriesResponse>(endpoint);
}

/**
 * Get series by ID
 */
export async function getSeriesById(id: string): Promise<Series> {
  return get<Series>(`/series/${id}`);
}

/**
 * Get series categories
 */
export async function getSeriesCategories(): Promise<Category[]> {
  return get<Category[]>('/series/categories');
}

/**
 * Get category by ID
 */
export async function getCategoryById(id: string): Promise<Category> {
  return get<Category>(`/series/categories/${id}`);
}

/**
 * Get featured series
 */
export async function getFeaturedSeries(): Promise<Series[]> {
  return get<Series[]>('/series/featured');
}

/**
 * Get trending series
 */
export async function getTrendingSeries(): Promise<Series[]> {
  return get<Series[]>('/series/trending');
}

/**
 * Get new series
 */
export async function getNewSeries(): Promise<Series[]> {
  return get<Series[]>('/series/new');
}

/**
 * Search series
 */
export async function searchSeries(query: string): Promise<Series[]> {
  return get<Series[]>(`/series/search?q=${encodeURIComponent(query)}`);
}

/**
 * Get episodes for a series
 */
export async function getSeriesEpisodes(seriesId: string): Promise<Episode[]> {
  return get<Episode[]>(`/series/${seriesId}/episodes`);
}

/**
 * Get episode by ID
 */
export async function getEpisodeById(seriesId: string, episodeId: string): Promise<Episode> {
  return get<Episode>(`/series/${seriesId}/episodes/${episodeId}`);
}

/**
 * Mark episode as watched
 */
export async function markEpisodeWatched(
  seriesId: string,
  episodeId: string
): Promise<{ success: boolean }> {
  return post<{ success: boolean }>(`/series/${seriesId}/episodes/${episodeId}/watch`, {});
}

/**
 * Add series to watchlist
 */
export async function addSeriesToWatchlist(seriesId: string): Promise<{ success: boolean }> {
  return post<{ success: boolean }>('/watchlist/series', { seriesId });
}

/**
 * Remove series from watchlist
 */
export async function removeSeriesFromWatchlist(seriesId: string): Promise<{ success: boolean }> {
  return post<{ success: boolean }>('/watchlist/series/remove', { seriesId });
}

/**
 * Rate a series
 */
export async function rateSeries(seriesId: string, rating: number): Promise<{ success: boolean }> {
  return post<{ success: boolean }>(`/series/${seriesId}/rate`, { rating });
}


