# Ekomi Group Test Project

## Project Overview
This project is a backend API service for Ekomi Group, which provides functionality to manage user contacts, authenticate users, and connect to a MySQL database. The project uses Node.js with the Express framework and MySQL for the database.

The project is containerized using Docker and managed with Docker Compose. This README covers the setup and deployment of the application, including the necessary steps to build and run the Docker containers.

## Development Challenges
During the development process, one significant challenge was encountered with the frontend implementation:

The UI development required more time than anticipated due to working with raw HTML and CSS. As a developer more experienced with modern frameworks like React and Vue.js, building the interface with vanilla HTML/CSS was less efficient. This impacted the development timeline as more time was spent on basic UI implementation rather than focusing on the core functionality and API integrations.

## Features
- Contact Management: The backend manages user contacts, authenticating users with JSON Web Tokens (JWT)
- Environment Setup: The application is configurable via an .env file for flexible environment-specific settings
- Database Integration: MySQL is used as the database for storing data, and the connection details are managed using environment variables
- Dockerization: Both the backend API and the MySQL database are containerized with Docker and managed through Docker Compose

## Project Structure
```bash
/ekomi_group_test
|
|__ClientSide #Have The Html and CSS files for the UI which has login.html, signup.html, and home.html
│
├── /node_modules           # Node.js dependencies
├── /docker-compose.yml     # Docker Compose configuration for services
├── /Dockerfile            # Dockerfile for API backend service
├── /package.json          # Node.js project dependencies and scripts
├── /server.js             # Entry point for the backend API service
├── /.env                  # Environment variables configuration
└── /README.md             # Project documentation (this file)
```

## Installation
Follow these steps to set up and run the project locally or in a Dockerized environment.

### 1. Clone the Repository
Clone the project to your local machine:
```bash
git clone https://github.com/yourusername/ekomi_group_test.git
cd ekomi_group_test
```

### 2. Configure the .env File
Create a .env file in the root of your project directory and add the following environment variables:
```dotenv
DB_HOST=db
DB_USER=root
DB_PASSWORD=Clinpride@2001
DB_NAME=my_database
DB_PORT=3306
PORT=8080
JWT_SECRET=ekomi_group_test
```

### 3. Install Dependencies
Run the following command to install the Node.js dependencies:
```bash
npm install
```

## Docker Setup
This project uses Docker and Docker Compose to containerize the API backend and the MySQL database.

### 1. Build the Docker Containers
First, you need to build the Docker images using Docker Compose:
```bash
docker-compose build
```

### 2. Start the Docker Containers
Once the images are built, you can start both the backend API and the MySQL database:
```bash
docker-compose up
```
This will start the API backend service at http://localhost:8080 and the MySQL database service at localhost:3306.

### 3. Stopping the Containers
To stop and remove the running containers, run the following command:
```bash
docker-compose down
```

## Docker Configuration

### Dockerfile
The Dockerfile is used to create a custom image for the API backend service. Here's the content:
```dockerfile
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
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  # API backend service
  api:
    build: .
    container_name: ekomi_api
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=db
      - DB_USER=root
      - DB_PASSWORD=Clinpride@2001
      - DB_NAME=my_database
      - DB_PORT=3306
      - PORT=8080
      - JWT_SECRET=ekomi_group_test
    depends_on:
      - db
    networks:
      - ecomi_network

  # MySQL database service
  db:
    image: mysql:5.7
    container_name: ekomi_db
    environment:
      MYSQL_ROOT_PASSWORD: Clinpride@2001
      MYSQL_DATABASE: my_database
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - ecomi_network

# Define network and volumes
networks:
  ecomi_network:
    driver: bridge

volumes:
  mysql_data:
```

## API Endpoints
Once the application is running, you can interact with the API at http://localhost:8080. The API currently has the following functionality:

- POST /login: User login (requires credentials)
- GET /contacts: Retrieve user contact details
- POST /contacts: Add a new contact
- PUT /contacts/:id: Update a contact
- DELETE /contacts/:id: Delete a contact

Ensure that the .env file is set up with correct database credentials to enable smooth communication between the API and MySQL database.

## Future Improvements
Based on the challenges faced during development, consider the following improvements for future iterations:

1. Migrate the frontend to a modern framework like React or Vue.js to improve development efficiency and maintainability
2. Implement component-based architecture for better code organization and reusability
3. Add a build system for frontend assets
4. Consider implementing a state management solution for better data handling
