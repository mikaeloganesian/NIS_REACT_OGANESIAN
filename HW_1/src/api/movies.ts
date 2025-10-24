import axios, { type AxiosInstance } from 'axios';
import { type Movie } from '../types/Movie';

const BASE_URL: string = import.meta.env.VITE_MOVIE_API_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const MovieService = {
  async createMovie(movieData: Omit<Movie, 'id'>): Promise<Movie> {
    const response = await api.post<Movie>('/movies', movieData);
    return response.data;
  },

  async fetchAllMovies(): Promise<Movie[]> {
    const response = await api.get<Movie[]>('/movies');
    return response.data;
  },

  async fetchMovieById(id: string): Promise<Movie> {
    const response = await api.get<Movie>(`/movies/${id}`);
    return response.data;
  },

  async updateMovie(id: string, movieData: Partial<Movie>): Promise<Movie> {
    const response = await api.put<Movie>(`/movies/${id}`, movieData);
    return response.data;
  },

  async deleteMovie(id: string): Promise<void> {
    await api.delete(`/movies/${id}`);
  },

  async fetchFavoriteMovies(): Promise<Movie[]> {
    const response = await api.get<Movie[]>('/movies', {
      params: {
        isFavorite: true,
      },
    });
    return response.data;
  },

  async toggleFavoriteStatus(id: string): Promise<Movie> {
    const currentMovie = await MovieService.fetchMovieById(id);

    const newFavoriteStatus = !currentMovie.isFavorite;

    const response = await api.patch<Movie>(`/movies/${id}`, {
      isFavorite: newFavoriteStatus,
    });

    return response.data;
  },
};
