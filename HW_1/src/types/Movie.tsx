export interface Movie {
  id: string;
  title: string;
  year: number;
  posterUrl: string;
  isFavorite: boolean;
}


export interface MovieCardProps {
  id: string;
  title: string;
  year: number;
  posterUrl: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isListMode?: boolean;
}
