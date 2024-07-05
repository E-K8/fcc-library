const mongoose = require('mongoose');

const uri = process.env.DB;

if (!uri) {
  console.error('Error: The DB environment variable is not set.');
  process.exit(1); // Exit the process with an error code
}

const db = mongoose.connect(uri);

module.exports = db;
