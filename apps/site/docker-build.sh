#!/bin/bash

# Build the Docker image
echo "Building Docker image..."
docker build -t slopify-frontend .

# Run the container
echo "Starting container..."
docker run -p 3000:3000 slopify-frontend 