import React from 'react';
import { Github, ExternalLink, BookOpen, Rocket, Shield, Zap } from 'lucide-react';
import './About.css';

const About = () => {
  const features = [
    {
      icon: <Zap size={28} />,
      title: 'Automated Workflows',
      description: 'Cloud-scheduled cron jobs automatically sync grade data every 6 hours from Gradescope and daily from PrairieLearn, ensuring instructors always have up-to-date information.',
    },
    {
      icon: <Shield size={28} />,
      title: 'Secure & Reliable',
      description: 'Google Cloud service accounts, environment variable management, and containerized deployments ensure data security and system reliability.',
    },
    {
      icon: <Rocket size={28} />,
      title: 'Production Ready',
      description: 'Built with FastAPI, Docker, and Google Cloud Run for scalable, production-grade deployment with auto-scaling capabilities.',
    },
  ];

  return (
    <div className="about">
      <div className="container">
        <header className="page-header">
          <h1>About GradeSync</h1>
          <p>Educational grade management system for CS courses at UC Berkeley</p>
        </header>

        {/* Project Overview */}
        <section className="overview-section">
          <h2>Project Overview</h2>
          <div className="overview-content">
            <p>
              <strong>GradeSync</strong> is a comprehensive backend microservices system designed to streamline
              grade management for large computer science courses. Originally built for CS10 (The Beauty and
              Joy of Computing) at UC Berkeley with 487+ students, it automates the complex process of
              aggregating grades from multiple assessment platforms.
            </p>
            <p>
              The system integrates with <strong>Gradescope</strong> for automated assignment grading,
              <strong> PrairieLearn</strong> for interactive CS assessments, and <strong>iClicker</strong> for
              classroom engagement tracking. All data is synchronized to Google Sheets for easy instructor access.
            </p>
          </div>
        </section>

        {/* Key Features */}
        <section className="features-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Details */}
        <section className="technical-section">
          <h2>Technical Implementation</h2>

          <div className="tech-detail">
            <h3><BookOpen size={24} /> Backend Services</h3>
            <div className="detail-content">
              <h4>FastAPI Backend (api/app.py)</h4>
              <ul>
                <li><strong>Framework:</strong> FastAPI with Uvicorn ASGI server</li>
                <li><strong>Language:</strong> Python 3.11</li>
                <li><strong>Endpoints:</strong> 8 RESTful API endpoints for grade retrieval and management</li>
                <li><strong>Dependencies:</strong> fullGSapi (Gradescope client), gspread (Google Sheets), pydantic</li>
                <li><strong>Deployment:</strong> Docker container on Google Cloud Run (Port 8000)</li>
              </ul>

              <h4>Gradescope Integration Service</h4>
              <ul>
                <li><strong>Type:</strong> Scheduled cloud function</li>
                <li><strong>Frequency:</strong> Every 6 hours via Google Cloud Scheduler</li>
                <li><strong>Function:</strong> Fetches all assignment grades and writes to Google Sheets</li>
                <li><strong>Example Course ID:</strong> 831412</li>
              </ul>

              <h4>PrairieLearn Integration Service</h4>
              <ul>
                <li><strong>Type:</strong> Scheduled cloud function</li>
                <li><strong>Frequency:</strong> Daily at 3:00 AM Pacific Time</li>
                <li><strong>Function:</strong> Fetches question-level assessment data, creates pivot tables</li>
                <li><strong>Example Course ID:</strong> 155812</li>
                <li><strong>Special Feature:</strong> Zone-based question sorting and aggregation</li>
              </ul>

              <h4>iClicker Processing Script</h4>
              <ul>
                <li><strong>Type:</strong> Local Python script</li>
                <li><strong>Function:</strong> Processes exported CSV files and uploads to Google Sheets</li>
                <li><strong>Trigger:</strong> Manual execution</li>
              </ul>
            </div>
          </div>

          <div className="tech-detail">
            <h3><Rocket size={24} /> Infrastructure & Deployment</h3>
            <div className="detail-content">
              <h4>Google Cloud Platform</h4>
              <ul>
                <li><strong>Project:</strong> eecs-gradeview</li>
                <li><strong>Region:</strong> us-west1 (Oregon)</li>
                <li><strong>Services:</strong> Cloud Run, Cloud Scheduler, Artifact Registry</li>
                <li><strong>Authentication:</strong> Service account with Sheets API access</li>
              </ul>

              <h4>Docker Configuration</h4>
              <ul>
                <li><strong>Base Image:</strong> python:3.11-slim</li>
                <li><strong>Multi-stage builds:</strong> Optimized for production</li>
                <li><strong>Container orchestration:</strong> docker-compose for local development</li>
                <li><strong>Registry:</strong> Google Artifact Registry for production images</li>
              </ul>

              <h4>Automated Scheduling</h4>
              <ul>
                <li><strong>Gradescope sync:</strong> 0 */6 * * * (every 6 hours)</li>
                <li><strong>PrairieLearn sync:</strong> 0 3 * * * (daily at 3 AM)</li>
                <li><strong>Timezone:</strong> America/Los_Angeles</li>
                <li><strong>Retry policy:</strong> 3 attempts with exponential backoff</li>
              </ul>
            </div>
          </div>

          <div className="tech-detail">
            <h3><Shield size={24} /> Security & Configuration</h3>
            <div className="detail-content">
              <h4>Environment Variables (Required)</h4>
              <div className="code-block">
                <pre>
                  <code>{`# Gradescope Authentication
GRADESCOPE_EMAIL="instructor@berkeley.edu"
GRADESCOPE_PASSWORD="secure-password"

# PrairieLearn API
PL_API_TOKEN="your-api-token"

# Google Sheets Integration
SERVICE_ACCOUNT_CREDENTIALS='{
  "type": "service_account",
  "project_id": "eecs-gradeview",
  ...
}'`}</code>
                </pre>
              </div>

              <h4>Configuration Files</h4>
              <ul>
                <li><strong>Course configs:</strong> JSON files in api/config/ directory</li>
                <li><strong>Assignment mapping:</strong> cs10_assignments.json</li>
                <li><strong>Docker configs:</strong> Dockerfile, docker-compose.yml per service</li>
                <li><strong>Requirements:</strong> requirements.txt for each microservice</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Setup Instructions */}
        <section className="setup-section">
          <h2>Setup & Development</h2>

          <div className="setup-card">
            <h3>Local Development Setup</h3>
            <div className="code-block">
              <pre>
                <code>{`# Clone the repository
git clone https://github.com/yourusername/gradesync-demo.git
cd gradesync-demo

# Backend API setup
cd api
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate
pip install -r requirements.txt

# Create .env file with credentials
cp .env.example .env
# Edit .env with your credentials

# Run the API
uvicorn app:app --reload --port 8000

# Frontend setup
cd ../frontend
npm install
npm start`}</code>
              </pre>
            </div>
          </div>

          <div className="setup-card">
            <h3>Docker Deployment</h3>
            <div className="code-block">
              <pre>
                <code>{`# Build and run with Docker Compose
docker-compose up --build

# Or build individual services
cd api
docker build -t gradesync-api .
docker run -p 8000:8000 --env-file .env gradesync-api

# Deploy to Google Cloud Run
gcloud builds submit --tag gcr.io/eecs-gradeview/gradesync-api
gcloud run deploy gradesync-api \\
  --image gcr.io/eecs-gradeview/gradesync-api \\
  --region us-west1 \\
  --allow-unauthenticated`}</code>
              </pre>
            </div>
          </div>

          <div className="setup-card">
            <h3>GitHub Pages Deployment</h3>
            <div className="code-block">
              <pre>
                <code>{`# Frontend deployment (automatic via GitHub Actions)
# Push to main branch triggers deployment

# Or deploy manually
cd frontend
npm run build
npm run deploy

# View at: https://yourusername.github.io/gradesync-demo`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="use-cases">
          <h2>Use Cases</h2>
          <div className="use-case-grid">
            <div className="use-case">
              <h3>Course Instructors</h3>
              <p>View aggregated student grades from all platforms in a single Google Sheet. Track assignment completion rates and identify students who need support.</p>
            </div>
            <div className="use-case">
              <h3>Teaching Assistants</h3>
              <p>Access real-time grade data for office hours and section discussions. Monitor student progress across different assessment types.</p>
            </div>
            <div className="use-case">
              <h3>Post-Semester Grading</h3>
              <p>Enable students to submit late work after the semester ends and automatically update grades in the system.</p>
            </div>
            <div className="use-case">
              <h3>Data Analysis</h3>
              <p>Export grade data for statistical analysis, identifying question difficulty trends, and improving course materials.</p>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="resources-section">
          <h2>Resources & Links</h2>
          <div className="resources-grid">
            <a href="https://github.com/yourusername/gradesync-demo" className="resource-card" target="_blank" rel="noopener noreferrer">
              <Github size={32} />
              <h3>GitHub Repository</h3>
              <p>View source code, contribute, and report issues</p>
              <ExternalLink size={16} className="external-icon" />
            </a>
            <a href="https://fastapi.tiangolo.com/" className="resource-card" target="_blank" rel="noopener noreferrer">
              <BookOpen size={32} />
              <h3>FastAPI Documentation</h3>
              <p>Learn more about the FastAPI framework</p>
              <ExternalLink size={16} className="external-icon" />
            </a>
            <a href="https://cloud.google.com/run/docs" className="resource-card" target="_blank" rel="noopener noreferrer">
              <Rocket size={32} />
              <h3>Google Cloud Run</h3>
              <p>Serverless container platform documentation</p>
              <ExternalLink size={16} className="external-icon" />
            </a>
          </div>
        </section>

        {/* License */}
        <section className="license-section">
          <h2>License</h2>
          <p>
            This project is licensed under the <strong>MIT License</strong>. You are free to use,
            modify, and distribute this software for any purpose, including commercial applications.
            See the LICENSE file in the repository for full details.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
