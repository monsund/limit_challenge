# Submission Tracker

**[▶ Watch the demo](https://drive.google.com/file/d/1jBdlKEJMGMSaDpYpPm7dJBq61NoZ2YWs/view?usp=drive_link)**

A lightweight submission tracking tool built with Django REST Framework + Next.js. Browse submissions, filter by status/broker/company, and inspect detailed records.

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js 18+
- npm or yarn

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_submissions  # Load sample data (optional: add --force to rebuild)
python manage.py runserver 0.0.0.0:8000
```

API will be available at `http://localhost:8000/api`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App will be available at `http://localhost:3000/submissions`

## Troubleshooting

**npm optional dependency errors on macOS:**

If you encounter errors like `Cannot find native binding` or `Cannot find module '@tailwindcss/oxide-darwin-arm64'`, clear npm cache and reinstall:

```bash
cd frontend
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

Then restart the dev server:
```bash
npm run dev
```

## API Endpoints

- `GET /api/submissions/` — Paginated submissions with filters
- `GET /api/submissions/{id}/` — Full submission detail with contacts, documents, notes
- `GET /api/brokers/` — Broker autocomplete list

## Environment Variables

**Frontend** (`frontend/.env.local`):
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

Defaults to `http://localhost:8000/api` if not set.

## Tech Stack

**Backend:**
- Django / Django REST Framework
- Python 3.9+

**Frontend:**
- Next.js 16
- React 19
- TypeScript
- Material-UI (MUI)
- React Query
- Axios

## Project Files

- [BACKEND_SOLUTION_NOTES.md](BACKEND_SOLUTION_NOTES.md) — API design, filtering, database optimization
- [FRONTEND_SOLUTION_NOTES.md](FRONTEND_SOLUTION_NOTES.md) — Component architecture, theme system, hooks
- [INTERVIEWER_NOTES.md](INTERVIEWER_NOTES.md) — Implementation context for reviewers
