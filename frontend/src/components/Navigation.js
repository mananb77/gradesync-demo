import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Database } from 'lucide-react';
import './Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/architecture', label: 'Architecture' },
    { path: '/api', label: 'API Docs' },
    { path: '/about', label: 'About' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navigation">
      <div className="container nav-container">
        <Link to="/" className="logo">
          <Database size={28} strokeWidth={2} />
          <span>GradeSync</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={isActive(item.path) ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/yourusername/gradesync-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
