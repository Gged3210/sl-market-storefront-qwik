#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Starting the build process..."

# Run the build command
npm run build

echo "Build completed successfully."

# Start the application with pm2
echo "Starting the application with pm2..."
pm2 start npm --name "FE" -- start

echo "Application started with pm2."

