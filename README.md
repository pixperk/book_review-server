# Book Review API

## Overview
The **Book Review API** allows users to register, authenticate, browse books, and post reviews. Admin users can manage books.

## Features
- **User authentication** (Register, Login, Profile Update)
- **Book management** (Admins only)
- **Book reviews** (Authenticated users only)
- **Role management** (Admins can toggle user roles)

---

## Setup Instructions

### **1. Install dependencies**
```bash
npm install
```

### **2. Set up environment variables**
Create a `.env` file in the root directory and configure it:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### **3. Start the server**
```bash
npm run dev
```

---

## API Endpoints

### **Users** (`/users`)

| Method | Endpoint                | Description                  | Auth Required |
|--------|-------------------------|------------------------------|--------------|
| POST   | `/register`             | Register a new user          | No           |
| POST   | `/login`                | Login user and get token     | No           |
| GET    | `/:userId`              | Get user profile             | No           |
| PUT    | `/:userId`              | Update user profile          | Yes          |
| PUT    | `/toggle-role/:userId`  | Toggle user role (admin)     | Yes (Admin)  |

### **Books** (`/books`)

| Method | Endpoint       | Description                   | Auth Required |
|--------|---------------|-------------------------------|--------------|
| GET    | `/`           | Get all books (with pagination) | No           |
| GET    | `/:id`        | Get a book by ID              | No           |
| POST   | `/`           | Add a new book (admin only)   | Yes (Admin)  |

### **Reviews** (`/reviews`)

| Method | Endpoint       | Description                      | Auth Required |
|--------|---------------|----------------------------------|--------------|
| GET    | `/:bookId`    | Get all reviews for a book       | No           |
| POST   | `/:bookId`    | Add a review to a book           | Yes          |

---

## Authentication & Authorization
- Users must authenticate using **JWT tokens**.
- **Admins** can add books and toggle user roles.
- **Authenticated users** can post reviews.

To use authenticated routes, pass the token in the `Authorization` header:
```http
Authorization: Bearer <your_token>
```

---

## Technologies Used
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JWT-based authentication**
- **Zod** for request validation

---
