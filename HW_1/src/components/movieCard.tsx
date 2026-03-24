import { MovieService } from "../api/movies";
import type { MovieCardProps } from "../types/Movie"



const MovieCard = ({ isListMode, id, title, year, posterUrl, isFavorite, onToggleFavorite }: MovieCardProps) => {
    if (!isListMode) {
        return (
            <div key={"block_" + id} className="bg-white relative h-192 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden w-128 m-4">
                <div className="relative h-170">
                    <img 
                        src={posterUrl} 
                        alt={title} 
                        className="w-full h-full object-cover" 
                    />
                    
                    <div onClick={()=> {onToggleFavorite(id)}} className={`absolute top-2 right-2 p-1 cursor-pointer rounded-full text-lg 
                                ${isFavorite ? 'text-yellow-400 bg-black/50' : 'text-gray-300 bg-black/50'}`}>
                        {isFavorite ? '★' : '☆'}
                    </div>
                </div>
                
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate" title={title}>
                        {title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Год: {year}
                    </p>
                </div>

                <div onClick={()=>{
                    const confirmDelete = window.confirm(`Вы уверены, что хотите удалить фильм "${title}"?`);
                    if (confirmDelete) {
                        MovieService.deleteMovie(id).then(() => { 
                            window.location.reload();
                        });
                    }
                }} className="absolute bottom-2 right-2 cursor-pointer bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </div>
            </div>
        );
    }

    return (
    <div className="bg-white m-2 mx-6 rounded-xl h-22 shadow-md hover:shadow-lg transition-shadow duration-300 w-full flex items-center p-4">
        <div className="flex-shrink-0 w-32 h-20 mr-4">
            <img 
                src={posterUrl} 
                alt={title} 
                className="w-full h-full object-cover rounded shadow"
            />
        </div>

        <div className="flex-grow text-left">
            <h3 className="text-xl font-bold text-gray-800" title={title}>{title} <span className='text-gray-500 font-normal'>({year})</span></h3>
        </div>

        <button
            onClick={() => onToggleFavorite(id)}
            className={`flex-shrink-0 ml-4 p-2 rounded-full text-lg transition-colors ${
              isFavorite ? 'text-yellow-500 hover:bg-yellow-100' : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-100'
            }`}
            title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
            {isFavorite ? '★' : '☆'}
        </button>
    </div>
  );


};

export default MovieCard;