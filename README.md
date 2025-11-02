# GradeSync

<div align="center">

**Educational Grade Management System for Multi-Platform Assessment Integration**

[![GitHub Pages](https://img.shields.io/badge/demo-live-success)](https://mananb77.github.io/gradesync-demo)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python 3.11](https://img.shields.io/badge/python-3.11-blue.svg)](https://www.python.org/downloads/)
[![React 18](https://img.shields.io/badge/react-18-blue.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green.svg)](https://fastapi.tiangolo.com/)

[Live Demo](https://mananb77.github.io/gradesync-demo) • [API Docs](https://mananb77.github.io/gradesync-demo/api) • [Architecture](https://mananb77.github.io/gradesync-demo/architecture) • [Documentation](DEPLOYMENT.md)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [Quick Start](#-quick-start)
- [Backend Setup](#-backend-setup)
- [Frontend Setup](#-frontend-setup)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Use Cases](#-use-cases)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**GradeSync** is a comprehensive backend microservices system designed to streamline grade management for large computer science courses. Originally built for **CS10 (The Beauty and Joy of Computing)** at UC Berkeley with 487+ students, it automates the complex process of aggregating grades from multiple assessment platforms into a unified reporting system.

### What It Does

GradeSync integrates with **Gradescope** for automated assignment grading, **PrairieLearn** for interactive CS assessments, and **iClicker** for classroom engagement tracking. All data is automatically synchronized to **Google Sheets** for easy instructor access, with cloud-scheduled cron jobs ensuring data stays up-to-date without manual intervention.

### Why It Exists

Managing grades across multiple platforms for large courses is time-consuming and error-prone. GradeSync:
- ✅ Eliminates manual data entry and copy-paste errors
- ✅ Provides real-time grade updates to instructors
- ✅ Enables post-semester submission workflows
- ✅ Scales to handle hundreds of students effortlessly
- ✅ Reduces instructor workload by 10+ hours per week

---

## ✨ Features

### 🔄 **Multi-Platform Integration**
- **Gradescope**: Automated assignment grading and submission tracking
- **PrairieLearn**: Interactive assessments with question-level analytics
- **iClicker**: Classroom engagement and participation data
- **Google Sheets**: Centralized reporting and instructor dashboard

### ⚡ **Automated Synchronization**
- Cloud-scheduled cron jobs (every 6 hours for Gradescope, daily for PrairieLearn)
- Automatic data fetching and processing
- Real-time updates to Google Sheets
- Error handling with exponential backoff retry logic

### 🏗️ **Microservices Architecture**
- Containerized Docker services
- Independent, scalable components
- RESTful API with 8 comprehensive endpoints
- Production-ready deployment on Google Cloud Run

### 🎨 **Modern Web Interface**
- React-based documentation and demo site
- Interactive API documentation with live examples
- Visual architecture diagrams
- Responsive design for all devices

---

## 🏛️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│              External Assessment Platforms                   │
│   Gradescope  │  PrairieLearn  │  iClicker                  │
└──────────────┬────────────────┬────────────┬────────────────┘
               │                │            │
               │   API Calls    │            │   CSV Upload
               ▼                ▼            ▼
┌─────────────────────────────────────────────────────────────┐
│                    GradeSync Services                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  FastAPI     │  │  GS Sync     │  │  PL Sync     │      │
│  │  Backend     │  │  Worker      │  │  Worker      │      │
│  │  (Port 8000) │  │  (Cron 6h)   │  │  (Daily)     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└──────────────────────────┬──────────────────────────────────┘
                           │   gspread API
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Google Sheets                             │
│              Instructor Grade Dashboard                      │
└─────────────────────────────────────────────────────────────┘
```

For detailed architecture diagrams, see [ARCHITECTURE_DIAGRAM.md](ARCHITECTURE_DIAGRAM.md) or visit the [live architecture page](https://mananb77.github.io/gradesync-demo/architecture).

---

## 🛠️ Technology Stack

### Backend
- **Language**: Python 3.11
- **Framework**: FastAPI 0.115.3
- **Server**: Uvicorn (ASGI)
- **Validation**: Pydantic 2.9.2

### APIs & Integrations
- **Gradescope**: fullGSapi 1.3.11
- **PrairieLearn**: REST API with token auth
- **Google Sheets**: gspread + google-auth
- **HTTP Client**: requests, httpx

### Infrastructure
- **Containerization**: Docker, docker-compose
- **Cloud Platform**: Google Cloud Platform (GCP)
  - Cloud Run (serverless containers)
  - Cloud Scheduler (cron jobs)
  - Artifact Registry (container images)
  - Secret Manager (credentials)
- **CI/CD**: GitHub Actions

### Frontend
- **Framework**: React 18.2.0
- **Routing**: React Router 6.20.0
- **Icons**: Lucide React 0.294.0
- **Build**: Create React App 5.0.1
- **Hosting**: GitHub Pages

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.11+** with pip
- **Node.js 16+** with npm
- **Docker** (optional, for containerized deployment)
- **Google Cloud SDK** (for production deployment)

### 5-Minute Setup

```bash
# 1. Clone the repository
git clone https://github.com/mananb77/gradesync-demo.git
cd gradesync-demo

# 2. Set up backend
cd api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your credentials

# 4. Run the API
uvicorn app:app --reload --port 8000
# API available at http://localhost:8000

# 5. Set up frontend (in new terminal)
cd ../frontend
npm install
npm start
# Frontend available at http://localhost:3000/gradesync-demo
```

---

## 🔧 Backend Setup

### Local Development

1. **Navigate to the API directory:**
   ```bash
   cd api
   ```

2. **Create and activate virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**

   Create a `.env` file in the `api` directory:
   ```env
   # Gradescope Credentials
   GRADESCOPE_EMAIL=your-email@berkeley.edu
   GRADESCOPE_PASSWORD=your-secure-password

   # PrairieLearn API
   PL_API_TOKEN=your-prairielearn-api-token

   # Google Sheets Integration
   SERVICE_ACCOUNT_CREDENTIALS={"type":"service_account","project_id":"..."}
   ```

5. **Run the development server:**
   ```bash
   uvicorn app:app --reload --port 8000
   ```

6. **Test the API:**
   ```bash
   curl http://localhost:8000/
   # Should return: {"message": "Welcome to GradeSync API"}
   ```

### Docker Deployment

1. **Build the container:**
   ```bash
   cd api
   docker build -t gradesync-api .
   ```

2. **Run with environment variables:**
   ```bash
   docker run -p 8000:8000 --env-file .env gradesync-api
   ```

3. **Or use docker-compose:**
   ```bash
   docker-compose up --build
   ```

### Running Tests

```bash
cd api
pytest
# Or with coverage
pytest --cov=. --cov-report=html
```

---

## 💻 Frontend Setup

### Local Development

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

   Opens automatically at `http://localhost:3000/gradesync-demo`

4. **Build for production:**
   ```bash
   npm run build
   ```

   Creates optimized build in `build/` directory

### Environment Configuration

If connecting to a real backend API, create `.env.production`:

```env
REACT_APP_API_URL=https://your-api-url.com
```

---

## 🌐 Deployment

### Frontend (GitHub Pages)

The frontend automatically deploys to GitHub Pages when you push to the `main` branch.

**Setup:**

1. Enable GitHub Pages in repository settings
   - Go to **Settings** → **Pages**
   - Set source to **"GitHub Actions"**

2. Push to main branch:
   ```bash
   git push origin main
   ```

3. Monitor deployment:
   - Check **Actions** tab in GitHub
   - Wait for green checkmark ✓

4. Visit your site:
   ```
   https://mananb77.github.io/gradesync-demo
   ```

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Backend (Google Cloud Run)

**Deploy to production:**

```bash
cd api

# Build and push container
gcloud builds submit --tag gcr.io/eecs-gradeview/gradesync-api

# Deploy to Cloud Run
gcloud run deploy gradesync-api \
  --image gcr.io/eecs-gradeview/gradesync-api \
  --region us-west1 \
  --platform managed \
  --allow-unauthenticated
```

**Set up Cloud Scheduler (cron jobs):**

```bash
# Gradescope sync - every 6 hours
gcloud scheduler jobs create http gradescope-sync \
  --schedule="0 */6 * * *" \
  --uri="https://your-cloud-run-url.com/fetchAllGrades" \
  --time-zone="America/Los_Angeles"

# PrairieLearn sync - daily at 3 AM
gcloud scheduler jobs create http prairielearn-sync \
  --schedule="0 3 * * *" \
  --uri="https://your-cloud-run-url.com/getPLGrades" \
  --time-zone="America/Los_Angeles"
```

---

## 📁 Project Structure

```
gradesync-demo/
├── api/                          # Backend FastAPI service
│   ├── app.py                    # Main FastAPI application
│   ├── gradescopeClient.py       # Gradescope API wrapper
│   ├── utils.py                  # Utility functions
│   ├── config/                   # Course configuration files
│   ├── requirements.txt          # Python dependencies
│   ├── Dockerfile                # Container definition
│   └── docker-compose.yml        # Local orchestration
│
├── gradescope/                   # Gradescope sync service
│   ├── gradescope_to_spreadsheet.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── prairieLearn/                 # PrairieLearn sync service
│   ├── pl_to_spreadsheet.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── iclicker/                     # iClicker processing script
│   ├── iclicker_to_spreadsheet.py
│   └── requirements.txt
│
├── frontend/                     # React documentation site
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   ├── pages/                # Page components
│   │   ├── data/                 # Mock API data
│   │   └── App.js                # Main application
│   ├── package.json              # Node dependencies
│   └── README.md                 # Frontend documentation
│
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions CI/CD
│
├── ARCHITECTURE_DIAGRAM.md       # Visual architecture docs
├── DEPLOYMENT.md                 # Deployment guide
├── LICENSE                       # MIT License
└── README.md                     # This file
```

---

## 📚 API Documentation

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message and API status |
| GET | `/getGrades?assignment_id={id}` | Fetch grades for specific assignment |
| GET | `/getAssignmentJSON` | List all assignments with metadata |
| GET | `/getGradeScopeAssignmentID/{category}/{num}` | Get assignment ID by category |
| GET | `/fetchAllGrades` | Fetch all grades for all students |
| GET | `/getPLGrades` | Get PrairieLearn gradebook |
| POST | `/testWriteToSheet` | Test Google Sheets write access |
| GET | `/health` | Health check endpoint |

### Example Request

```bash
# Get grades for assignment 123456
curl -X GET "http://localhost:8000/getGrades?assignment_id=123456"
```

### Example Response

```json
{
  "assignment_id": 123456,
  "assignment_name": "Project 2: Data Structures",
  "total_students": 487,
  "avg_score": 87.3,
  "grades": [
    {
      "student_email": "alice@berkeley.edu",
      "score": 95.5,
      "status": "graded"
    }
  ]
}
```

**Interactive API Documentation:**
- Visit the [live API docs page](https://mananb77.github.io/gradesync-demo/api) for interactive examples
- Or run locally and visit `http://localhost:8000/docs` for Swagger UI

---

## 💡 Use Cases

### 1. **Course Instructors**
View aggregated student grades from all platforms in a single Google Sheet. Track assignment completion rates and identify students who need support.

### 2. **Teaching Assistants**
Access real-time grade data for office hours and section discussions. Monitor student progress across different assessment types.

### 3. **Post-Semester Grading**
Enable students to submit late work after the semester ends and automatically update grades in the system.

### 4. **Data Analysis**
Export grade data for statistical analysis, identifying question difficulty trends, and improving course materials.

### 5. **Large Course Management**
Scale to handle 400+ students with automated grade synchronization, eliminating hours of manual data entry.

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Reporting Issues

Found a bug? Have a feature request? Please [open an issue](https://github.com/mananb77/gradesync-demo/issues) with:
- Clear description of the problem/feature
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots (if applicable)

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit with descriptive messages (`git commit -m 'Add amazing feature (AI Assisted)'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Write clear, descriptive commit messages
- Add comments for complex logic
- Update documentation for new features
- Test thoroughly before submitting

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### What This Means

You are free to:
- ✅ Use commercially
- ✅ Modify and adapt
- ✅ Distribute
- ✅ Use privately

Under these conditions:
- 📝 Include the original license and copyright notice
- 🚫 No warranty or liability provided

---

## 🔗 Resources & Links

- **Live Demo**: https://mananb77.github.io/gradesync-demo
- **GitHub Repository**: https://github.com/mananb77/gradesync-demo
- **FastAPI Documentation**: https://fastapi.tiangolo.com/
- **React Documentation**: https://react.dev/
- **Google Cloud Run**: https://cloud.google.com/run/docs

---

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/mananb77/gradesync-demo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/mananb77/gradesync-demo/discussions)
- **Email**: manan@berkeley.edu

---

## 🌟 Acknowledgments

Built for **CS10: The Beauty and Joy of Computing** at UC Berkeley.

Special thanks to:
- The CS10 teaching team for requirements and feedback
- UC Berkeley EECS department for infrastructure support
- The open-source community for the amazing tools and libraries

---

## 📊 Project Stats

- **Backend API**: 8 RESTful endpoints
- **Integrations**: 3 assessment platforms + Google Sheets
- **Students Supported**: 487+ per semester
- **Deployments**: 4 containerized microservices
- **Documentation Pages**: 4 comprehensive guides
- **Time Saved**: 10+ hours/week for instructors

---

<div align="center">

**Built with ❤️ for educators and students**

[⭐ Star this repo](https://github.com/mananb77/gradesync-demo) • [🐛 Report Bug](https://github.com/mananb77/gradesync-demo/issues) • [✨ Request Feature](https://github.com/mananb77/gradesync-demo/issues)

</div>
