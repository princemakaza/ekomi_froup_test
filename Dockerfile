# Use official Node.js image as base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application into the container
COPY . .

# Expose the application port
EXPOSE 8080

# Set environment variables
ENV DB_HOST=localhost
ENV DB_USER=root
ENV DB_PASSWORD=Clinpride@2001
ENV DB_NAME=my_database
ENV DB_PORT=3306
ENV PORT=8080
ENV JWT_SECRET=ekomi_group_test

# Start the application
CMD ["npm", "start"]
