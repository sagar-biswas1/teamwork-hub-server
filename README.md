# TeamHub Server

#### This is the backend server for the TeamHub project, built with Node.js and Express and Socket io. TeamHub is a collaborative platform for project management, document collaboration, and feedback collection.

## Table of Contents

- [Features](#features)
- [Tech](#technology)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Project Management**: Create, read, update, and delete projects/contents.
- **Document Collaboration**: Real-time document editing and collaboration and persistence.
- **Feedback Collection**: Submit and view feedback for documents.
- **User Authentication**: Secure user authentication and authorization.
- **Socket.IO Integration**: Real-time updates and notifications and chat feature.
- **Redis Caching**: Caching for improved performance.
- **Responsive Design**: Fully responsive and mobile-friendly design.
- **Tailwind CSS**: Aesthetic and customizable UI using Tailwind CSS.

## Tech

TeamHub uses a number of open source projects to work properly:

- [node.js]
- [Express]
- [Socket io]
- [Mongodb]
- [Redis]
- [Swagger]

## Installation

To set up the server locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sagar-biswas1/teamwork-hub-server.git
   cd teamwork-hub-server
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Create a .env file:**
   Create a .env file in the root directory and add the required environment variables. follow .env.example file
4. **Start the server**
   ```bash
   npm run dev
   ```

## Usage

    The server provides various endpoints for managing projects, documents, and user feedback. To interact with the server, you can use tools like Postman or cURL.

```bash
   curl -X GET http://localhost:4000/api/v1/health
   <!--alternatively you can use postman  -->
```

## API Endpoints

you will find full documentation of the url here
`http://localhost:4000/docs/`

## Environment Variables

```bash
  ENABLE_SWAGGER= true
  DB_CONNECTION_URL = mongodb://localhost:27017/
  DB_URL_QUERY = 'retryWrites=true&w=majority'
  DB_NAME = assignment-db
  DB_USER = xxxxx
  DB_PASS = xxxx
  JWT_SECRET= yourjwtsecret
  RADIS_PASSWORD = xxxxx
  REDIS_HOST = localhost
  REDIS_PORT = 6379
  ClIENT_SIDE_URL = http://localhost:5173
```

## Deployment

1.  **Deploying to Render**

```bash
Create a new Web Service on Render:

Go to Render.
↓
> Click on "New +" and select "Web Service".
↓
> Connect your GitHub repository.
↓
> Set the following configurations:
↓
>Build Command: npm install
↓
> Start Command: npm start
↓
> Set Environment Variables: Add the environment variables from your .env file to Render's Environment tab.
↓
> Deploy: Click "Create Web Service" to deploy.
```

## Contributing

Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.
