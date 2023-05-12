import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import About from './components/About/About.jsx';
import Home from './components/Home/Home.jsx';
import Details from './components/Details/Details.jsx';
import Form from './components/Form/Form.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Cards from './components/Cards/Cards.jsx';
import Collection from './components/Collection/Collection.jsx';
import Favorites from './components/Favorites/Favorites.jsx'
import Error from './components/Error/Error.jsx';

function App() {

   const location = useLocation();
   const navigate = useNavigate();
   const [access, setAccess] = useState(false);
   const EMAIL = 'cufrecamila1@gmail.com';
   const PASSWORD = 'caca12345';

   const updateBackground = () => {
      const { pathname } = window.location;
      document.body.className = pathname.slice(1);
    }
    
    window.onpopstate = updateBackground;
    updateBackground();

   useEffect(() => {
      !access && navigate('/');
      // eslint-disable-next-line
   }, [access]);

   const login = (userData) => {
      if (userData.password === PASSWORD && userData.email === EMAIL) {
         setAccess(true);
         navigate('/home');
      }
   };

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

   return (
      <div className='App'>

        {location.pathname !== '/' && <NavBar onSearch={onSearch}/>}

         <Routes>
         
         <Route path='/' element={<Form login={login}/>}/>
         <Route path='/home' element={<Home/>}/>
         <Route path='/about' element={<About/>}/>
         <Route path='/details/:id' element={<Details/>}/>
         <Route path='/collection' element={<Collection/>}/>
         <Route path='/favorites' element={<Favorites/>}/>
         <Route path='*' element={<Error/>}/>

         </Routes>

         <Cards characters={characters} onClose={onClose}/>
      </div>
   );
}

export default App;
