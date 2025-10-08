import { baseApi } from './base.api';
import { API_ENDPOINTS } from '@/constants/api';

export interface Poster {
  _id: string;
  name: string;
  descriptions: string;
  poster: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  lang: string;
  quality: string;
  anotherName: string;
  link: string
}

export interface PosterResponse {
  data: {
    data: Poster[];
  };
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

export const posterApi = {
  getAll: async (): Promise<PosterResponse> => {
    return baseApi.get<PosterResponse>(API_ENDPOINTS.POSTER.BASE);
  },

  getById: async (id: string): Promise<Poster> => {
    return baseApi.get<Poster>(`${API_ENDPOINTS.POSTER.BASE}/${id}`);
  }
}; 