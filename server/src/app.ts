import express from 'express';
import http from 'http';
import { Server } from 'socket.io'
import cors from 'cors'
import { router as authRoutes } from './routes/auth';
import { router as messagesRoutes } from './routes/messages'
import * as messagesController from './controllers/messages'
import { Message } from '@prisma/client';

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
app.use('/api/messageThreads', messagesRoutes)

io.on('connection', (socket) => {

    console.log('New client connected')

    socket.on('chat message', (message: Message) => {
        messagesController.addMessage(message);
        io.emit('chat message', message)
    })
})

server.listen(port, () => console.log(`Server is listening at: http://localhost:${port}`))
