import { useState } from 'react';
import type { Movie } from '../types/Movie';
import { MovieService } from '../api/movies';

type AddMovieCardProps = { isListMode: boolean };

const MovieCard = ({ isListMode }: AddMovieCardProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [posterUrl, setPosterUrl] = useState('');
    const [error, setError] = useState('');

    const validateForm = () => {
        if (!title.trim() || !year || !posterUrl.trim()) {
            setError('Все поля обязательны для заполнения.');
            return false;
        }

        const urlRegex = /^(http|https):\/\/[^ "]+$/;
        if (!urlRegex.test(posterUrl.trim())) {
            setError('URL постера должен начинаться с "http://" или "https://".');
            return false;
        }

        if (Number(year) > new Date().getFullYear() + 1) {
            setError('Указанный год кажется некорректным.');
            return false;
        }

        setError('');
        return true;
    };

    const handleAddMovie = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const newMovie: Movie = {
            id: String(Date.now() + Math.floor(Math.random() * 10000)),
            title,
            year: Number(year),
            posterUrl,
            isFavorite: false
        }

        setIsModalOpen(false);
        MovieService.createMovie(newMovie).then(() => { 
            window.location.reload();
        });
    };
    
    const isFormValid = title.trim() !== '' && year !== '' && posterUrl.trim() !== '' && /^(http|https):\/\/[^ "]+$/.test(posterUrl.trim());
    
    if (isModalOpen) {
        return (
            <div className="fixed inset-0 bg-[#00000060] flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl mb-4">Добавить новый фильм</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Название</label>
                            <input onChange={(e)=>{setTitle(e.target.value)}} type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required value={title} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Год</label>
                            <input onChange={(e)=>{setYear(e.target.value)}} type="number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required value={year} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">URL постера</label>
                            <input onChange={(e)=>{setPosterUrl(e.target.value)}} type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required value={posterUrl} />
                        </div>
                        
                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => {setIsModalOpen(false); setError(''); setTitle(''); setYear(''); setPosterUrl('');}}
                                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                            >
                                Отмена
                            </button>
                            <button
                                type="button"
                                onClick={handleAddMovie}
                                disabled={!isFormValid}
                                className={`px-4 py-2 text-white rounded-md ${isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}
                            >
                                Добавить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    if (!isListMode) return (
        <div onClick={()=>{setIsModalOpen(true); setError('');}} className="bg-gray-300 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden w-128 h-192 m-4">
            <div className="justify-center cursor-pointer text-gray-100 flex h-192 text-9xl items-center">
                +
            </div>
        </div>
    );

    return (
    <div onClick={()=>{setIsModalOpen(true); setError('');}}  className="bg-gray-300 m-2 mx-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 w-full flex items-center p-4">
        <div className="flex-shrink-0 w-full h-12 mr-4 flex justify-center items-center text-gray-100 text-6xl cursor-pointer">
            +
        </div>
    </div>
    )
};

export default MovieCard;