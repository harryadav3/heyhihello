import express from 'express';
import path from 'path'
import dotenv from 'dotenv';
// import { initSocket } from './utils/socketUtils';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import chatRoutes from './routes/chatRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,  'public', 'index.html'));
});


// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);

// const server = app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
//   initSocket(server);
// });


export  default app ;