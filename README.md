# Full Stack e-commerce - Web

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/heliomar-pena/fullstack-ecommerce-frontend/tree/dev.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/heliomar-pena/fullstack-ecommerce-frontend/tree/dev)

This project is the FrontEnd of a E-Commerce app built with React, and Shadcn as component's library. The focus is to provide simple a interface to interact with the backend, display how roles authentication works with protected routes and how the UI React's to server sent events in real-time.

[Go to BackEnd's repository](https://github.com/heliomar-pena/fullstack-ecommerce-backend)

## Public Links

- [FrontEnd](https://fullstack-ecommerce-frontend-2cad384b2bd8.herokuapp.com/auth/login)
- [Documentation (Swagger)](https://full-stack-ecommerce-9b782554ef40.herokuapp.com/api#/)

## Table of Content

- [Full Stack e-commerce - Web](#full-stack-e-commerce---web)
  - [Public Links](#public-links)
  - [Table of Content](#table-of-content)
  - [Features](#features)
    - [Authentication](#authentication)
    - [Authorization (Roles)](#authorization-roles)
    - [Form Validation](#form-validation)
    - [API Integration](#api-integration)
    - [Navigation \& Routing](#navigation--routing)
    - [Real-Time Features (SSE)](#real-time-features-sse)
  - [Technology Stack](#technology-stack)
  - [Pre-requisites to run the project](#pre-requisites-to-run-the-project)
  - [How to run the project](#how-to-run-the-project)
  - [Areas to improve](#areas-to-improve)
  - [Decisions made](#decisions-made)
  - [Env Vars](#env-vars)

## Features

### Authentication

- Authentication implemented with JWT
- User is logged out when token is expired
- User can create an account or sign in to existing account

### Authorization (Roles)

- Role-Based Access Control (RBAC) - Customer, Merchant, Admin roles
- Routes are protected and are conditionally displayed on the UI when the user have role defined
- Protected routes with automatic redirects
- Token expiration handling with auto-logout

### Form Validation

- Email and password validation
- Required field checks
- Type-specific attribute validation
- Real-time validation feedback
- Schema-based validation with Zod

### API Integration

- Axios HTTP client with interceptors for displaying toast notifications conditionally when a request fails
- Auto-inject JWT tokens
- Error handling with toast notifications
- Environment-based API configuration
- Type-safe API clients
- Used Tanstack Query (React Query) for caching
- Separated requests logic from component's logic to keep component's simple

### Navigation & Routing

- React Router v7 with lazy loading
- Protected route decorators
- Role-based navigation menu
- Auto-redirects on auth changes
- Sidebar with dynamic menu items

### Real-Time Features (SSE)

- Server-Sent Events for instant notifications.
- When the role of the user changes, the UI updates instantly to reflect the changes needed, hiding and displaying the sections that the user now have access.
- Toast notifications when product is completely delete.
- Event type routing and handling using strategy pattern.

## Technology Stack

- Framework: React 19
- Components Library: ShadCN
- CSS Framework: TailwindCSS 4
- Validations library: Zod 4
- Formulary management library: React Hook Form

## Pre-requisites to run the project

1. Node 24

## How to run the project

1. Install Node 24 or if you are using nvm, use `nvm use`.
2. Install dependencies `npm i`
3. Run the project `npm run dev`

> [!NOTE]
> If you are trying to connect FE with the BE, be sure you added the URL of the FrontEnd in the CORS_ORIGIN variable in the BackEnd. Also, update VITE_API_URL with the URL of the backend if it's needed.

## Areas to improve

- Saving JWT token in local / session storage is not the safest option. This could be improved a lot by reducing the JWT expiring time to 15 mins and saving a refresh token in the cookies under httpOnly flag.
- The definition of the routes is separed in two files, sidebar-router.ts and router.ts, would be great to unify them in only one source-of-truth and then mapping the information for both, React Router and Sidebar by using a Dto.
- Folder's structure could feel a bit messed up, it could be defined a better way to organize the folders and files.
- Server-Sent Event connection could be improved by using cookies authentication instead of headers authentication, since EventSource does not supports headers natively.

## Decisions made

- Preferred SSE over WebSockets for real-time event as we needed a simple a single-way channel to send notifications from the backend to the UI without allowing the opposite (sending notifications from UI to BackEnd).
- Used React Query to have caching and handling requests to the backend with ease without too much configuration.
- Used query-layer patterns to keep request's logic out of the components and separate visual with request.

## Env Vars

1. VITE_API_URL: Fill it with the URL to the backend (without trailing slash)
