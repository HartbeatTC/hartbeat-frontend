# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install
# Copy the rest of your application code to the container
COPY . .

# Build your React/Vite application (modify as needed based on your project setup)
RUN npm run build

# Expose the port your application will listen on (replace with your app's port)
EXPOSE 5173

# Define the command to start your application
CMD ["npm", "start"]
# CMD [ "serve", "-s", "build" ]
