// src/App.jsx
import { HashRouter, NavLink, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Contacts from './pages/Contacts.jsx';
import About from './pages/About.jsx';

export default function App() {
  return (
    <HashRouter>
      <header className="header">
        <nav className="nav container">
          <NavLink to="/" className="logo">My SPA</NavLink>
          <ul className="menu">
            <li><NavLink to="/" end>Головна</NavLink></li>
            <li><NavLink to="/contacts">Контакти</NavLink></li>
            <li><NavLink to="/about">Про мене</NavLink></li>
          </ul>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<h2>404 — не знайдено</h2>} />
        </Routes>
      </main>
    </HashRouter>
  );
}
