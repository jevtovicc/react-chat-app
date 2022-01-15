import express from 'express';
import http from 'http';
import { Server } from 'socket.io'
import cors from 'cors'
import { router as authRoutes } from './routes/auth'
import User from './models/User';
import MessageThread from './models/MessageThread';
import Message from './models/Message';

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


const user1: User = {
    firstName: 'Elon',
    lastName: 'Musk',
    username: 'Elon Musk',
    password: 'test123',
    photoUrl: 'https://www.w3schools.com/howto/img_avatar.png',
}

const user2: User = {
    firstName: 'Mark',
    lastName: 'Zuckerberg',
    username: 'Mark Zuckerberg',
    password: 'test123',
    photoUrl: 'https://www.w3schools.com/howto/img_avatar.png',
}

const user3: User = {
    firstName: 'Bill',
    lastName: 'Gates',
    username: 'Bill Gates',
    password: 'test123',
    photoUrl: 'https://www.w3schools.com/howto/img_avatar.png',
}

const messageThreads: MessageThread[] = [
    {
        threadId: 1,
        threadPhotoUrl: 'https://www.w3schools.com/howto/img_avatar.png',
        threadTitle: 'Elon Musk',
        messages: [
            {
                id: 1,
                sender: user1,
                content: "Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster."
            },
            {
                id: 2,
                sender: user3,
                content: "Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster."
            }
        ]
    },
    {
        threadId: 2,
        threadPhotoUrl: 'https://www.w3schools.com/howto/img_avatar.png',
        threadTitle: 'Bill Gates',
        messages: [
            {
                id: 21,
                sender: user3,
                content: 'Life is too short for long-term grudges'
            },
            {
                id: 31,
                sender: user3,
                content: 'Life is too short for long-term grudges'
            }
        ],
    },
    {
        threadId: 3,
        threadPhotoUrl: 'https://www.w3schools.com/howto/img_avatar.png',
        threadTitle: 'Mark Zuckerberg',
        messages: [
            {
                id: 31,
                sender: user2,
                content: 'Life is too short for long-term grudges'
            }
        ],
    },
    {
        threadId: 4,
        threadPhotoUrl: 'https://www.w3schools.com/howto/img_avatar.png',
        threadTitle: 'Giannis Antetokounmpo',
        messages: [
            {
                id: 41,
                sender: user2,
                content: 'Life is too short for long-term grudges'
            },
            {
                id: 51,
                sender: user1,
                content: 'New message'
            }
        ],
    },
]


io.on('connection', (socket) => {
    console.log('New client connected')
    // messageThreads.forEach(mt => socket.join(`Thread:${mt.threadId}`))
    // messageThreads.forEach(mt => io.to(`Thread:${mt.threadId}`).emit("user connected"))
    socket.on('message threads', () => socket.emit('message threads', messageThreads))

    socket.on('chat message', (messageThreadId: number, message: Message) => {
        messageThreads
            .find((mt) => mt.threadId === messageThreadId)
            ?.messages.push(message);
        io.emit('chat message', messageThreadId, message)
    })
})

server.listen(port, () => console.log(`Server is listening at: http://localhost:${port}`))
