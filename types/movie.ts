export interface Episode {
  id: string;
  title: string;
  titleChinese: string;
  episodeNumber: number;
  duration: number; // in minutes
  thumbnail: string;
  videoUrl?: string;
  description?: string;
  isWatched?: boolean;
}

export interface Series {
  id: string;
  title: string;
  titleChinese: string;
  poster: string;
  backdrop?: string;
  rating: number;
  year: number;
  totalEpisodes: number;
  status: 'ongoing' | 'completed' | 'upcoming'; // đang chiếu, hoàn thành, sắp ra
  genre: string[]; // tags như Fantasy, Action, etc.
  description: string;
  director: string;
  studio: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isHot?: boolean;
  episodes: Episode[];
}

export interface Category {
  id: string;
  title: string;
  description?: string;
  poster?: string;
  series: Series[];
}

// Giữ lại Movie interface cho compatibility
export interface Movie {
  id: string;
  title: string;
  titleChinese: string;
  poster: string;
  backdrop?: string;
  rating: number;
  year: number;
  duration: number;
  genre: string[];
  description: string;
  director: string;
  studio: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isHot?: boolean;
}

export interface MovieCategory {
  id: string;
  title: string;
  movies: Movie[];
}

