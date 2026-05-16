# 📋 Job Tracker

A full-stack web app for managing job applications — built with React, Node.js, and Express. Users can add, view, update, and delete job applications, and filter them by status.

---

## 📸 Preview

<img width="1568" height="468" alt="image" src="https://github.com/user-attachments/assets/b06eba7e-40d7-46b2-93d3-37387c389d65" />

---

## ✨ Features

- ➕ **Create** job applications with company, title, status, date, and notes
- 📄 **View** all applications in one place
- ✏️ **Edit** or 🗑️ **delete** any application
- 🔍 **Filter by status** — Applied, Interviewing, Rejected, Offer
- ⏳ **Loading states** and ⚠️ **error handling** throughout the UI

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, [Tailwind CSS / MUI] |
| Backend | Node.js, Express.js |
| Database | [e.g. PostgreSQL / MongoDB / SQLite — update as needed] |
| Testing | Jest |


---

## 📡 API Endpoints

| Method | Route | Description |
|---|---|---|
| `GET` | `/jobs` | Fetch all job applications |
| `POST` | `/jobs` | Create a new job application |
| `PUT` | `/jobs/:id` | Update an existing job application |
| `DELETE` | `/jobs/:id` | Delete a job application |

### Job Object Shape

```json
{
  "id": 1,
  "company": "Acme Corp",
  "title": "Software Engineer",
  "status": "Interviewing",
  "date": "2025-05-10",
  "notes": "Had a great first-round call."
}
```

**Status values:** `Applied` | `Interviewing` | `Rejected` | `Offer`
