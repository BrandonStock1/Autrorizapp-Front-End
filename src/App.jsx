import { Routes, Route } from 'react-router-dom';
import Login from './paginas/Login';
import Home from './paginas/Home';
import Escritas from './paginas/Escritas';
import Perfil from './paginas/Perfil'

const App = () => {
 return (
    <>
       <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Perfil" element={<Perfil />} />
            <Route path="/Escritas" element={<Escritas />} />
          
       </Routes>
    </>
 );
};

export default App;