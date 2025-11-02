import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>GradeSync</h3>
            <p>Educational grade management system for aggregating assessment data from multiple platforms.</p>
          </div>

          <div className="footer-section">
            <h4>Technology</h4>
            <ul>
              <li>FastAPI Backend</li>
              <li>React Frontend</li>
              <li>Docker Containers</li>
              <li>Google Cloud Platform</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Integrations</h4>
            <ul>
              <li>Gradescope</li>
              <li>PrairieLearn</li>
              <li>iClicker</li>
              <li>Google Sheets</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Links</h4>
            <ul>
              <li>
                <a href="https://github.com/yourusername/gradesync-demo" target="_blank" rel="noopener noreferrer">
                  <Github size={16} />
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} />
                  FastAPI Docs
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} GradeSync. Released under MIT License.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
