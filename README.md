# Backend Contact Management API

A RESTful API built using Node.js, Express.js, MongoDB, and JWT authentication.

---

# Project Structure

```plaintext
project-root/
│
├── .vscode/
├── config/
│   └── dbConnection.js
│
├── controllers/
│   ├── contactController.js
│   └── userController.js
│
├── middleware/
│   ├── errorHandler.js
│   └── validTokenHandler.js
│
├── models/
│   ├── contactModel.js
│   └── userModel.js
│
├── node_modules/
│
├── routes/
│   ├── contactRoutes.js
│   └── userRoutes.js
│
├── .env
├── .gitignore
├── constants.js
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

---

# Folder & File Purpose

## `config/`
Contains application configuration files.

### `dbConnection.js`
Responsible for connecting the application to MongoDB.

Functions:
- Read database URL from `.env`
- Establish MongoDB connection

Used by:
```
server.js → dbConnection.js → MongoDB
```

---

## `controllers/`
Contains application business logic.

Controllers:
- Receive request data
- Process logic
- Interact with database
- Return response

### `contactController.js`
Handles contact operations.

Responsibilities:
- Get contacts
- Get single contact
- Create contact
- Update contact
- Delete contact

Flow:
```
Route → Controller → Model
```

### `userController.js`
Handles user operations.

Responsibilities:
- Register user
- Login user
- Generate JWT token
- Return current user

Flow:
```
Route → Controller → Model
```

---

## `middleware/`
Contains reusable request-processing functions.

Middleware runs before controllers.

### `errorHandler.js`
Centralizes error handling.

Responsibilities:
- Catch application errors
- Return formatted error responses

Flow:
```
Controller → Error Handler → Response
```

### `validTokenHandler.js`
Handles JWT authentication.

Responsibilities:
- Verify access token
- Attach authenticated user to request

Example:
```js
req.user
```

Flow:
```
Request
↓
Token Validation
↓
Controller
```

---

## `models/`
Defines MongoDB data schemas.

Models:
- Define document structure
- Communicate with database

### `contactModel.js`
Stores contact information.

Example fields:
```js
user_id
name
email
phone
```

Used by:
```
contactController.js
```

---

### `userModel.js`
Stores user information.

Example fields:
```js
username
email
password
```

Used by:
```
userController.js
```

---

## `node_modules/`
Stores installed packages.

Examples:
- Express
- Mongoose
- Dotenv
- JWT
- Bcrypt

Generated automatically using:

```bash
npm install
```

Do not modify manually.

---

## `routes/`
Defines API endpoints.

Routes:
- Receive URL requests
- Call matching controller functions

### `contactRoutes.js`

Example:
```js
GET /api/contacts
POST /api/contacts
```

Flow:
```
Request → Route → Controller
```

---

### `userRoutes.js`

Example:
```js
POST /api/users/register
POST /api/users/login
```

Flow:
```
Request → Route → Controller
```

---

## `.env`
Stores environment variables.

Example:

```env
PORT=5000
CONNECTION_STRING=
ACCESS_TOKEN_SECRET=
```

Access using:

```js
process.env.PORT
```

Do not upload to GitHub.

---

## `.gitignore`
Defines files Git should ignore.

Example:

```plaintext
node_modules/
.env
```

---

## `constants.js`
Stores reusable application constants.

Example:

```js
module.exports = {
 VALIDATION_ERROR:400
}
```

Used by:
- Controllers
- Middleware

---

## `package.json`
Contains project metadata.

Responsibilities:
- Manage dependencies
- Define scripts

Example:

```bash
npm start
npm run dev
```

---

## `package-lock.json`
Locks dependency versions.

Purpose:
- Ensure consistent installation across devices

---

## `README.md`
Project documentation.

Contains:
- Installation guide
- API usage
- Project explanation

---

## `server.js`
Main application entry point.

Responsibilities:
- Load environment variables
- Connect database
- Register middleware
- Register routes
- Start server

Flow:

```plaintext
Client
 ↓
server.js
 ↓
Routes
 ↓
Middleware
 ↓
Controllers
 ↓
Models
 ↓
MongoDB
 ↓
Response
```

---

# Architecture Summary

```plaintext
server
 ↓
routes
 ↓
middleware
 ↓
controllers
 ↓
models
 ↓
database
```

Each layer has one responsibility:
- Routes → decide where requests go
- Middleware → validate/filter requests
- Controllers → process logic
- Models → access database
- Server → connect everything