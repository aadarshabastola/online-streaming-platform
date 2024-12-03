require('dotenv').config();
const app = require('./app');
const knex = require('../db/knex');

const PORT = process.env.PORT || 8080;

// Handle uncaught exceptions
process.on('uncaughtException', async (error) => {
  console.error('Uncaught Exception:', error);
  await knex.destroy();
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', async (error) => {
  console.error('Unhandled Rejection:', error);
  await knex.destroy();
  process.exit(1);
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(async () => {
    console.log('Closing database connection...');
    await knex.destroy();
    console.log('Process terminated.');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(async () => {
    console.log('Closing database connection...');
    await knex.destroy();
    console.log('Process terminated.');
    process.exit(0);
  });
});