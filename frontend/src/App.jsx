import './App.css';
import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home/Home';
import { Products } from './pages/Products/Products';
import { Contact } from './pages/Contact/Contact';
import Register from './pages/Register/Register';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} style={{ position: 'fixed', top: 10, right: 10 }}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}

function AppContent() {
  const { theme } = useTheme();
  // Set data-theme attribute for global styling
  document.body.setAttribute('data-theme', theme);
  return (
    <>
      <ThemeToggle />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;