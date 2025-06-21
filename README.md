# CGWA Checker

A web application for calculating CGWA (Cumulative Grade Weighted Average) with a FastAPI backend and Next.js frontend.

## Project Structure

```
cumula-checker/
├── backend/           # FastAPI backend
│   ├── main.py       # API endpoints
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/         # Next.js frontend
│   ├── app/         # App directory
│   ├── components/  # React components
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

## Quick Start

1. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## Development

### Backend (FastAPI)
- Located in `backend/`
- Main API endpoint: `POST /upload`
- Returns placeholder CGWA value: 3.75

### Frontend (Next.js)
- Located in `frontend/`
- File upload interface
- Displays CGWA result

## API Endpoints

- `POST /upload` - Upload files and get CGWA calculation
  - Accepts multiple files
  - Returns: `{"cgwa": 3.75}`

## Docker Services

- **backend**: FastAPI service on port 8000
- **frontend**: Next.js service on port 3000
- **cgwa-net**: Internal network for service communication 