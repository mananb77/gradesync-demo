import React, { useState } from 'react';
import { Server, Database, Cloud, Layers, GitBranch, RefreshCw, FileText } from 'lucide-react';
import './Architecture.css';

const Architecture = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="architecture">
      <div className="container">
        <header className="page-header">
          <h1>System Architecture</h1>
          <p>Comprehensive overview of GradeSync's microservices architecture and data flow</p>
        </header>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Layers size={18} />
            Overview
          </button>
          <button
            className={`tab ${activeTab === 'dataflow' ? 'active' : ''}`}
            onClick={() => setActiveTab('dataflow')}
          >
            <GitBranch size={18} />
            Data Flow
          </button>
          <button
            className={`tab ${activeTab === 'deployment' ? 'active' : ''}`}
            onClick={() => setActiveTab('deployment')}
          >
            <Cloud size={18} />
            Deployment
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="tab-content">
            <h2>Microservices Architecture</h2>
            <p className="intro-text">
              GradeSync is built on a containerized microservices architecture with four independent services,
              each responsible for specific data integration and synchronization tasks.
            </p>

            <div className="architecture-diagram">
              <div className="diagram-section">
                <div className="service-group">
                  <h3 className="group-title">External Platforms</h3>
                  <div className="service-cards">
                    <div className="service-card external">
                      <Database size={32} />
                      <h4>Gradescope</h4>
                      <span className="badge">Example Course ID: 831412</span>
                      <p>Automated assignment grading and submission management</p>
                    </div>
                    <div className="service-card external">
                      <FileText size={32} />
                      <h4>PrairieLearn</h4>
                      <span className="badge">Example Course ID: 155812</span>
                      <p>Interactive CS assessments with question-level tracking</p>
                    </div>
                    <div className="service-card external">
                      <Server size={32} />
                      <h4>iClicker</h4>
                      <span className="badge">Manual Export</span>
                      <p>Classroom engagement and participation tracking</p>
                    </div>
                  </div>
                </div>

                <div className="arrow-down">
                  <RefreshCw size={24} />
                  <span>API Calls / Data Fetch</span>
                </div>

                <div className="service-group">
                  <h3 className="group-title">GradeSync Services</h3>
                  <div className="service-cards">
                    <div className="service-card primary">
                      <Server size={32} />
                      <h4>FastAPI Backend</h4>
                      <span className="badge primary">Port 8000</span>
                      <p>RESTful API for grade retrieval and management</p>
                      <ul className="tech-list">
                        <li>Python 3.11 + FastAPI</li>
                        <li>8 REST endpoints</li>
                        <li>Uvicorn ASGI server</li>
                      </ul>
                    </div>
                    <div className="service-card secondary">
                      <Cloud size={32} />
                      <h4>Gradescope Service</h4>
                      <span className="badge secondary">Cloud Run</span>
                      <p>Scheduled cron job for Gradescope data sync</p>
                      <ul className="tech-list">
                        <li>Docker container</li>
                        <li>Cloud Scheduler</li>
                        <li>Auto-scaling</li>
                      </ul>
                    </div>
                    <div className="service-card secondary">
                      <Cloud size={32} />
                      <h4>PrairieLearn Service</h4>
                      <span className="badge secondary">Cloud Run</span>
                      <p>Fetches assessment data and creates pivot tables</p>
                      <ul className="tech-list">
                        <li>Docker container</li>
                        <li>Zone-based sorting</li>
                        <li>Automated execution</li>
                      </ul>
                    </div>
                    <div className="service-card secondary">
                      <Server size={32} />
                      <h4>iClicker Script</h4>
                      <span className="badge secondary">Local</span>
                      <p>Processes iClicker exports to Sheets</p>
                      <ul className="tech-list">
                        <li>Python script</li>
                        <li>CSV processing</li>
                        <li>Manual trigger</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="arrow-down">
                  <RefreshCw size={24} />
                  <span>Write Operations</span>
                </div>

                <div className="service-group">
                  <h3 className="group-title">Data Output</h3>
                  <div className="service-cards">
                    <div className="service-card output">
                      <FileText size={32} />
                      <h4>Google Sheets</h4>
                      <span className="badge success">Live Sync</span>
                      <p>Centralized grade reporting for instructors</p>
                      <ul className="tech-list">
                        <li>gspread library</li>
                        <li>Service account auth</li>
                        <li>Real-time updates</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dataflow' && (
          <div className="tab-content">
            <h2>Data Flow & Integration</h2>
            <p className="intro-text">
              Understanding how data moves through the system from external platforms to the final reporting destination.
            </p>

            <div className="flow-diagram">
              <div className="flow-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Authentication</h3>
                  <p>Services authenticate with external platforms:</p>
                  <ul>
                    <li><strong>Gradescope:</strong> Email/password credentials via fullGSapi</li>
                    <li><strong>PrairieLearn:</strong> API token authentication</li>
                    <li><strong>Google Sheets:</strong> Service account JSON credentials</li>
                  </ul>
                  <div className="code-snippet">
                    <pre>{`# Environment variables
GRADESCOPE_EMAIL="instructor@berkeley.edu"
GRADESCOPE_PASSWORD="***"
PL_API_TOKEN="***"
SERVICE_ACCOUNT_CREDENTIALS={...}`}</pre>
                  </div>
                </div>
              </div>

              <div className="flow-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Data Fetching</h3>
                  <p>Each service fetches data from its respective platform:</p>
                  <ul>
                    <li><strong>Gradescope Client:</strong> Fetches assignments, submissions, and scores</li>
                    <li><strong>PrairieLearn Client:</strong> Retrieves question-level assessment data</li>
                    <li><strong>iClicker:</strong> Processes exported CSV files</li>
                  </ul>
                  <div className="code-snippet">
                    <pre>{`GET /getGrades?assignment_id=123
→ Calls Gradescope API
→ Returns student grades array`}</pre>
                  </div>
                </div>
              </div>

              <div className="flow-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Data Processing</h3>
                  <p>Raw data is transformed and structured:</p>
                  <ul>
                    <li>Normalize student identifiers (emails, SIDs)</li>
                    <li>Calculate aggregated statistics (averages, totals)</li>
                    <li>Create pivot tables for question-level data (PrairieLearn)</li>
                    <li>Format data for Sheets API requirements</li>
                  </ul>
                </div>
              </div>

              <div className="flow-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Synchronization</h3>
                  <p>Processed data is written to Google Sheets:</p>
                  <ul>
                    <li>Uses gspread library for Sheets API</li>
                    <li>Batch updates for performance</li>
                    <li>Maintains data integrity with error handling</li>
                    <li>Scheduled updates via Cloud Scheduler</li>
                  </ul>
                  <div className="code-snippet">
                    <pre>{`# Cloud Scheduler
Gradescope Service: Every 6 hours
PrairieLearn Service: Daily at 3 AM
→ Automatic grade updates`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deployment' && (
          <div className="tab-content">
            <h2>Deployment Infrastructure</h2>
            <p className="intro-text">
              GradeSync leverages Google Cloud Platform for scalable, containerized deployment with automated scheduling.
            </p>

            <div className="deployment-grid">
              <div className="deployment-card">
                <Cloud size={40} className="deployment-icon" />
                <h3>Google Cloud Run</h3>
                <p>Serverless container platform for production services</p>
                <ul>
                  <li><strong>Project:</strong> eecs-gradeview</li>
                  <li><strong>Region:</strong> us-west1 (Oregon)</li>
                  <li><strong>Services:</strong> 3 containerized applications</li>
                  <li><strong>Auto-scaling:</strong> 0-10 instances</li>
                  <li><strong>Concurrency:</strong> 80 requests/container</li>
                </ul>
              </div>

              <div className="deployment-card">
                <Server size={40} className="deployment-icon" />
                <h3>Docker Containers</h3>
                <p>Each service packaged with dependencies</p>
                <ul>
                  <li><strong>Base Image:</strong> python:3.11-slim</li>
                  <li><strong>API Service:</strong> FastAPI + Uvicorn</li>
                  <li><strong>Workers:</strong> Gradescope & PrairieLearn sync</li>
                  <li><strong>Registry:</strong> Google Artifact Registry</li>
                </ul>
                <div className="code-snippet">
                  <pre>{`FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app:app", "--host", "0.0.0.0"]`}</pre>
                </div>
              </div>

              <div className="deployment-card">
                <RefreshCw size={40} className="deployment-icon" />
                <h3>Cloud Scheduler</h3>
                <p>Automated cron jobs for periodic data sync</p>
                <ul>
                  <li><strong>Gradescope:</strong> Every 6 hours</li>
                  <li><strong>PrairieLearn:</strong> Daily at 3:00 AM</li>
                  <li><strong>Timezone:</strong> America/Los_Angeles</li>
                  <li><strong>Retry Policy:</strong> 3 attempts with exponential backoff</li>
                </ul>
              </div>

              <div className="deployment-card">
                <Layers size={40} className="deployment-icon" />
                <h3>CI/CD Pipeline</h3>
                <p>Continuous deployment workflow</p>
                <ul>
                  <li><strong>Build:</strong> Docker image creation</li>
                  <li><strong>Push:</strong> Artifact Registry upload</li>
                  <li><strong>Deploy:</strong> Cloud Run service update</li>
                  <li><strong>Trigger:</strong> Git push to main branch</li>
                </ul>
                <div className="code-snippet">
                  <pre>{`gcloud builds submit --tag gcr.io/eecs-gradeview/gradesync
gcloud run deploy gradesync \\
  --image gcr.io/eecs-gradeview/gradesync \\
  --region us-west1`}</pre>
                </div>
              </div>
            </div>

            <div className="architecture-notes">
              <h3>Infrastructure Highlights</h3>
              <div className="notes-grid">
                <div className="note">
                  <h4>Scalability</h4>
                  <p>Auto-scales from 0 to handle traffic spikes during grade releases</p>
                </div>
                <div className="note">
                  <h4>Cost Efficiency</h4>
                  <p>Pay-per-use model with automatic instance termination during idle periods</p>
                </div>
                <div className="note">
                  <h4>Reliability</h4>
                  <p>Built-in health checks, retry policies, and error logging</p>
                </div>
                <div className="note">
                  <h4>Security</h4>
                  <p>Service accounts, secret management, and private networking</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Architecture;
