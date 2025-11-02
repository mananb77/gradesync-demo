import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Zap, Shield, GitBranch, ArrowRight, CheckCircle } from 'lucide-react';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <Database size={32} />,
      title: 'Multi-Platform Integration',
      description: 'Seamlessly aggregates grades from Gradescope, PrairieLearn, and iClicker into a unified system.',
    },
    {
      icon: <Zap size={32} />,
      title: 'Automated Synchronization',
      description: 'Cloud-scheduled cron jobs automatically fetch and update grade data to Google Sheets.',
    },
    {
      icon: <Shield size={32} />,
      title: 'Microservices Architecture',
      description: 'Containerized services deployed on Google Cloud Run for scalability and reliability.',
    },
    {
      icon: <GitBranch size={32} />,
      title: 'RESTful API',
      description: 'FastAPI backend with comprehensive endpoints for grade retrieval and management.',
    },
  ];

  const platforms = [
    { name: 'Gradescope', desc: 'Automated assignment grading' },
    { name: 'PrairieLearn', desc: 'Interactive assessments' },
    { name: 'iClicker', desc: 'Classroom engagement' },
    { name: 'Google Sheets', desc: 'Grade reporting' },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              GradeSync
              <span className="gradient-text"> Educational Grade Management</span>
            </h1>
            <p className="hero-description">
              A microservices-based system for aggregating, synchronizing, and managing student grades
              from multiple assessment platforms. Built for CS10 at UC Berkeley.
            </p>
            <div className="hero-buttons">
              <Link to="/architecture" className="btn btn-primary">
                View Architecture
                <ArrowRight size={20} />
              </Link>
              <Link to="/api" className="btn btn-secondary">
                API Documentation
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="code-window">
              <div className="code-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="code-content">
                <pre>
{`GET /getGrades?assignment_id=123

{
  "grades": [
    {
      "student": "john@berkeley.edu",
      "score": 95.5,
      "max_score": 100,
      "status": "graded"
    }
  ],
  "total_students": 487,
  "avg_score": 87.3
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="platforms">
        <div className="container">
          <h2 className="section-title">Integrated Platforms</h2>
          <div className="platforms-grid">
            {platforms.map((platform, index) => (
              <div key={index} className="platform-card">
                <CheckCircle className="check-icon" size={24} />
                <h3>{platform.name}</h3>
                <p>{platform.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-stack">
        <div className="container">
          <h2 className="section-title">Technology Stack</h2>
          <div className="tech-categories">
            <div className="tech-category">
              <h3>Backend</h3>
              <ul>
                <li>FastAPI</li>
                <li>Python 3.11</li>
                <li>Uvicorn</li>
                <li>Pydantic</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>Infrastructure</h3>
              <ul>
                <li>Docker</li>
                <li>Google Cloud Run</li>
                <li>Cloud Scheduler</li>
                <li>Artifact Registry</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>Integrations</h3>
              <ul>
                <li>Gradescope API</li>
                <li>PrairieLearn API</li>
                <li>Google Sheets API</li>
                <li>iClicker Exports</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>Frontend</h3>
              <ul>
                <li>React 18</li>
                <li>React Router</li>
                <li>GitHub Pages</li>
                <li>GitHub Actions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container cta-content">
          <h2>Ready to explore the system?</h2>
          <p>Dive into the architecture diagrams and API documentation to see how GradeSync works.</p>
          <div className="cta-buttons">
            <Link to="/architecture" className="btn btn-primary">
              System Architecture
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
