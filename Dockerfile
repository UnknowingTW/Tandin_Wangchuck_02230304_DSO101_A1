# Use Node.js LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all application files
COPY . .

# Run tests
RUN npm test

# Expose the app port
EXPOSE 3000

# Start the app using your package.json start script
CMD ["npm", "start"]