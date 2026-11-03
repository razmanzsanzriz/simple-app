# Simple Notes App

- `backend`: ASP.NET Core minimal API (.NET 10) + EF Core + SQLite (`notes.db`, created on first run)
- `frontend`: React + TypeScript + Vite

## Run

Terminal 1 (backend, http://localhost:5100):

```powershell
cd C:\Codex\Project1\simple-app\backend
dotnet run
```

Terminal 2 (frontend):

```powershell
cd C:\Codex\Project1\simple-app\frontend
npm.cmd install
npm.cmd run dev
```

Open http://localhost:5180.

## API

| Method | URL               | Body               |
| ------ | ----------------- | ------------------ |
| GET    | /api/notes        |                    |
| POST   | /api/notes        | `{ "text": "..." }` |
| DELETE | /api/notes/{id}   |                    |
