You can use tools like Postman, Insomnia, or cURL to test the API endpoints. Here are some example requests:

Register a new user:

Copy codePOST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Login and get the JWT token:

Copy codePOST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
Copy the JWT token from the response.

Search for users (include the JWT token in the Authorization header):

Copy codeGET /api/users/search?search=john
Authorization: Bearer <JWT_TOKEN>

Add a friend (include the JWT token in the Authorization header):

Copy codePUT /api/users/:userId/friends
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "friendId": "<FRIEND_USER_ID>"
}

Update user status (include the JWT token in the Authorization header):

Copy codePUT /api/users/:userId/status
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "status": "BUSY"
}

Get messages for a user (include the JWT token in the Authorization header):

Copy codeGET /api/chats/:userId
Authorization: Bearer <JWT_TOKEN>

Send a message (include the JWT token in the Authorization header):

Copy codePOST /api/chats
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "sender": "<SENDER_USER_ID>",
  "receiver": "<RECEIVER_USER_ID>",
  "content": "Hello, how are you?"
}










userNameInput.addEventListener('input', async () => {
  const name = userNameInput.value.trim();
  if (name) {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email: `${name}@example.com`, password: 'password123' }),
      });

      const { user } = await response.json();
      userId = user._id;
      socket.emit('online', userId);
    } catch (err) {
      console.error('Error registering user:', err);
    }
  }
});



export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log('New client connected');

    socket.on('message', async (data) => {
      // ... (existing code)
    });

    socket.on('online', async (userId) => {
      const user = await User.findById(userId);
      if (user) {
        user.status = 'AVAILABLE';
        await user.save();
        socket.join(user._id.toString()); // Join the room with the user's _id
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

async function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const content = messageInput.value.trim();
  if (content && userId && recipientId) {
    const message = {
      sender: userId,
      receiver: recipientId,
      content,
    };

    socket.emit('message', message);
    messageInput.value = '';

    const receiverUser = await fetchUser(recipientId);
    if (receiverUser && receiverUser.status === 'BUSY') {
      // ... (existing code)
    }
  }
}

