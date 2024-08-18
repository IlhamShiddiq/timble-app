# Timble (Tinder + Bumble) App
**Timble App** is built using **Express** and **TypeScript**, and it uses **PostgreSQL** as the database management system (DBMS).

## Installation

Follow the steps below to set up the project:

1. Clone this project repository
2. Install dependencies:

   ```bash
   npm install
   
3. Fill out the `.env` file
4. Run database migration

   ```bash
   npm run db:migrate
   
6. Run database seeder

   ```bash
   npm run db:seed
   
8. Run the server

   ```bash
   npm start


## Project Structure

The following is a breakdown of the project's directory structure:

- **`src/configs`**: This directory stores all configuration data, such as environment variables.

- **`src/controllers`**: This directory contains all the logic code, including business logic and handling of HTTP requests and responses.

- **`src/db`**: This directory stores all database-related files, including migrations and seeders.

- **`src/middleware`**: This directory holds all middleware files used to process requests before they reach the controllers, such as authentication middleware.

- **`src/repositories`**: This directory is used to store all database logic code, including data access methods and interaction with the database.

- **`src/requests`**: This directory is intended to store all request data.

- **`src/routes`**: This directory contains all route definitions, mapping HTTP endpoints to their corresponding controllers.

- **`src/utils`**: This directory is used to store utility functions, helpers, and reusable code that can be used throughout the application.

## Additional

To check the code using ESLint, run the following command

```bash
   npm run lint
