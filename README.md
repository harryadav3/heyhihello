# HeyHiHello 😃😃 - Chat Application

This is a real-time chat application built with modern technologies like TypeScript, Zustand, TailwindCSS, and Shadcn UI on the frontend, and Express, Node.js, MongoDB, and Socket.IO on the backend. Additionally, it integrates with the Google Generative AI (Gemini) for intelligent conversation responses.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Setup and Run Instructions](#setup-and-run-instructions)
  - [Prerequisites](#prerequisites)
  - [Server Setup](#server-setup)
  - [Client Setup](#client-setup)
- [API Routes](#api-routes)
- [API Usage Examples](#api-usage-examples)
- [Database Models](#database-models)
- [Language Model Integration](#language-model-integration)
- [Socket.IO Integration](#socketio-integration)
- [Dependencies](#dependencies)
  - [Server Dependencies](#server-dependencies)
  - [Client Dependencies](#client-dependencies)

## Tech Stack

#### Frontend

- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn.ui](https://github.com/shadcn/ui)

#### Backend

- [Express](https://expressjs.com/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Socket.IO](https://socket.io/)
- [Google Generative AI (Gemini)](https://cloud.google.com/generative-ai)

## Setup and Run Instructions

### Prerequisites

- Node.js (version 14 or later)
- MongoDB (version 4 or later)
- Google Cloud Platform Account (for Gemini API Key)

### Server Setup

1. Clone the repository:

```
git clone https://github.com/your-repo/heyhi-hello.git
```

2. Navigate to the server directory and install dependencies:

```
cd heyhi-hello/server
npm install
```

3. **Create a `.env` file in the server directory and add the following variables:**

```
MONGODB_URI=<your_mongodb_uri>
PORT=<server_port>
SECRET_KEY=<your_secret_key>
JWT_SECRET=<your_jwt_secret>
GEMINI_API_KEY=<your_gemini_api_key>
```

4. Start the server:

```
npm run dev
```

### Client Setup

1. Navigate to the client directory and install dependencies:

```
cd ../client
npm install
```

2. **Start the development server:**

```
npm run dev
```

### API Routes

Here's a table of all the API routes and their corresponding HTTP methods:

| Route                             | HTTP Method | Description                            |
| --------------------------------- | ----------- | -------------------------------------- |
| `/api/auth/signup`                | POST        | Register a new user                    |
| `/api/auth/login`                 | POST        | Login and get JWT token                |
| `/api/users/search`               | GET         | Search for users                       |
| `/api/users/:userId/friends`      | PUT         | Add a friend                           |
| `/api/users/:userId/status`       | PUT         | Update user status                     |
| `/api/chats/:userId`              | GET         | Get messages for a user                |
| `/api/chats`                      | POST        | Send a message                         |

### API Usage Examples

#### Register a new user

```
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login and get the JWT token

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Copy the JWT token from the response.

#### Search for users (include the JWT token in the Authorization header)

```
GET /api/users/search?search=john
Authorization: Bearer <JWT_TOKEN>
```

#### Add a friend (include the JWT token in the Authorization header)

```
PUT /api/users/:userId/friends
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "friendId": "<FRIEND_USER_ID>"
}
```

#### Update user status (include the JWT token in the Authorization header)

```
PUT /api/users/:userId/status
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "status": "BUSY"
}
```

#### Get messages for a user (include the JWT token in the Authorization header)

```
GET /api/chats/:userId
Authorization: Bearer <JWT_TOKEN>
```

#### Send a message (include the JWT token in the Authorization header)

```
POST /api/chats
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "sender": "<SENDER_USER_ID>",
  "receiver": "<RECEIVER_USER_ID>",
  "content": "Hello, how are you?"
}
```
## Database Models


The `Message` model stores message data, including the sender's and receiver's user IDs, the message content, and a timestamp.
## Language Model Integration

The application integrates with the Google Generative AI (Gemini) for intelligent conversation responses. When a user with the "BUSY" status receives a message, the application generates a response using the Gemini language model and sends it back to the sender.

The integration is handled in the `utils/languageModel.ts` file:
Sure, I'll explain the models and language model integration in a more descriptive way.

## Database Models

### User Model

The User model represents a user in the application. It stores the following information:

- **Name**: The user's name (required).
- **Email**: The user's email address (required and unique).
- **Password**: The user's password (hashed and salted, not stored in plain text).
- **Friends**: An array of user IDs representing the user's friends.
- **Status**: The user's current status, which can be either "AVAILABLE" or "BUSY" (default is "AVAILABLE").

### Message Model

The Message model represents a chat message sent between users. It stores the following information:

- **Sender**: The user ID of the user who sent the message (required).
- **Receiver**: The user ID of the user who received the message (required).
- **Content**: The content of the message (required).
- **Timestamp**: The date and time when the message was sent (defaults to the current time).

## Language Model Integration

The application integrates with the Google Generative AI (Gemini) to provide intelligent conversation responses. When a user with the "BUSY" status receives a message, the application generates a response using the Gemini language model and sends it back to the sender.

The language model integration is handled in the `utils/languageModel.ts` file. Here's a brief overview of how it works:

1. The application imports the necessary classes and modules from the `@google/generative-ai` package.
2. It creates an instance of the `GoogleGenerativeAI` class, using the Gemini API key from the environment variables.
3. The `generateText` function is defined, which takes a message string as input.
4. Inside the `generateText` function, the application gets a reference to the Gemini language model using the `getGenerativeModel` method.
5. It starts a new chat session with the language model, providing safety settings, chat history, and generation configuration (e.g., maximum output tokens, temperature, top-p, and top-k values).
6. The input message is sent to the language model using the `sendMessage` method.
7. The response from the language model is retrieved and returned as the generated text.

This generated text is then used as the response message when a user with the "BUSY" status receives a message from another user.

The language model integration allows the application to provide more natural and context-aware responses, enhancing the overall user experience of the chat application.