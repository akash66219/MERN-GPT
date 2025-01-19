# MERN-GPT

MERN-GPT is an AI assistance application integrated with an image generator. This project leverages the power of the MERN stack (MongoDB, Express, React, Node.js) along with various modern technologies to provide a comprehensive AI-based service.

## Technologies Used

- **Frontend**: React, Material UI, Redux
- **State Management**: Redux
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

  ## Hosting

- **Backend**: 
  - Hosted on AWS Lambda via API Gateway

- **Frontend**: 
  - Stored in an S3 bucket
  - Distributed through AWS CloudFront for optimized performance and low-latency access


## Features

### Frontend

- **React**: Utilizes React for building an interactive and dynamic user interface.
- **Material UI**: Implements Material UI for modern, responsive, and consistent styling.
- **Redux**: Manages application state using Redux for predictable state management and efficient data handling.

### Backend

- **Node.js**: Powered by Node.js for a scalable and efficient server-side environment.
- **Express**: Utilizes Express to handle routing and middleware functionalities.

### User Authentication

- **JWT (JSON Web Token)**: Ensures secure user authentication and authorization by implementing JWT.

### AI Assistance

- **AI Integration**: Provides AI-based assistance functionalities to the users, leveraging G4F(GPT For Free) client that simplifies interaction with
various Artificial Intelligence models, eliminating the need for an API Key or any other authorization method to access these chat completions and image generation models..

### Image Generation

- **Image Generator**: Includes a feature to generate images based on user input, using advanced image generation algorithms.

### Additional Functionalities

- **Responsive Design**: Ensures the application is fully responsive and works well across different devices and screen sizes.
- **User Management**: Features comprehensive user management functionalities including registration, login, logout etc.

## Repository Structure

- **backend/**: Contains backend code, configurations, and route handlers.
- **frontend/**: Contains frontend code, components, and styling assets.

- ## Installation

### Clone the repository
```sh
git clone https://github.com/Poseidon0070/MERN-GPT
```

### Install dependencies for both frontend and backend

- cd ./backend
- npm install
- cd ./frontend
- npm install

### Start the development server

- cd ./backend
- npm run dev
- cd ./frontend
- npm run dev
