# LearnLoom
### AI-powered learning path creator that generates personalized study roadmaps using Gemini AI.

## Project Idea

LearnLoom helps users create structured learning paths for any skill or topic using AI. Users input their learning goals, skill level, and timeline, and the AI generates a comprehensive step-by-step learning roadmap with resources, time estimates, and progress tracking capabilities.

## Initial Backend Setup with Express and MongoDB

- Set up the backend using **Express.js** and **MongoDB**.
- Created a `config/database.js` file for MongoDB connection using `mongoose`.
- Added `cors`, `dotenv`, and `express.json()` middleware setup.
- Verified basic server functionality with a `/test` route.
- Initialized project files including `.gitignore`, `package.json`, and `package-lock.json`.

## Implemented User Authentication (Register and Login)

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

## Protected Routes + Core API Implementation

### JWT Authentication Middleware
- Created `authMiddleware.js` to verify JWT tokens, validate Bearer tokens, and extract user info.
- Added error handling for invalid, expired, or missing tokens.
- All protected routes require valid authentication.

### Enhanced User Model & Profile Management
- Extended User model with additional fields:
  - `profilePicture`: Optional profile image URL
  - `learningGoals`: Array of user's learning objectives
  - `totalLearningPaths`: Counter for created learning paths
  - `completedLearningPaths`: Counter for completed paths
  - `isActive`: Account status flag
- Implemented full User Profile CRUD operations:
  - `GET /user/profile` – Fetch user profile
  - `PUT /user/profile` – Update profile information
  - `PUT /user/password` – Change password with current password verification
  - `DELETE /user/account` – Delete account with password confirmation

### Learning Paths Core Entity
- Defined Learning Path model with:
  - `userId`: Reference to the user who created the path
  - `title`, `description`, `difficulty`, `estimatedDuration`
  - `steps`: Array of learning steps with details and completion tracking
- Auto-calculated fields for progress:
  - `totalSteps`, `completedSteps`, `progressPercentage`, `isCompleted`

### Learning Path CRUD Operations
- `POST /learningPaths/` – Create new learning paths with validation
- `GET /learningPaths/` – Fetch all user's learning paths, sorted by creation date
- `GET /learningPaths/:id` – Fetch specific learning path by ID (user-restricted)
- `PUT /learningPaths/:id` – Update learning path and steps; auto-update progress
- `DELETE /learningPaths/:id` – Delete learning path (user-restricted)

### Security and Validation
- All learning path routes protected with JWT authentication middleware
- Users can only access and modify their own learning paths
- Input validation and sanitization applied on all endpoints
- Comprehensive error handling with appropriate HTTP status codes