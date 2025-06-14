import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home/Home';
import { Products } from './pages/Products/Products';
import { Contact } from './pages/Contact/Contact';
import Register from './pages/Register/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;