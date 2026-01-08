# 🔐 Next.js Authentication Portfolio Project

A professional and secure **Next.js** application demonstrating advanced authentication patterns, server-side route protection, and modern frontend architecture.

---

## 🚀 Overview

This project serves as a comprehensive example of implementing a robust authentication system using the **Next.js App Router**. It demonstrates best practices for security, scalability, and clean architecture in modern React applications.

Key goals of the project:

- Secure authentication flow
- Server-side route protection
- Clean separation of concerns
- Production-ready structure

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **State Management**: React Context API
- **UI Components**: Radix UI
- **Testing**: Vitest & React Testing Library

---

## 🔐 Authentication & Security Architecture

The application implements a **multi-layered security model** to ensure both frontend and backend protection.

### 1️⃣ Server-Side Protection (Middleware)

Requests are intercepted at the edge using `middleware.js`.

- **Protected Routes**: `/dashboard/*`
- **Protected API Routes**: `/api/users/*`
- **Behavior**:
  - Verifies presence of a secure session cookie
  - Redirects unauthenticated users to `/login`
  - Prevents unauthorized data exposure

### 2️⃣ Secure API Authentication

The `/api/login` endpoint handles authentication securely:

- Server-side credential validation
- Credentials stored only in environment variables
- Secure session cookie configuration:
  - `httpOnly`
  - `sameSite: "lax"`

This approach mitigates XSS and CSRF attack vectors.

### 3️⃣ Frontend Authentication State

Authentication state is managed via a custom `AuthContext`:

- Global `isLoggedIn` state
- Sync with `localStorage` for persistence
- Enables conditional rendering of protected UI elements

### 4️⃣ Environment Safety

- Sensitive credentials are stored in `.env.local`
- No secrets are exposed to the client bundle

---

## 📁 Project Structure

```text
src/app/
├── api/             # Secure API routes (login, users)
├── context/         # AuthContext (global auth state)
├── dashboard/       # Protected dashboard area
├── components/      # Reusable UI components
├── middleware.js    # Edge-level route protection
└── layout.jsx       # Global providers & layout
```

---

## 🧪 Testing

The project includes a full testing setup using **Vitest**:

- **Unit Tests** – components and utilities
- **Integration Tests** – authentication flows

Run tests with:

```bash
npm test
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone <repository-url>
cd project-name
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env.local` file:

```env
login=your_admin_login
password=your_secure_password
```

### 4️⃣ Run the development server

```bash
npm run dev
```

Open your browser at:

👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🚀 Deployment

The project is fully compatible with **Vercel**.

To deploy:

1. Push the repository to GitHub
2. Import the project into Vercel
3. Configure environment variables in the Vercel dashboard

📖 More info: [https://nextjs.org/docs/app/building-your-application/deploying](https://nextjs.org/docs/app/building-your-application/deploying)

---

## 📌 Purpose

This repository is designed as a **portfolio-grade example** showcasing:

- Secure authentication patterns
- Real-world Next.js App Router usage
- Clean and scalable project structure

Perfect for demonstrating production-ready frontend and fullstack skills.
