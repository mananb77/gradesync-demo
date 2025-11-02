import React, { useState } from 'react';
import { Code, Book, Copy, Check, ChevronDown, ChevronRight } from 'lucide-react';
import apiEndpoints from '../data/mockApiData';
import './ApiDocs.css';

const ApiDocs = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(apiEndpoints[0]);
  const [copiedId, setCopiedId] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET':
        return 'method-get';
      case 'POST':
        return 'method-post';
      case 'PUT':
        return 'method-put';
      case 'DELETE':
        return 'method-delete';
      default:
        return '';
    }
  };

  return (
    <div className="api-docs">
      <div className="container">
        <header className="page-header">
          <h1>API Documentation</h1>
          <p>Comprehensive guide to GradeSync FastAPI endpoints with interactive examples</p>
        </header>

        <div className="api-info">
          <div className="info-card">
            <Code size={24} />
            <div>
              <h3>Base URL</h3>
              <code>http://localhost:8000</code>
            </div>
          </div>
          <div className="info-card">
            <Book size={24} />
            <div>
              <h3>Version</h3>
              <code>v1.0.0</code>
            </div>
          </div>
        </div>

        <div className="api-layout">
          {/* Sidebar with Endpoint List */}
          <aside className="endpoint-sidebar">
            <h3>Endpoints ({apiEndpoints.length})</h3>
            <nav className="endpoint-list">
              {apiEndpoints.map((endpoint) => (
                <button
                  key={endpoint.id}
                  className={`endpoint-item ${selectedEndpoint.id === endpoint.id ? 'active' : ''}`}
                  onClick={() => setSelectedEndpoint(endpoint)}
                >
                  <span className={`method-badge ${getMethodColor(endpoint.method)}`}>
                    {endpoint.method}
                  </span>
                  <span className="endpoint-path">{endpoint.path}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content - Selected Endpoint Details */}
          <main className="endpoint-details">
            <div className="endpoint-header">
              <div className="endpoint-title">
                <span className={`method-badge large ${getMethodColor(selectedEndpoint.method)}`}>
                  {selectedEndpoint.method}
                </span>
                <h2>{selectedEndpoint.title}</h2>
              </div>
              <code className="endpoint-url">
                http://localhost:8000{selectedEndpoint.path}
              </code>
              <p className="endpoint-description">{selectedEndpoint.description}</p>
            </div>

            {/* Parameters Section */}
            {selectedEndpoint.parameters && selectedEndpoint.parameters.length > 0 && (
              <div className="section">
                <button
                  className="section-header"
                  onClick={() => toggleSection('parameters')}
                >
                  <h3>Parameters</h3>
                  {expandedSections.parameters ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {expandedSections.parameters !== false && (
                  <div className="section-content">
                    <table className="params-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Type</th>
                          <th>Required</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedEndpoint.parameters.map((param, index) => (
                          <tr key={index}>
                            <td><code>{param.name}</code></td>
                            <td><span className="type-badge">{param.type}</span></td>
                            <td>
                              <span className={`required-badge ${param.required ? 'required' : 'optional'}`}>
                                {param.required ? 'Required' : 'Optional'}
                              </span>
                            </td>
                            <td>{param.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Request Body Section (for POST requests) */}
            {selectedEndpoint.requestBody && (
              <div className="section">
                <button
                  className="section-header"
                  onClick={() => toggleSection('request')}
                >
                  <h3>Request Body</h3>
                  {expandedSections.request ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {expandedSections.request !== false && (
                  <div className="section-content">
                    <div className="code-block">
                      <div className="code-header">
                        <span>JSON</span>
                        <button
                          className="copy-btn"
                          onClick={() => copyToClipboard(
                            JSON.stringify(selectedEndpoint.requestBody, null, 2),
                            `request-${selectedEndpoint.id}`
                          )}
                        >
                          {copiedId === `request-${selectedEndpoint.id}` ? (
                            <><Check size={16} /> Copied</>
                          ) : (
                            <><Copy size={16} /> Copy</>
                          )}
                        </button>
                      </div>
                      <pre>
                        <code>{JSON.stringify(selectedEndpoint.requestBody, null, 2)}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Response Section */}
            <div className="section">
              <button
                className="section-header"
                onClick={() => toggleSection('response')}
              >
                <h3>Response Example</h3>
                {expandedSections.response ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </button>
              {expandedSections.response !== false && (
                <div className="section-content">
                  <div className="code-block">
                    <div className="code-header">
                      <span>200 OK - JSON</span>
                      <button
                        className="copy-btn"
                        onClick={() => copyToClipboard(
                          JSON.stringify(selectedEndpoint.response, null, 2),
                          `response-${selectedEndpoint.id}`
                        )}
                      >
                        {copiedId === `response-${selectedEndpoint.id}` ? (
                          <><Check size={16} /> Copied</>
                        ) : (
                          <><Copy size={16} /> Copy</>
                        )}
                      </button>
                    </div>
                    <pre>
                      <code>{JSON.stringify(selectedEndpoint.response, null, 2)}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Example cURL Request */}
            <div className="section">
              <button
                className="section-header"
                onClick={() => toggleSection('curl')}
              >
                <h3>Example Request</h3>
                {expandedSections.curl ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </button>
              {expandedSections.curl !== false && (
                <div className="section-content">
                  <div className="code-block">
                    <div className="code-header">
                      <span>cURL</span>
                      <button
                        className="copy-btn"
                        onClick={() => {
                          let curlCmd = `curl -X ${selectedEndpoint.method} "http://localhost:8000${selectedEndpoint.path}"`;
                          if (selectedEndpoint.requestBody) {
                            curlCmd += ` \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(selectedEndpoint.requestBody)}'`;
                          }
                          copyToClipboard(curlCmd, `curl-${selectedEndpoint.id}`);
                        }}
                      >
                        {copiedId === `curl-${selectedEndpoint.id}` ? (
                          <><Check size={16} /> Copied</>
                        ) : (
                          <><Copy size={16} /> Copy</>
                        )}
                      </button>
                    </div>
                    <pre>
                      <code>
                        {`curl -X ${selectedEndpoint.method} "http://localhost:8000${selectedEndpoint.path}"`}
                        {selectedEndpoint.requestBody && (
                          <>
                            {` \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(selectedEndpoint.requestBody)}'`}
                          </>
                        )}
                      </code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Authentication Info */}
        <div className="auth-section">
          <h2>Authentication & Configuration</h2>
          <div className="auth-grid">
            <div className="auth-card">
              <h3>Environment Variables</h3>
              <p>The API requires the following environment variables to be set:</p>
              <div className="code-block">
                <pre>
                  <code>{`GRADESCOPE_EMAIL="your-email@berkeley.edu"
GRADESCOPE_PASSWORD="your-password"
PL_API_TOKEN="your-prairielearn-token"
SERVICE_ACCOUNT_CREDENTIALS='{...json...}'`}</code>
                </pre>
              </div>
            </div>
            <div className="auth-card">
              <h3>Running Locally</h3>
              <p>Start the FastAPI development server:</p>
              <div className="code-block">
                <pre>
                  <code>{`cd api
pip install -r requirements.txt
uvicorn app:app --reload --port 8000`}</code>
                </pre>
              </div>
              <p>API will be available at <code>http://localhost:8000</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;
