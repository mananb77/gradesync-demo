# GradeSync System Architecture

Visual documentation of the GradeSync microservices architecture, data flow, and deployment infrastructure.

## System Overview Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        EXTERNAL PLATFORMS                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐          │
│  │  Gradescope  │    │ PrairieLearn │    │   iClicker   │          │
│  │              │    │              │    │              │          │
│  │ Course ID:   │    │ Course ID:   │    │ Manual CSV   │          │
│  │   831412     │    │   155812     │    │   Exports    │          │
│  │              │    │              │    │              │          │
│  │ Assignments  │    │ Assessments  │    │ Attendance   │          │
│  │ Submissions  │    │ Questions    │    │ Engagement   │          │
│  │ Grades       │    │ Scores       │    │ Participation│          │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘          │
│         │                   │                   │                   │
└─────────┼───────────────────┼───────────────────┼───────────────────┘
          │ API               │ API Token         │ File Upload
          │ Calls             │ Auth              │
          ▼                   ▼                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      GRADESYNC SERVICES                              │
│                    (Containerized Microservices)                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │               FastAPI Backend (api/app.py)                     │ │
│  │                                                                │ │
│  │  • Python 3.11 + FastAPI + Uvicorn                            │ │
│  │  • Port: 8000                                                 │ │
│  │  • Docker Container on Google Cloud Run                       │ │
│  │                                                                │ │
│  │  REST API Endpoints:                                          │ │
│  │  ├─ GET  /                      → Welcome message             │ │
│  │  ├─ GET  /getGrades             → Fetch assignment grades     │ │
│  │  ├─ GET  /getAssignmentJSON     → List all assignments        │ │
│  │  ├─ GET  /getGradeScopeAssignmentID/{category}/{num}          │ │
│  │  ├─ GET  /fetchAllGrades        → All grades for all students │ │
│  │  ├─ GET  /getPLGrades            → PrairieLearn gradebook     │ │
│  │  ├─ POST /testWriteToSheet      → Test Sheets API            │ │
│  │  └─ GET  /health                → Health check                │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐        │
│  │  Gradescope    │  │ PrairieLearn   │  │   iClicker     │        │
│  │  Sync Service  │  │  Sync Service  │  │    Script      │        │
│  │                │  │                │  │                │        │
│  │ Cloud Run      │  │ Cloud Run      │  │ Local Python   │        │
│  │ Cron Job       │  │ Cron Job       │  │ Script         │        │
│  │                │  │                │  │                │        │
│  │ Schedule:      │  │ Schedule:      │  │ Manual:        │        │
│  │ Every 6 hours  │  │ Daily @ 3 AM   │  │ On-demand      │        │
│  │                │  │                │  │                │        │
│  │ Fetches:       │  │ Fetches:       │  │ Processes:     │        │
│  │ • Assignments  │  │ • Gradebook    │  │ • CSV exports  │        │
│  │ • Submissions  │  │ • Questions    │  │ • Attendance   │        │
│  │ • Student data │  │ • Pivot tables │  │ • Scores       │        │
│  └───────┬────────┘  └───────┬────────┘  └───────┬────────┘        │
│          │                   │                   │                  │
│          └───────────────────┴───────────────────┘                  │
│                              │                                       │
└──────────────────────────────┼───────────────────────────────────────┘
                               │ gspread API
                               │ Write Operations
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         DATA OUTPUT LAYER                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│                      ┌──────────────────┐                            │
│                      │  Google Sheets   │                            │
│                      │                  │                            │
│                      │  • CS10 Grades   │                            │
│                      │  • 487 Students  │                            │
│                      │  • Real-time     │                            │
│                      │  • Instructor    │                            │
│                      │    Access        │                            │
│                      └──────────────────┘                            │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
STEP 1: AUTHENTICATION
├─ Gradescope: Email/Password via fullGSapi
├─ PrairieLearn: API Token authentication
└─ Google Sheets: Service Account JSON

        ▼

STEP 2: DATA FETCHING
├─ Gradescope Client
│  └─ Assignments → Submissions → Scores
├─ PrairieLearn Client
│  └─ Assessments → Questions → Student responses
└─ iClicker
   └─ CSV files → Parsed data

        ▼

