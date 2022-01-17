import express from 'express';
import http from 'http';
import { Server } from 'socket.io'
import cors from 'cors'
import { router as authRoutes } from './routes/auth';
import { router as messagesRoutes } from './routes/messages'
import { router as userRoutes } from './routes/user'
import * as messagesController from './controllers/messages'
import { Message, User } from '@prisma/client';

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});
const port = 9000;
const corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/messageThreads', messagesRoutes)

io.on('connection', (socket) => {

    console.log('New client connected')

    socket.on('chat message', async (message: Message) => {
        const newMessage = await messagesController.addMessage(message);
        io.emit('chat message', newMessage)
    })

    socket.on('user typing', (user: User) => {
        socket.broadcast.emit('user typing', user)
    })
})

server.listen(port, () => console.log(`Server is listening at: http://localhost:${port}`))
