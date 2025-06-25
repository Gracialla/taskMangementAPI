# Task Management API

A backend API for managing personal tasks, built with **Node.js**, **Express**, **Sequelize**, and **MySQL**. Authenticated users can create, update, and manage their tasks efficiently.

---

## Features

- User Registration & Login (JWT Auth)
-  Create, Read, Update, Delete (CRUD) tasks
- Filter tasks by status or priority
- Set due dates and priorities
- Protected routes with token-based authentication

---

## Technologies

 **Node.js**: JavaScript runtime for building the API
- **Express**: Web framework for Node.js
- **Sequelize**: ORM for interacting with the database
- **MySQL**: Relational database management system
- **JWT**: JSON Web Tokens for authentication
- **Nodemailer**: For sending emails (e.g., password reset)
- **dotenv**: For managing environment variables


## Setup & Installation

1. **Clone the repository**

```bash
git https://github.com/Gracialla/taskMangementAPI.git

```
```bash
cd taskMangementAPI
```
2. **Install dependencies**
```bash
npm install
```
3. **Create a `.env` file in the root directory and add your environment variables:**
4. **Create a MySQL database and update the `config/database.js` file with your database credentials**
5. **Run the migrations** to create the necessary tables in the database.
6. **Start the server** with `npm start` or `nodemon` for development.
7. **Use Postman or a similar tool to test the API endpoints**.
8. **Register a user and obtain an access token** to use with protected routes.
9. **Use the access token to create, read, update, and delete tasks**.
10. **Filter tasks by status or priority** using the `GET /tasks` endpoint with query.
11. **Set due dates and priorities** when creating or updating tasks.

## API Endpoints
### User Management
- **POST /users**: Create a new user
- **POST /login**: Login and obtain an access token
- **GET /users**: Get all users (admin-only)
- **GET /users/:id**: Get a user by ID (admin-only)
- **PUT /users/:id**: Update a user (admin-only)
- **DELETE /users/:id**: Delete a user (admin-only)
### Task Management
- **POST /tasks**: Create a new task
- **GET /tasks**: Get all tasks
- **GET /tasks/:id**: Get a task by ID
- **PUT /tasks/:id**: Update a task
- **DELETE /tasks/:id**: Delete a task
### Authentication
- **POST /login**: Login and obtain an access token
- **GET /logout**: Logout and invalidate the access token
### Email
- **POST /email**: Send an email (e.g., password reset)
### Error Handling
- **GET /error**: Get error details (for debugging purposes)






