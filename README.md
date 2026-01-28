# Next.js Authentication Project

## Overview
A robust authentication system built with Next.js (App Router), providing secure login, registration, and server-side route protection. The application integrates with a MySQL database and adheres to modern security standards for identity management.

## Key Features
- **User Authorization**: Implemented using JSON Web Tokens (JWT) for secure session management.
- **Secure Password Hashing**: Utilizes the Argon2 algorithm to protect user credentials.
- **Route Protection**: Middleware-based security that prevents unauthorized access to protected dashboard routes.
- **Comprehensive API**: Dedicated endpoints for login, logout, registration, and user management.
- **Global State Management**: React Context (Auth Context) integration for tracking authentication status across the frontend.

## Tech Stack
- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS 4, Radix UI
- **Database**: MySQL (mysql2/promise)
- **Security**: JWT, Argon2, Zod (data validation)
- **Testing**: Vitest, React Testing Library

## Project Structure
- `src/app/api`: Backend endpoints handling authentication logic.
- `src/app/context`: Implementation of AuthContext for global session management.
- `src/app/lib`: Utility functions, database configuration, and environment variable handling.
- `src/middleware.ts`: Core security logic for intercepting and protecting sensitive routes.
- `src/app/components`: Reusable UI components.

## Environment Configuration
Required variables in the `.env` file:
- `JWT_SECRET`: Private key for token signing.
- `DB_HOST`: MySQL server address.
- `DB_USER`: Database username.
- `DB_PASSWORD`: Database password.
- `DB_DATABASE`: Target database name.
- `DB_PORT`: Database port (default 3306).
- `LOGIN` / `PASSWORD_USER`: Administrative access credentials.

## Installation and Setup
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Create production build: `npm run build`
4. Execute test suite: `npm test`
