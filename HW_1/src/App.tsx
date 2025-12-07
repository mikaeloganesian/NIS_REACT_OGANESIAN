import { MovieService } from './api/movies.ts';
import { useState, useEffect, useMemo } from 'react';
import type { Movie } from './types/Movie.tsx';
import MovieCard from './components/movieCard.tsx';
import AddNewMovieCard from './components/addNewMovieCard.tsx';
import { toggleFavoriteAndFetch } from './utils/movieUtils.ts';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isListMode, setIsListMode] = useState<boolean>(false);
  const [filterCriteria, setFilterCriteria] = useState<string>('all');

  const onToggleFavorite = (id: string) => {
    toggleFavoriteAndFetch(id, setMovies);
  }

  useEffect(() => {
    async function fetchMovies() {
      const movies = await MovieService.fetchAllMovies();
      console.log(movies);
      setMovies(movies);
    }
    fetchMovies();
  }, []);

  const filteredMovies = useMemo(() => {
    let result =  movies.filter(movie => 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) || movie.year.toString().includes(searchQuery)
    );

    switch (filterCriteria) {
      case 'favorites':
        result = result.filter(movie => movie.isFavorite);
        break;
      case 'year_desc':
        result = result.sort((a, b) => b.year - a.year);
        break;
      case 'year_asc':
        result = result.sort((a, b) => a.year - b.year);
        break;
      case 'title_asc':
        result = result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title_desc':
        result = result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return result;
  }, [movies, searchQuery, filterCriteria]);

  return (
    <div className='w-full text-center'>
      <h1 className='text-3xl my-6'>Каталог фильмов на вечер</h1>
      <div className="w-full h-10 bg-gray-200 mb-6 flex justify-between items-center px-4">
        <div className='flex gap-4'>
          <svg onClick={() => setIsListMode(true)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={isListMode ? "scale-130" : " " + "lucide lucide-list-icon transition-all duration-300 lucide-list"}><path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/></svg>
          <svg onClick={() => setIsListMode(false)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={!isListMode ? "scale-130" : " " + "lucide lucide-grid2x2-icon transition-all duration-300 lucide-grid-2x2"}><path d="M12 3v18"/><path d="M3 12h18"/><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
        </div>
        <div className='filter'>
          <form>
            <select name="filter" id="filter" value={filterCriteria} onChange={(e) => setFilterCriteria(e.target.value)}>
              <option value="all">Все фильмы</option>
              <option value="favorites">Избранные</option>
              <option value="year_desc">По году (убыв.)</option>
              <option value="year_asc">По году (возр.)</option>
              <option value="title_asc">По названию (А-Я)</option>
              <option value="title_desc">По названию (Я-А)</option>
            </select>
          </form>
        </div>
      </div>
      <input 
        type="text" 
        placeholder="Поиск по названию..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 mb-6 focus:outline-none"
      />
      {
        filteredMovies.length === 0 && <p className='text-gray-500 m-10 text-xl'>Фильмов нет...</p>
      }
      <div className={`inline-flex w-full flex-wrap  justify-center bg-gradient-to-b 0 py-10 ${isListMode ? 'gap-4' : 'min-h-screen'}`}>
          {filteredMovies && filteredMovies.map(movie => (
            <MovieCard isListMode={isListMode} key={movie.id} {...movie} onToggleFavorite={onToggleFavorite}  />
          ))}
          <AddNewMovieCard isListMode={isListMode} />
      </div>
    </div>
  )
}

export default App
