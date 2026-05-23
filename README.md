# Express Server

This project is a TypeScript-based Express server connected to a PostgreSQL database. It provides basic user CRUD APIs and automatically creates the `users` table when the server starts.

## Project Summary

The following work has been done in this project:

- Set up an Express server using TypeScript.
- Configured middleware for JSON, text, and URL-encoded request bodies.
- Added environment variable support using `dotenv`.
- Created a centralized config file in `src/config/index.ts`.
- Connected the server to PostgreSQL using the `pg` connection pool.
- Added database initialization logic to create the `users` table if it does not already exist.
- Implemented user CRUD routes:
  - Create a user
  - Get all users
  - Get one user by ID
  - Update a user by ID
  - Delete a user by ID
- Added TypeScript build output from `src` to `dist`.
- Added npm scripts for development, build, and production start.

## Tech Stack

- `Node.js`: JavaScript runtime used to run the server.
- `Express`: Web framework used for routing, middleware, and HTTP responses.
- `TypeScript`: Adds static typing and compiles the source code to JavaScript.
- `PostgreSQL`: Relational database used to store user records.
- `pg`: PostgreSQL client for Node.js.
- `dotenv`: Loads environment variables from a `.env` file.
- `tsx`: Runs TypeScript directly during development with watch mode.

## Project Structure

```txt
src/
  config/
    index.ts      # Loads environment variables and exports app config
  server.ts       # Express app, database setup, and API routes
package.json      # Dependencies and npm scripts
tsconfig.json     # TypeScript compiler configuration
```

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
CONNECTION_STRING=postgresql://username:password@localhost:5432/database_name
```

`PORT` controls the server port. If it is not provided, the server uses `5000`.

`CONNECTION_STRING` is required for connecting to PostgreSQL.

## How To Run The Project

Install dependencies:

```bash
npm install
```

Create the `.env` file and add your PostgreSQL connection string.

Run the project in development mode:

```bash
npm run dev
```

Build the TypeScript project:

```bash
npm run build
```

Start the compiled production build:

```bash
npm start
```

After the server starts, it will listen on:

```txt
http://localhost:5000
```

If you set a different `PORT`, use that port instead.

## Available Scripts

- `npm run dev`: Runs `src/server.ts` with `tsx watch`.
- `npm run build`: Compiles TypeScript files into the `dist` folder.
- `npm start`: Builds the project first, then runs `dist/server.js`.
- `npm test`: Placeholder script. Tests are not configured yet.

## API Routes

### Health Route

```http
GET /
```

Returns:

```txt
Hello World!
```

### Create User

```http
POST /api/users
```

Example body:

```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "secret123",
  "age": 25
}
```

### Get All Users

```http
GET /api/users
```

Returns all users from the database.

### Get User By ID

```http
GET /api/users/:id
```

Example:

```http
GET /api/users/1
```

Returns one user by ID or `404` if the user does not exist.

### Update User By ID

```http
PUT /api/users/:id
```

Example body:

```json
{
  "name": "John Updated",
  "age": 26
}
```

Updates the provided fields and keeps the existing values for missing fields.

### Delete User By ID

```http
DELETE /api/users/:id
```

Example:

```http
DELETE /api/users/1
```

Deletes one user by ID or returns `404` if the user does not exist.

## Database Table

The server creates this table automatically when it starts:

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  email VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR(20) NOT NULL,
  is_Active BOOLEAN DEFAULT true,
  age INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Applied Topics Explained

### Express Server

Express is used to create the HTTP server and define API routes such as `GET`, `POST`, `PUT`, and `DELETE`.

### Middleware

The server uses middleware to parse incoming request bodies:

- `express.json()` parses JSON data.
- `express.text()` parses plain text data.
- `express.urlencoded()` parses form data.

### Environment Configuration

The project uses `dotenv` to load values from `.env`. The config file exports `PORT` and `CONNECTION_STRING` so the server code does not need hard-coded database credentials.

### PostgreSQL Connection Pool

The `pg` package creates a `Pool`, which manages database connections efficiently. The server uses this pool to run SQL queries.

### Database Initialization

When the server starts, `initDB()` runs a `CREATE TABLE IF NOT EXISTS` query. This makes sure the `users` table exists before the API is used.

### CRUD Operations

CRUD means Create, Read, Update, and Delete. This project applies CRUD with the `/api/users` routes:

- `POST` creates a user.
- `GET` reads users.
- `PUT` updates a user.
- `DELETE` removes a user.

### Parameterized SQL Queries

The API uses query placeholders like `$1`, `$2`, and `$3`. Values are passed separately to make SQL queries safer and avoid direct string injection.

### TypeScript Build

Source files are written in TypeScript inside `src`. Running `npm run build` compiles them into JavaScript inside `dist`, which is then used by `npm start`.
