# Bloom Digitals Exercise by Andres Olvera

A MERN application with authentication, task management (CRUD), and external API integration.

## Features

### Authentication System
- **Secure Login**: JWT-based authentication with bcrypt password hashing
- **Protected Routes**: Dashboard accessible only after authentication
- **Token Management**: Automatic token storage and validation
- **Auto-redirect**: Seamless navigation after login

### Task Management (CRUD)
- **Create Tasks**: Add new tasks with name, description, and status
- **Read Tasks**: View all tasks in responsive table/card layout
- **Update Tasks**: Edit existing task details and toggle status
- **Delete Tasks**: Remove tasks with confirmation
- **Real-time-ish Updates**: Changes reflect immediately without page refresh
- **Responsive Design**: Optimized for both desktop and mobile

### Tech News Widget
- **External API Integration**: Live tech news from Hacker News API
- **Loading States**: User-friendly feedback during data fetching
- **Error Handling**: Graceful error management with fallback messages
- **Responsive Cards**: Simplified mobile view

### Modern UI/UX
- **Tailwind CSS**: Utility-first styling for consistent design
- **Responsive Layout**: Adapts seamlessly to all screen sizes

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)

## Installation & Setup

### 1. Clone and Install
```bash
git clone git@github.com:andruxnet/bloom-digitals-andres-exercise.git
cd bloom-digitals-andres-exercise
npm install
```
This single command will automatically install all dependencies for the entire project.

### 2. Environment Setup
Create a `.env` file in the `backend` directory:
```env
PORT=5001
JWT_SECRET=some-secret-key
MONGODB_URI=some-mongodb-uri
```

## Running the Application

### Quick Start (Recommended)
```bash
npm start
```
This will start both the backend API server and frontend development server simultaneously.

### Manual Start (Alternative)
If you prefer to start them separately:

**Backend API Server:**
```bash
npm run server
```
The backend will run on `http://localhost:5001`

**Frontend Development Server:**
```bash
npm run client
```
The frontend will run on `http://localhost:3000` and automatically open in your browser.

## Login Credentials

Login credentials are pre-configured in the database:

- **Username/Email**: `bloom/bloom@digitals.com`
- **Password**: `password`

## Technical Decisions

### Architecture Choices
- **Separated Frontend/Backend**: Independent services for better scalability and maintainability
- **Modular Backend Structure**: Organized code with dedicated files for models, routes, middleware, and services
- **Context API over Redux**: Chose React's built-in state management for simplicity and reduced dependencies
- **Protected Routes**: Client-side route protection with automatic redirects for unauthenticated users

### External API Selection
- **Hacker News API**: Chosen because it's free, doesn't require an API key, and provides relevant tech content

### Development Experience
- **Concurrent Development**: Single command startup for both frontend and backend using `concurrently`
- **Automatic Dependency Installation**: npm hooks to install all dependencies with one command
- **Environment Variable Management**: Centralized configuration with validation at startup
- **Clean Output**: Suppressed npm warnings and deprecation messages for cleaner development experience

### UI/UX Decisions
- **Responsive Design**: Mobile-first approach with Tailwind CSS utility classes
- **Component Reusability**: Extracted common components (ItemsNotFound, TechNewsLoading, etc.) for better maintainability

## Project Structure

```
andres-app/
├── backend/
│   ├── models/
│   │   ├── user.js          # User schema and methods
│   │   └── task.js          # Task schema
│   ├── routes/
│   │   ├── auth-routes.js   # Authentication endpoints
│   │   └── task-routes.js   # Task CRUD endpoints
│   ├── middleware/
│   │   └── auth-middleware.js # JWT verification
│   ├── services/
│   │   └── password-service.js # Password utilities
│   ├── server.js            # Express app setup
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── ItemsNotFound.js
│   │   │   ├── Login.js
│   │   │   ├── ProtectedRoute.js
│   │   │   ├── TaskForm.js
│   │   │   ├── TaskList.js
│   │   │   ├── TechNewsCard.js
│   │   │   ├── TechNewsError.js
│   │   │   ├── TechNewsList.js
│   │   │   ├── TechNewsLoading.js
│   │   │   └── TechNewsWidget.js
│   │   ├── contexts/
│   │   │   └── AuthContext.js # Authentication state
│   │   ├── services/
│   │   │   └── hackerNewsService.js # External API client
│   │   ├── App.js            # Main app and routing
│   │   ├── index.js          # React entry point
│   │   └── index.css         # Tailwind CSS directives
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── package.json              # Root package with concurrent scripts
├── package-lock.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Tasks (Protected Routes)
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle task status

## Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Verify the `MONGODB_URI` in your `.env` file

**JWT Secret Error**
- Make sure `JWT_SECRET` is set in your `.env` file

**Port Already in Use**
- The backend uses port 5001 by default to avoid conflicts with macOS AirPlay Receiver
- If port 5001 is used by another process, change the `PORT` in your `.env` file and update the proxy in `frontend/package.json`

**CORS Issues**
- Ensure the backend is running on the correct port
- Check that the proxy in `frontend/package.json` matches your backend URL
