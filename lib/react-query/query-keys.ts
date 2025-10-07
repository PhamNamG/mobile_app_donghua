/**
 * React Query Keys
 * Centralized query key management
 */

export const queryKeys = {
  // Movies
  movies: {
    all: ['movies'] as const,
    lists: () => [...queryKeys.movies.all, 'list'] as const,
    list: (params?: Record<string, unknown>) => [...queryKeys.movies.lists(), params] as const,
    details: () => [...queryKeys.movies.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.movies.details(), id] as const,
    featured: () => [...queryKeys.movies.all, 'featured'] as const,
    trending: () => [...queryKeys.movies.all, 'trending'] as const,
    newReleases: () => [...queryKeys.movies.all, 'new-releases'] as const,
    related: (id: string) => [...queryKeys.movies.all, 'related', id] as const,
    search: (query: string) => [...queryKeys.movies.all, 'search', query] as const,
    categories: () => [...queryKeys.movies.all, 'categories'] as const,
  },

  // Series
  series: {
    all: ['series'] as const,
    lists: () => [...queryKeys.series.all, 'list'] as const,
    list: (params?: Record<string, unknown>) => [...queryKeys.series.lists(), params] as const,
    details: () => [...queryKeys.series.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.series.details(), id] as const,
    featured: () => [...queryKeys.series.all, 'featured'] as const,
    trending: () => [...queryKeys.series.all, 'trending'] as const,
    new: () => [...queryKeys.series.all, 'new'] as const,
    search: (query: string) => [...queryKeys.series.all, 'search', query] as const,
    categories: () => [...queryKeys.series.all, 'categories'] as const,
    category: (id: string) => [...queryKeys.series.all, 'category', id] as const,
    episodes: (seriesId: string) => [...queryKeys.series.all, 'episodes', seriesId] as const,
    episode: (seriesId: string, episodeId: string) => 
      [...queryKeys.series.all, 'episodes', seriesId, episodeId] as const,
  },

  // Watchlist
  watchlist: {
    all: ['watchlist'] as const,
    movies: () => [...queryKeys.watchlist.all, 'movies'] as const,
    series: () => [...queryKeys.watchlist.all, 'series'] as const,
  },
} as const;