STEP 3: DATA PROCESSING
├─ Normalize student identifiers (emails, SIDs)
├─ Calculate statistics (averages, totals, percentages)
├─ Create pivot tables (PrairieLearn question-level data)
├─ Format for Google Sheets API
└─ Error handling and validation

        ▼

STEP 4: SYNCHRONIZATION
├─ Batch updates to Google Sheets (gspread)
├─ Maintain data integrity
├─ Scheduled execution via Cloud Scheduler
└─ Error logging and retry logic

        ▼

STEP 5: REPORTING
└─ Google Sheets dashboard for instructors
   ├─ Student grades by assignment
   ├─ Overall course statistics
   ├─ Question-level analysis
   └─ Attendance tracking
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                   GOOGLE CLOUD PLATFORM                              │
│                  Project: eecs-gradeview                             │
│                  Region: us-west1 (Oregon)                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                  Google Cloud Run                              │ │
│  │                                                                │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌───────────────┐ │ │
│  │  │   FastAPI App   │  │  GS Sync Worker │  │  PL Sync      │ │ │
│  │  │                 │  │                 │  │  Worker       │ │ │
│  │  │  Port: 8000     │  │  Cron: 6h       │  │  Cron: Daily  │ │ │
│  │  │  Auto-scale:    │  │  Auto-scale:    │  │  Auto-scale:  │ │ │
│  │  │  0-10 instances │  │  0-5 instances  │  │  0-3 instances│ │ │
│  │  │  Concurrency:80 │  │  Concurrency:10 │  │  Concurrency:5│ │ │
│  │  └─────────────────┘  └─────────────────┘  └───────────────┘ │ │
│  │                                                                │ │
│  │  Container Registry: Google Artifact Registry                 │ │
│  │  Base Image: python:3.11-slim                                 │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                  Google Cloud Scheduler                        │ │
│  │                                                                │ │
│  │  ┌──────────────────────────────────────────────────────────┐ │ │
│  │  │  Gradescope Job                                          │ │ │
│  │  │  Schedule: 0 */6 * * * (every 6 hours)                   │ │ │
│  │  │  Timezone: America/Los_Angeles                           │ │ │
│  │  │  Retry: 3 attempts, exponential backoff                  │ │ │
│  │  └──────────────────────────────────────────────────────────┘ │ │
│  │                                                                │ │
│  │  ┌──────────────────────────────────────────────────────────┐ │ │
│  │  │  PrairieLearn Job                                        │ │ │
│  │  │  Schedule: 0 3 * * * (daily at 3 AM)                     │ │ │
│  │  │  Timezone: America/Los_Angeles                           │ │ │
│  │  │  Retry: 3 attempts, exponential backoff                  │ │ │
│  │  └──────────────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                  Secret Manager                                │ │
│  │                                                                │ │
│  │  • GRADESCOPE_EMAIL                                           │ │
│  │  • GRADESCOPE_PASSWORD                                        │ │
│  │  • PL_API_TOKEN                                               │ │
│  │  • SERVICE_ACCOUNT_CREDENTIALS                                │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
                               │
                               │ HTTPS
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND LAYER                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│                      ┌──────────────────┐                            │
│                      │  GitHub Pages    │                            │
│                      │                  │                            │
│                      │  React Frontend  │                            │
│                      │  Static Hosting  │                            │
│                      │                  │                            │
│                      │  URL:            │                            │
│                      │  username.github │                            │
│                      │  .io/gradesync   │                            │
│                      └──────────────────┘                            │
│                                                                       │
│  Deployed via GitHub Actions on push to main                         │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Technology Stack Breakdown

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BACKEND STACK                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Language: Python 3.11                                                │
│                                                                       │
│  Frameworks:                                                          │
│  ├─ FastAPI 0.115.3         → REST API framework                     │
│  ├─ Uvicorn 0.32.0          → ASGI server                            │
│  └─ Pydantic 2.9.2          → Data validation                        │
│                                                                       │
│  APIs & Integrations:                                                 │
│  ├─ fullGSapi 1.3.11        → Gradescope API wrapper                 │
│  ├─ gspread                 → Google Sheets API                      │
│  ├─ google-auth             → Google authentication                  │
│  └─ requests                → HTTP client                            │
│                                                                       │
│  Utilities:                                                           │
│  ├─ python-dotenv 1.0.1     → Environment variables                  │
│  ├─ pytest 8.3.3            → Testing framework                      │
│  └─ httpx 0.27.0            → Async HTTP client                      │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      INFRASTRUCTURE STACK                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Containerization:                                                    │
│  ├─ Docker                  → Container runtime                      │
│  ├─ docker-compose          → Local orchestration                    │
│  └─ Dockerfile              → Image definition                       │
│                                                                       │
│  Cloud Platform (GCP):                                                │
│  ├─ Cloud Run               → Serverless containers                  │
│  ├─ Cloud Scheduler         → Cron job management                    │
│  ├─ Artifact Registry       → Container image registry               │
│  ├─ Secret Manager          → Secrets storage                        │
│  └─ IAM                     → Access control                         │
│                                                                       │
│  CI/CD:                                                               │
│  └─ gcloud CLI              → Deployment automation                  │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                       FRONTEND STACK                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Core:                                                                │
│  ├─ React 18.2.0            → UI library                             │
│  ├─ React Router 6.20.0     → Client-side routing                    │
│  └─ React Scripts 5.0.1     → Build tooling                          │
│                                                                       │
│  UI Components:                                                       │
│  ├─ Lucide React 0.294.0    → Icon library                           │
│  └─ Custom CSS              → Styling (CSS variables)                │
│                                                                       │
│  Syntax Highlighting:                                                 │
│  └─ Prism.js 1.29.0         → Code syntax highlighting               │
│                                                                       │
│  Deployment:                                                          │
│  ├─ GitHub Pages            → Static hosting                         │
│  ├─ GitHub Actions          → CI/CD pipeline                         │
│  └─ gh-pages 6.1.0          → Deployment utility                     │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                      SECURITY LAYERS                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Authentication:                                                      │
│  ├─ Gradescope: Username/password (encrypted in secrets)             │
│  ├─ PrairieLearn: API token authentication                           │
│  └─ Google: Service account with limited permissions                 │
│                                                                       │
│  Secrets Management:                                                  │
│  ├─ Environment variables (.env) - NOT committed to git              │
│  ├─ Google Secret Manager - Production secrets                       │
│  └─ GitHub Secrets - CI/CD secrets                                   │
│                                                                       │
│  Network Security:                                                    │
│  ├─ HTTPS only (enforced on Cloud Run)                               │
│  ├─ Private container networking                                     │
│  └─ CORS configuration for frontend                                  │
│                                                                       │
│  Data Protection:                                                     │
│  ├─ Service account with minimal permissions                         │
│  ├─ Scoped Google Sheets access                                      │
│  └─ No student data in frontend (mock data only)                     │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Scaling & Performance

