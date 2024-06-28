# Nexu Backend Test

This project serves as a backend test for the Nexu platform, built with TypeScript and Express, and using Prisma as the ORM. The project is designed to be easy to set up and run, providing a starting point for developing backend features.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or higher)
- npm or yarn
- A PostgreSQL database

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/beltran120394/nexu-backend-test.git
   cd nexu-backend-test
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Generate Prisma client:

   ```sh
   npx prisma generate
   ```

4. Set up your environment variables by creating a `.env` file in the root directory and adding the necessary configuration:
   ```env
   DATABASE_URL="your-database-url"
   ```

### Database Setup

To seed the database with initial data:

```sh
npx prisma db seed
```

### Running the Project

To start the development server:

```sh
npm run dev
```

The server will be running on `http://localhost:3000`.

## API Endpoints

```
GET   /brands
GET   /brands/:id/models
POST  /brands
POST  /brands/:id/models
PUT   /models/:id
GET   /models
```

## Test

To run the tests:

```sh
npm run test
```

## Lint

To lint the code:

```sh
npm run lint
```

## Notes

- The project uses a PostgreSQL database, so make sure you have it installed and running.
- You need to have a database set up and configured in the `.env` file.
- The App URL is `https://nexu-backend-test-xi.vercel.app/` in production, and `http://localhost:3000` in development.

### Example in frontend

```js
fetch("https://nexu-backend-test-xi.vercel.app/brands")
  .then((response) => response.json())
  .then((data) =>
    console.log(data);
  );
```
