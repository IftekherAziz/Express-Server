# Express Server Architecture and Database Integration

This project is a basic Express server built with TypeScript. So far, the server has been set up with HTTP routes, request body parsing, and a PostgreSQL database connection using the `pg` package.

## What Has Been Done So Far

- Created a TypeScript-based Express server in `src/server.ts`.
- Imported and configured Express.
- Added middleware to parse request bodies:
  - JSON request bodies
  - plain text request bodies
  - URL-encoded form request bodies
- Created a `GET /` route that returns `Hello World!`.
- Created a `POST /` route that accepts `name` and `age` from the request body and returns a JSON response.
- Added a PostgreSQL connection setup using `Pool` from the `pg` package.
- Configured TypeScript output to compile from `src` into `dist`.
- Added npm scripts for building, starting, and running the server in development mode.

## Packages Used

### Runtime Dependencies

- `express`: Web server framework used to create routes, middleware, and start the HTTP server.
- `pg`: PostgreSQL client used to create a database connection pool.

### Development Dependencies

- `typescript`: TypeScript compiler.
- `tsx`: Runs TypeScript files directly during development.
- `@types/express`: Type definitions for Express.
- `@types/pg`: Type definitions for `pg`.

## Imports Used In The Server

```ts
import express, { type Application, type Request, type Response } from 'express'
import { Pool } from 'pg'
```

## Commands Used

Install runtime packages:

```bash
npm install express pg
```

Install development packages:

```bash
npm install --save-dev typescript tsx @types/express @types/pg
```

Build the TypeScript project:

```bash
npm run build
```

Start the compiled server:

```bash
npm start
```

Run the server in development mode:

```bash
npm run dev
```

## Available Scripts

- `npm run build`: Compiles TypeScript from `src` into `dist`.
- `npm start`: Builds the project first, then runs `dist/server.js`.
- `npm run dev`: Runs `src/server.ts` directly with `tsx watch`.

## Current Routes

### `GET /`

Returns:

```txt
Hello World!
```

### `POST /`

Accepts a request body with `name` and `age`.

Example JSON body:

```json
{
  "name": "John",
  "age": 25
}
```

Example response:

```json
{
  "message": "Data received successfully",
  "data": {
    "name": "John",
    "age": 25
  }
}
```

## Database

The server currently creates a PostgreSQL connection pool using `pg`.

The database connection string should be moved into an environment variable before this project is shared or deployed, because database URLs usually contain private credentials.


