import axios from 'axios';
import { useState } from 'react';
import Cards from '../Cards/Cards';
import SearchBar from '../SearchBar/SearchBar';
import style from './Collection.module.css'

const Collection = () => {

    const onClose = (id) => {
        const charactersFiltered = characters.filter(character => character.id !== Number(id)) 
        setCharacters(charactersFiltered)
     };
  
     const [characters,setCharacters] = useState([]);
  
     const onSearch = (id) => {
       if (id>826 || id<1 || /^[a-zA-Z]+$/.test(id)){
           window.alert('¡No hay personajes con este ID!');
        } else {axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
           if (data.name) {
              setCharacters((oldChars) => [...oldChars, data]);
           } else {
              window.alert('¡No hay personajes con este ID!');
           }
        });}
     };

    return(
        <div>
            <div className={style.search} >
            <SearchBar onSearch={onSearch} />
            </div>
            
            <Cards characters={characters} onClose={onClose}/>
        </div>
    )
}

export default Collection;