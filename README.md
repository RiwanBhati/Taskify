# Taskify: Full-Stack Productivity Application

Taskify is a comprehensive, full-stack web application designed as a central hub for personal productivity. It integrates user authentication, task management, event planning, and a focus timer into a single, cohesive platform.

This project was built to demonstrate mastery of modern web development principles, including a server-side Express application, API-driven data management with a MongoDB database, and dynamic, interactive frontend views rendered with EJS.

## Core Features

  * **Secure User Authentication:** Users can create an account and log in. Passwords are fully encrypted using **Bcrypt**.
  * **Dynamic To-Do List:** A full **CRUD** (Create, Read, Update, Delete) module for managing daily tasks.
  * **Event Planner:** A **CRUD** module for tracking upcoming events and deadlines.
  * **Pomodoro Timer:** A client-side focus timer built using **Object-Oriented JavaScript**.
  * **Dynamic Search:** A live search bar to filter tasks in real-time.


This project was built to meet the following technical specifications.

###  1. HTML & CSS

  * **Clean & Structured Layout:** The project uses a consistent, organized, and clean layout across all pages.
  * **Semantic HTML:** Semantic tags (`<header>`, `<footer>`, `<main>`, `<section>`, `<nav>`) are used throughout the application to provide structure and improve accessibility.
  * **Organized CSS:** All styles are centralized in `public/css/style.css`, with clear, reusable class names and a logical structure separating components (e.g., `.form-box`, `.task-item`, `.pomodoro-container`).

###  2. JavaScript (Interactivity & Data)

  * **Interactive Features:** Every page includes JavaScript-driven interactivity:
      * **Auth Pages:** Password visibility toggles (eye icon) on `login.ejs` and `signup.ejs`.
      * **Navigation:** The *entire* main navigation menu is controlled by JavaScript click handlers (`window.location.href`) instead of standard `<a>` tags.
      * **To-Do List:** Users can add, delete, and toggle task completion.
      * **Event Planner:** Users can add and delete events.
      * **Pomodoro:** The timer is fully interactive (start, pause, reset).
        
  * **Data-Driven Pages:** The two main inner pages are fully data-driven. Instead of static JSON, they use the `fetch()` API to call live Node.js endpoints which return JSON data from the MongoDB database:
    1.  **To-Do List (`To-Do-List.ejs`):** Fetches data from `/api/tasks`.
    2.  **Event Planner (`Event_PLanner.ejs`):** Fetches data from `/api/events`.

###  3. Object-Oriented Programming (OOP)

  * The **Pomodoro Timer (`pomodoro.ejs`)** page successfully demonstrates OOP concepts.
  * The entire timer functionality is encapsulated in a JavaScript **`PomodoroTimer` Class**. This class manages its own state (e.g., `timeLeft`, `isRunning`) and methods (e.g., `startTimer`, `pauseTimer`, `tick`, `updateDisplay`), which is instantiated on page load.

###  4. Node.js / Express.js

  * **Backend Server:** A robust backend is built in `backend/server.js` using Node.js and Express.
  * **Routing:** The server handles two types of routes:
    1.  **Page Rendering:** `app.get('/')`, `app.get('/login')`, etc., to render the EJS views.
    2.  **API Requests:** `app.get('/api/tasks')`, `app.post('/api/tasks')`, etc., to handle data.
  * **Nodemon:** The project is configured with Nodemon. The `"dev"` script in `package.json` uses `nodemon server.js` (wrapped with `cross-env` for compatibility) for mandatory automatic server restarts during development.

###  5. Template Engine (EJS)

  * **EJS Implementation:** The project uses EJS as its template engine for server-side rendering.
  * **Partials for Maintainability:** All common sections (`<head>`, `<header>`, `<footer>`) are abstracted into `views/partials/header.ejs` and `views/partials/footer.ejs`.
  * **No Code Duplication:** Every page (`home.ejs`, `login.ejs`, etc.) uses `<%- include('partials/header') %>` and `<%- include('partials/footer') %>` to eliminate code duplication and ensure high maintainability.

###  6. MongoDB Integration (Full CRUD)

  * The project implements full **CRUD** operations using a **MongoDB Atlas** cluster, satisfying the requirement that auth-only is not sufficient.
  * **User (Auth):**
      * **Create:** `app.post('/api/register')` (with Bcrypt hashing).
      * **Read:** `app.post('/api/login')` (with Bcrypt comparison).
  * **Tasks (Full CRUD):**
      * **Create:** `app.post('/api/tasks')`
      * **Read:** `app.get('/api/tasks')`
      * **Update:** `app.put('/api/tasks/:id')` (Used for toggling task completion).
      * **Delete:** `app.delete('/api/tasks/:id')`
  * **Events (Full CRUD):**
      * **Create:** `app.post('/api/events')`
      * **Read:** `app.get('/api/events')`
      * **Delete:** `app.delete('/api/events/:id')`

###  7. Website Interactivity

  * The project includes several dynamic elements implemented with JavaScript:
      * **Search Function:** The **To-Do List** page features a live **search/filter bar** that filters the task list in real-time as the user types.
      * **Popups:** Uses standard `alert()` popups for user feedback on form submissions (e.g., "Login failed", "Task added").
      * **Dynamic Toggles:** The password visibility toggles on auth pages.


##  Tech Stack Summary

| Category | Technology |
| :--- | :--- |
| **Languages** | HTML5, CSS3, JavaScript (ES6+) |
| **Server Runtime** | Node.js |
| **Server Framework** | Express.js |
| **Database/ORM** | MongoDB Atlas / Mongoose |
| **Templating** | EJS (with Partials) |
| **Security** | Bcryptjs (Password Hashing) |
| **Dev Tools** | Nodemon, cross-env |



##  Setup and Installation

Follow these steps to get a local copy of Taskify running.

### Prerequisites

  * Node.js and npm installed.
  * A free MongoDB Atlas account.

### 1\. Clone the Repository

```bash
git clone https://github.com/[YOUR_USERNAME]/[YOUR_REPO_NAME].git
cd [YOUR_REPO_NAME]/backend
```

### 2\. Install Dependencies

Install all required Node modules for the backend.

```bash
npm install
```

### 3\. Configure Database Connection

This project requires a connection to a MongoDB Atlas cluster to function.

1.  **Create a Cluster:** Log in to MongoDB Atlas and create a free (M0) cluster.
2.  **Create a Database User:** In "Database Access," create a user (e.g., `taskify_user`) and a secure password.
3.  **Whitelist IP:** In "Network Access," add your current IP address or `0.0.0.0/0` (Allow Access from Anywhere).
4.  **Get Connection String:** Click "Connect" \> "Drivers" and copy the connection string.
5.  **Update `server.js`:** Open `backend/server.js` and replace the placeholder `ATLAS_URI` variable (around line 26) with your actual connection string. **Ensure you insert your username and password.**

### 4\. Run the Server

This command uses `cross-env` to ensure the project runs on both Mac and Windows, and `nodemon` for auto-restarts.

```bash
npm run dev
```

### 5\. Access the Application

Open your web browser and navigate to:

`http://localhost:3000`
