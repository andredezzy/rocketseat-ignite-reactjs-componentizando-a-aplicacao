import { useState } from 'react';

import { Genre, SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';
import './styles/content.scss';

export function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar onChangeGenre={setSelectedGenre} />

      <Content selectedGenre={selectedGenre} />
    </div>
  )
}