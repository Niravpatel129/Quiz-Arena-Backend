# Build and Run Instructions

## Prerequisites

- Node.js 18 or newer
- npm
- MongoDB and any external service credentials used by the backend, such as Google Cloud Storage, Sentry, OpenAI, Expo push notifications, and Discord where configured

## Install

```bash
git clone https://github.com/Niravpatel129/Quiz-Arena-Backend.git
cd Quiz-Arena-Backend
npm install
```

Configure the required `.env` values before starting the server.

## Run in development

```bash
npm run dev
```

## Run normally

```bash
npm start
```

This project runs directly with Node.js, so there is no separate compilation step.

## Utility scripts

```bash
npm run fix-images
npm run fix-avatars
```

Use these only when you intentionally need to run the repository's data/image migration utilities.