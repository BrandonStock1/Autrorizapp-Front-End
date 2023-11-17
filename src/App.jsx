import { Routes, Route } from 'react-router-dom';
import Login from './paginas/Login';
import Home from './paginas/Home';
import Escritas from './paginas/Escritas';
import Perfil from './paginas/Perfil'
import Entregadas from './paginas/EntregadasAsis';
import Register from './components/Register';
import EnBlanco from './paginas/EnBlanco';
import A from './components/A';
import HomeAsistentes from './paginas/HomeAsistentes';
import Enblanco2 from './paginas/EnBlanco2';
import EntregadasA from './paginas/EntregadaA2';

const App = () => {
 return (
    <>
       <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Perfil" element={<Perfil />} />
            <Route path="/Escritas" element={<Escritas />} />
            <Route path="/BlancoAsis" element={<EnBlanco />} />
            <Route path="/Entregadas" element={<Entregadas />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/A" element={<A />} />
            <Route path="/HomeAsistentes" element={<HomeAsistentes />} />
            <Route path="/BlancoPadres" element={<Enblanco2 />} />
            <Route path="/EntregadasA" element={<EntregadasA />} />

       </Routes>
    </>
 );
};

export default App;