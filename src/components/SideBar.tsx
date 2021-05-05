import { useCallback, useEffect, useState } from 'react';

import { api } from '../services/api';
import '../styles/sidebar.scss';

import { Button } from './Button';

export interface Genre {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  onChangeGenre: (genre: Genre) => void;
}

export function SideBar({ onChangeGenre }: SideBarProps) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

  const selectGenre = useCallback((genre: Genre) => {
    setSelectedGenre(genre)

    if (onChangeGenre) {
      onChangeGenre(genre)
    }
  }, [setSelectedGenre, onChangeGenre])

  useEffect(() => {
    api.get<Genre[]>('genres').then(response => {
      const newGenres = response.data

      setGenres(newGenres);

      selectGenre(newGenres[0])
    });
  }, [selectGenre]);

  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => selectGenre(genre)}
              selected={selectedGenre.id === genre.id}
            />
          ))}
        </div>
      </nav>
  )
}