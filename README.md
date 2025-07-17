# Workcity Assessment - Backend API

This is a RESTful API for managing **users, clients, and projects** using **Node.js**, **Express**, **TypeScript**, and **MongoDB**.

It provides secure **authentication**, **role-based authorization**, and **project-client relationship handling** for a company/project management system.

---

## ✅ Features

- JWT Authentication (`/auth/signup`, `/auth/login`)
- Role-based Authorization (`admin`, `user`)
- CRUD operations for Clients and Projects
- Fetch projects by client ID
- Swagger API Documentation
- Jest & Supertest for testing

---

## 📁 What the API Does

This API allows:
- Users to sign up and log in
- Admins to manage (create/update/delete) clients and projects
- Authenticated users to view project and client information
- Linking of projects to specific clients

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/workcity-assessment-backend.git
cd workcity-assessment-backend
npm install
```

### 2. Create a `.env` file

Create a `.env` file in the root of the project and add the following environment variables:

```env
BASE_URI=http://localhost:8080
PORT=8080
MONGO_URI=mongodb://localhost:27017/workcity
JWT_SECRET=your_jwt_secret_key
```


### 3. Start the development server

```bash
npm run dev
```

---

### ✅ 4. **API Endpoints**

API Documenation: http://localhost:8080/api-docs

```markdown
## 🔐 Auth Endpoints

- `POST /api/auth/signup` — Register a new user
- `POST /api/auth/login` — Login and receive JWT token

## 👥 Client Endpoints

- `GET /api/clients` — List all clients (authenticated)
- `POST /api/clients` — Create a client (admin only)
- `PUT /api/clients/:id` — Update a client (admin only)
- `DELETE /api/clients/:id` — Delete a client (admin only)

## 📁 Project Endpoints

- `GET /api/projects` — List all projects (authenticated)
- `GET /api/projects/client/:clientId` — Get projects by client
- `POST /api/projects` — Create a project (admin only)
- `PUT /api/projects/:id` — Update a project (admin only)
- `DELETE /api/projects/:id` — Delete a project (admin only)