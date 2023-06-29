import { Routes, Route } from 'react-router-dom';
import Login from './paginas/Login';
import Home from './paginas/Home';
import Escritas from './paginas/Escritas';
import Perfil from './paginas/Perfil'

const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<Perfil />} />
       </Routes>
    </>
 );
};

export default App;