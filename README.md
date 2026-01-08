Projet-PFA
=======
# FixMyCity
Projet-PFA

## Environment Variables

Create a `.env` file in the root directory with the following variables:

- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation (required)
- `PORT`: Server port (default: 5000)

Copy `.env.example` to `.env` and fill in your values.

## Installation

1. Install dependencies: `npm install`
2. Set up your `.env` file
3. Start the server: `npm start`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user (returns JWT token)
- `POST /api/auth/login` - Login user (returns JWT token)
