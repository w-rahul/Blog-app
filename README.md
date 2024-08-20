# Blog Platform

This is a full-stack blog platform built with modern web technologies. The backend is deployed on Cloudflare Workers using Hono.js and Accelerator for database connection pooling, with Prisma as the ORM and PostgreSQL for the database. The frontend is developed using React and Vite, styled with Tailwind CSS. Zod is used for data validation across both backend and frontend, and Wrangler is utilized for managing Cloudflare Workers.

## Table of Contents

- [Key Features](#key-features)
- [Backend](#backend)
- [Frontend](#frontend)
- [Frontend Libraries and Tools](#frontend-libraries-and-tools)
- [API Endpoints](#api-endpoints)


## Key Features

- **User Authentication:** Sign up and login functionalities.
- **Blog Management:** Users can create, read, update, and delete blogs.
- **Data Validation:** Zod is used for data schema validation.
- **Styling:** Tailwind CSS for utility-first CSS framework.
- **Deployment:** Deployed on Cloudflare Workers for scalability.

## Backend

The backend of this project is implemented using Cloudflare Workers and Hono.js, with PostgreSQL as the database. Here are some of the key technologies and libraries used:

- **Database:** PostgreSQL
- **Framework:** Hono.js for routing
- **Database Pooling:** Accelerator for efficient database connection pooling
- **ORM:** Prisma for database modeling and querying
- **Data Validation:** Zod for data schema validation
- **Deployment Tool:** Wrangler for managing Cloudflare Workers

## Frontend

The frontend of the application is developed using React.js and Vite. It consists of multiple pages to facilitate different functionalities:

- **Pages:**
  - **Signup:** User registration page
  - **Login:** User login page
  - **Blogs:** List all blogs
  - **Blog Detail:** View a specific blog by ID
  - **Create Blog:** Create a new blog
  - **Landing Page:** Main landing page

### Frontend Libraries and Tools

- **JavaScript Framework:** React.js
- **Build Tool:** Vite for fast builds and hot module replacement
- **Styling:** Tailwind CSS for utility-first CSS framework
- **Data Validation:** Zod for consistent data validation across frontend and backend


## API Endpoints

- **POST /signup** - User signup
- **POST /login** - User login
- **GET /blogs** - Get all blogs
- **GET /blog/:id** - Get a specific blog by ID
- **POST /blogs** - Create a new blog
- **DELETE /blog/:id** - Delete a blog
- **GET /** - Landing page

## Live Link 
rxhxul-blog-app.vercel.app