```
AUTO-SCALING CONFIGURATION

FastAPI Backend:
├─ Min Instances: 0 (scales to zero when idle)
├─ Max Instances: 10
├─ Concurrency: 80 requests per container
├─ CPU: 1 vCPU per instance
├─ Memory: 512 MB per instance
└─ Startup time: ~2 seconds

Gradescope Sync Worker:
├─ Min Instances: 0
├─ Max Instances: 5
├─ Concurrency: 10 requests per container
└─ Execution time: ~5-10 minutes

PrairieLearn Sync Worker:
├─ Min Instances: 0
├─ Max Instances: 3
├─ Concurrency: 5 requests per container
└─ Execution time: ~3-8 minutes

Frontend (GitHub Pages):
├─ CDN: GitHub's global CDN
├─ Caching: Automatic asset caching
├─ Bundle size: ~200KB gzipped
└─ Load time: <2 seconds (first load)
```

## Cost Optimization

```
COST STRUCTURE (Estimated Monthly)

Google Cloud Run:
├─ FastAPI: ~$5-10/month (scales to zero)
├─ Sync Workers: ~$2-5/month (scheduled runs only)
└─ Total compute: ~$7-15/month

Google Cloud Scheduler:
├─ 2 jobs × $0.10/job = $0.20/month
└─ Total scheduling: ~$0.20/month

Google Artifact Registry:
├─ Storage: ~$0.10/GB/month
└─ Total storage: ~$0.50/month

GitHub Pages:
├─ Free tier (public repository)
└─ Total: $0/month

TOTAL ESTIMATED COST: $8-16/month
```

---

This architecture diagram provides a complete visual reference for understanding how all components of GradeSync work together, from data ingestion to presentation.
