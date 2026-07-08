# Quiz Arena Backend

Quiz Arena Backend is the API and service layer for the Quiz Arena mobile trivia application. It supports quiz content, user/application workflows, media handling, scheduled jobs, real-time communication, AI-assisted features, and backend operations used by the mobile frontend.

The repository is a Node/Express backend designed for a real mobile product ecosystem.

## Core capabilities

- REST API for Quiz Arena mobile workflows
- MongoDB persistence through Mongoose
- User/application data models
- Google Cloud Storage integration
- Sentry error monitoring
- Scheduled/background job support
- OpenAI-assisted backend features
- Image processing with Sharp
- Real-time communication through Socket.io
- Authentication and protected route support

## Tech stack

- Node.js
- Express
- MongoDB
- Mongoose
- Google Cloud Storage
- Sentry
- OpenAI
- Sharp
- Socket.io
- node-schedule
- JWT/auth tooling where configured

## Repository structure

Common areas include:

- `routes/` - API route definitions
- `controllers/` - request handlers and business logic
- `models/` - Mongoose schemas
- `middleware/` - auth, validation, and request middleware
- `services/` - storage, AI, scheduling, and realtime integrations
- `utils/` - shared helpers
- `index.js` or server entry file - application bootstrap

Exact folder names may vary as the backend evolves.

## Getting started

### Prerequisites

- Node.js
- npm
- MongoDB connection string
- Google Cloud Storage credentials if media flows are tested

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Start production server

```bash
npm start
```

## Environment configuration

Create a local `.env` file. Do not commit real credentials.

Typical configuration includes:

```bash
PORT=5000
MONGODB_URI=
JWT_SECRET=
CLIENT_URL=
GOOGLE_CLOUD_PROJECT_ID=
GOOGLE_CLOUD_BUCKET=
OPENAI_API_KEY=
SENTRY_DSN=
```

Use `.env.example` for safe placeholder values.

## Development workflow

1. Install dependencies
2. Configure local environment variables
3. Start MongoDB or connect to a development database
4. Run the backend locally
5. Start the mobile app separately and point it to this API
6. Use development credentials for storage, AI, and monitoring integrations

## Code quality notes

The project demonstrates a real backend for a mobile app, including database persistence, storage integrations, scheduled jobs, image processing, real-time communication, AI integrations, and monitoring.

## Security notes

Do not commit `.env` files, API keys, service account files, database URLs, production credentials, generated logs, uploads, or cache folders.
