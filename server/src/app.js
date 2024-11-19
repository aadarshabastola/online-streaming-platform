const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

// Initialize express app
const app = express();

// Security middleware
app.use(helmet());

// Enable CORS
app.use(cors());

// Compress responses
app.use(compression());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Add request logging in development
if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// Mount routes
app.use(routes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: "RESOURCE_NOT_FOUND",
      message: "The requested resource was not found.",
    },
  });
});

module.exports = app;
