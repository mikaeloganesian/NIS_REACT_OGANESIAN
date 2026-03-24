import { MovieService } from '../api/movies.ts';
import type { Movie } from '../types/Movie.tsx';

export const toggleFavoriteAndFetch = async (
    id: string,
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>
    ): Promise<void> => {
    try {
        await MovieService.toggleFavoriteStatus(id);

        const updatedMovies = await MovieService.fetchAllMovies();

        setMovies(updatedMovies);
    } catch (error) {
        console.error('Error toggling favorite status:', error);
    }
}

export const toggleDeleteAndFetch = async (
    id: string,
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>
    ): Promise<void> => {
        try {
            await MovieService.deleteMovie(id);

            const updatedMovies = await MovieService.fetchAllMovies();

            setMovies(updatedMovies);
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
}