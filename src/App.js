import React, { useEffect, useState } from 'react';
import qs from 'qs';
import SearchInput from './SearchInput';
import Pagination from './Pagination';
import './style.css';

const api = 'https://kitsu.io/api/edge/';
const LIMIT = 12;

export default function App() {
  const [info, setInfo] = useState({});
  const [text, setText] = useState('');
  const [offset, setOffset] = useState(0);

  
  useEffect(() => {
    setInfo({});

      const query = {
        page: {
          limit: LIMIT,
          offset,
        }
      };

      if (text) {
        query.filter = {
          text,
        };
      }

      fetch(`${api}anime?${qs.stringify(query)}`)
      .then((res) => res.json())
      .then((res) => {
        setInfo(res);
      })
  }, [text, offset]);


  return (
    <div className="App">
      <a className='home' href='/'><h1>Animes</h1></a>
      <SearchInput
        value={text}
        onChange={(search) => setText(search)}
      />
      {text && !info.data && (
        <span>Carregando...</span>
      )}
      {info.data && (
        <ul className="animes-list">
          {info.data.map((anime) => (
            <li key={anime.id}>
              <img src={anime.attributes.posterImage.small}
              alt={anime.attributes.canonicalTitle}
              />
              {anime.attributes.canonicalTitle}
            </li>
          ))}
        </ul>
      )}
      {info.meta && (
        <Pagination 
        limit={LIMIT} 
        total={info.meta.count} 
        offset={offset}
        setOffset={setOffset} 
      />
      )}
      
    </div>
  );
}