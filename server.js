const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const initializeSockets = require('./sockets');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const Sentry = require('@sentry/node');
const { ProfilingIntegration } = require('@sentry/profiling-node');
const app = express();
const server = http.createServer(app);

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {});

Sentry.init({
  dsn: 'https://c0dbf20d149da4a761f7e206f24b7554@o1363835.ingest.sentry.io/4506513494048768',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(
  cors({
    origin: [
      'http://localhost:19006',
      'https://soft-kataifi-4add35.netlify.app',
      'https://quiz-arena1.netlify.app',
      'http://localhost:3000',
      'https://lucky-taiyaki-f522c5.netlify.app',
      'https://quiz-arena-admin.netlify.app/',
      '*',
    ],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use(routes);

app.use(Sentry.Handlers.errorHandler());

const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

initializeSockets(server, {
  cors: {
    origin: 'http://localhost:19006',
    credentials: true,
  },
});
