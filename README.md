# Intern Application Tracker

A lightweight full-stack CRUD application to help students manage and track internship and job applications throughout the recruiting cycle.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)

## ✨ Features

- **Full CRUD Operations**: Create, Read, Update, and Delete job applications
- **Filtering & Sorting**: Filter applications by status and sort by application date
- **Status Tracking**: Track application progress (Applied, Interview, Rejected, Offer)
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **Data Persistence**: PostgreSQL database for reliable data storage
- **Form Validation**: Client-side and server-side validation
- **Clean UI**: Modern, intuitive interface with color-coded status badges

## 🛠 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **PostgreSQL** - Relational database
- **node-postgres (pg)** - PostgreSQL client for Node.js
- **CORS** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable management

### Frontend
- **React** - JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Router DOM** - Routing library for React

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **PostgreSQL** (v12 or higher) - [Download here](https://www.postgresql.org/download/)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/nandth/intern-app-tracker.git
cd intern-app-tracker
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
PORT=5000
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/intern_tracker
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```bash
cp .env.example .env
```

The default configuration should work:

```env
REACT_APP_API_URL=http://localhost:5000
```

## 🗄 Database Setup

### 1. Create the Database

Open your PostgreSQL client (psql, pgAdmin, etc.) and create the database:

```sql
CREATE DATABASE intern_tracker;
```

### 2. Run the Schema

Execute the schema file to create tables and indexes:

```bash
psql -U your_username -d intern_tracker -f database/schema.sql
```

Or copy and paste the contents of `database/schema.sql` into your PostgreSQL client.

### 3. Verify Setup

Connect to the database and verify the table was created:

```sql
\c intern_tracker
\dt
```

You should see the `applications` table listed.

## 🏃 Running the Application

### Start the Backend Server

```bash
cd backend
npm start
```

The backend server will start on `http://localhost:5000`

For development with auto-restart:

```bash
npm run dev
```

### Start the Frontend Application

In a new terminal:

```bash
cd frontend
npm start
```

The React application will start on `http://localhost:3000` and automatically open in your browser.

## 📚 API Documentation

Base URL: `http://localhost:5000/api`

### Endpoints

#### 1. Get All Applications

```
GET /applications
```

**Query Parameters:**
- `status` (optional): Filter by status (Applied, Interview, Rejected, Offer)
- `sortBy` (optional): Field to sort by (default: date_applied)
- `sortOrder` (optional): ASC or DESC (default: DESC)

**Example:**
```
GET /applications?status=Interview&sortOrder=ASC
```

**Response:**
```json
[
  {
    "id": 1,
    "company": "Google",
    "role": "Software Engineering Intern",
    "location": "Mountain View, CA",
    "status": "Interview",
    "date_applied": "2024-01-15",
    "link_to_posting": "https://careers.google.com/jobs/...",
    "notes": "Referral from John Doe",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-20T14:22:00Z"
  }
]
```

#### 2. Get Application by ID

```
GET /applications/:id
```

**Response:** Single application object or 404 if not found

#### 3. Create New Application

```
POST /applications
```

**Request Body:**
```json
{
  "company": "Microsoft",
  "role": "Software Engineering Intern",
  "location": "Redmond, WA",
  "status": "Applied",
  "dateApplied": "2024-01-20",
  "linkToPosting": "https://careers.microsoft.com/...",
  "notes": "Applied through career fair"
}
```

**Required Fields:** company, role, status, dateApplied

**Response:** Created application object with generated ID (201 status)

#### 4. Update Application

```
PUT /applications/:id
```

**Request Body:** (all fields optional for partial updates)
```json
{
  "status": "Interview",
  "notes": "Phone screen scheduled for next week"
}
```

**Response:** Updated application object

#### 5. Delete Application

```
DELETE /applications/:id
```

**Response:** 204 No Content on success, 404 if not found

## 📁 Project Structure

```
intern-app-tracker/
├── backend/
│   ├── config/
│   │   └── database.js          # PostgreSQL connection pool
│   ├── controllers/
│   │   └── applicationController.js  # Business logic
│   ├── middleware/
│   │   └── errorHandler.js      # Error handling middleware
│   ├── models/
│   │   └── application.js       # Database queries
│   ├── routes/
│   │   └── applications.js      # API routes
│   ├── .env.example
│   ├── package.json
│   └── server.js                # Express server entry point
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js           # Main dashboard container
│   │   │   ├── ApplicationTable.js    # Table/card view
│   │   │   ├── ApplicationForm.js     # Create/edit form
│   │   │   ├── ApplicationDetails.js  # View details modal
│   │   │   ├── FilterBar.js           # Filtering controls
│   │   │   └── ConfirmDialog.js       # Delete confirmation
│   │   ├── services/
│   │   │   └── api.js           # Axios API service
│   │   ├── utils/
│   │   │   └── formatters.js    # Utility functions
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css            # Tailwind imports
│   ├── .env.example
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
├── database/
│   └── schema.sql               # Database schema
├── .gitignore
├── LICENSE
└── README.md
```

## 🎨 UI Features

### Status Color Coding
- **Applied**: Blue badge
- **Interview**: Yellow/Amber badge
- **Rejected**: Red badge
- **Offer**: Green badge

### Responsive Design
- Desktop: Full table view with all columns
- Mobile: Card-based layout optimized for smaller screens

### User Experience
- Loading states during API calls
- Error messages for failed operations
- Form validation with helpful error messages
- Confirmation dialog before deletion
- Statistics dashboard showing application counts by status

## 🚀 Future Enhancements

Potential features for future development:

- **User Authentication**: Multi-user support with login/registration
- **Email Reminders**: Automated follow-up reminders
- **Analytics Dashboard**: Visualize application statistics with charts
- **Chrome Extension**: Auto-capture job postings from career sites
- **Export Functionality**: Export data to CSV/PDF formats
- **Interview Prep**: Add interview notes and scheduling
- **Application Templates**: Save and reuse common application data
- **Tags and Categories**: Custom categorization of applications
- **Calendar Integration**: Sync interview dates with Google Calendar
- **Search Functionality**: Full-text search across all applications
- **Deadline Tracking**: Alert for application deadlines
- **Company Research**: Integration with company data APIs

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Database Connection Issues

If you encounter database connection errors:

1. Verify PostgreSQL is running: `sudo service postgresql status`
2. Check your credentials in the `.env` file
3. Ensure the database exists: `psql -l`
4. Verify the DATABASE_URL format is correct

### Port Already in Use

If port 5000 or 3000 is already in use:

1. Backend: Change `PORT` in `backend/.env`
2. Frontend: The app will prompt you to use a different port

### CORS Errors

If you see CORS errors in the browser console:

1. Verify the backend server is running
2. Check that `REACT_APP_API_URL` in `frontend/.env` matches your backend URL

## 📧 Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Happy Job Hunting! 🎉**
