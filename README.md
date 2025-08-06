# LearnLoom
### AI-powered learning path creator that generates personalized study roadmaps using Gemini AI.

## Project Idea

LearnLoom helps users create structured learning paths for any skill or topic using AI. Users input their learning goals, skill level, and timeline, and the AI generates a comprehensive step-by-step learning roadmap with resources, time estimates, and progress tracking capabilities.

### Initial Backend Setup with Express and MongoDB

- Set up the backend using **Express.js** and **MongoDB**.
- Created a `config/database.js` file for MongoDB connection using `mongoose`.
- Added `cors`, `dotenv`, and `express.json()` middleware setup.
- Verified basic server functionality with a `/test` route.
- Initialized project files including `.gitignore`, `package.json`, and `package-lock.json`.

### Implemented User Authentication (Register and Login)

- Created a **User model** (`user.js`) with fields: `name`, `email`, and `password`.
- Added **authentication controller** (`authController.js`) with:
  - `register` endpoint for user sign-up
    - Validates inputs
    - Hashes password with `bcryptjs`
    - Stores user in MongoDB
    - Returns a signed **JWT token**
  - `login` endpoint for user sign-in
    - Validates credentials
    - Compares password
    - Returns a signed **JWT token** with user data
- Created **routes** for authentication (`authRoutes.js`)
  - POST `/auth/register`
  - POST `/auth/login`
- Connected authentication routes to the main `index.js` server file.
- Installed dependencies: `bcryptjs`, `jsonwebtoken`, `mongoose`.

