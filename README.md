<!-- # capstone-parking-ops

## TODO

- Finish user-credential services
- Controller methods looking by field requires handling for 404 not found status.
- static lookups
  - state codes
  - color codes
- POST, PATCH, and PUTs for all data concerns (only reading now)
- DELETE /api/users/:user_id fails due to foreign key constraint - history tables are linked with primary key of affecting tables. REQUIRES database modification -->
# Parking Operations Management System (POMS)

## Overview

The Parking Operations Management System (POMS) is a full-stack web application designed to streamline parking management operations. The system provides tools for managing users, permits, vehicles, citations, appeals, and authorization while maintaining secure access through role-based permissions.

The application is designed to support campus parking operations by replacing manual processes with a centralized digital platform that improves efficiency, data organization, and accountability.

## Features

### User Management

- Create, retrieve, update, and manage user accounts
- Store and manage user roles and permissions
- Support multiple authorization levels including:
  - System Administrator
  - Administrator
  - Officer

### Authentication and Authorization

- Secure user authentication using JSON Web Tokens (JWT)
- Password hashing using bcrypt
- Protected API endpoints requiring authentication
- Role-based access control (RBAC) middleware
- User permissions enforced through backend authorization checks

### Parking Management

- Manage parking permits
- Associate permits with registered vehicles
- Track vehicle information
- Maintain citation records
- Support citation appeals and status tracking

### Database Management

- Relational database design using MySQL
- Lookup tables for standardized data management
- Foreign key relationships for maintaining data integrity
- Structured separation of users, credentials, permissions, and operational records

## Technology Stack

### Frontend

- React
- TypeScript
- React Router
- Axios
- HTML
- CSS

### Backend

- Node.js
- Express
- TypeScript
- REST API architecture
- JWT authentication
- bcrypt password hashing

### Database

- MySQL
- MySQL Workbench

### Development Tools

- Visual Studio Code
- Git
- Postman
- Nodemon
- npm

## System Architecture

The application uses a separated frontend and backend architecture.

The frontend is responsible for:

- User interface rendering
- Client-side routing
- User interaction
- Sending API requests

The backend is responsible for:

- Business logic
- Authentication
- Authorization
- Database communication
- API endpoint management

The database stores application data and maintains relationships between users, permits, vehicles, citations, and supporting lookup tables.

## Project Structure

TODO: Project Structure

## API Authentication

Authenticated API requests require a valid JWT token.

Requests must include the following header:

```
Authorization: Bearer <token>
```


The API validates the token through authentication middleware before allowing access to protected routes.

## Database Design

The database uses a relational structure designed around maintaining accurate and consistent parking records.

Primary entities include:

- Users
- User Credentials
- Roles
- Permits
- Vehicles
- Citations
- Appeals
- Lookup Code Tables

Lookup tables are used to reduce duplicated data and maintain consistent values throughout the system.

<!-- ## Installation

### Prerequisites

The following software is required:

- Node.js
- npm
- MySQL Server
- MySQL Workbench

### Clone Repository
```
git clone <repository-url>
``` -->
