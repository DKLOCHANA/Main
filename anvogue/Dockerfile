# Use official Node.js image as a base
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force

RUN npm config set fetch-retries 5
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000

RUN npm install

# Copy the rest of the application
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
