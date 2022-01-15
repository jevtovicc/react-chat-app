import express from 'express';
import http from 'http';
import { Server } from 'socket.io'
import cors from 'cors'
import { router as authRoutes } from './routes/auth'

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

interface Message {
    id: number,
    sender: string
    content: string,
    photoSrc: string,
}

interface MessageThread {
    threadId: number,
    threadPhotoSrc: string
    threadTitle: string,
    messages: Message[]
}

const messageThreads: MessageThread[] = [
    {
        threadId: 1,
        threadPhotoSrc: 'https://www.w3schools.com/howto/img_avatar.png',
        threadTitle: 'Elon Musk',
        messages: [
            {
                id: 1,
                sender: 'Elon Musk',
                photoSrc: 'https://www.w3schools.com/howto/img_avatar.png',
                content: "Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster."
            },
            {
                id: 2,
                sender: 'Bill Gates',
                photoSrc: 'https://www.w3schools.com/howto/img_avatar.png',
                content: "Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster."
            }
        ]
    },
    {
        threadId: 2,
        threadPhotoSrc: 'https://www.w3schools.com/howto/img_avatar.png',
        threadTitle: 'Bill Gates',
        messages: [
            {
                id: 21,
                sender: 'Bill Gates',
                photoSrc: 'https://www.w3schools.com/howto/img_avatar.png',
                content: 'Life is too short for long-term grudges'
            },
            {
                id: 31,
                sender: 'Bill Gates',
                photoSrc: 'https://www.w3schools.com/howto/img_avatar.png',
                content: 'Life is too short for long-term grudges'
            }
        ],
    },
    {
        threadId: 3,
        threadPhotoSrc: 'https://www.w3schools.com/howto/img_avatar.png',
        threadTitle: 'Mark Zuckerberg',
        messages: [
            {
                id: 31,
                sender: 'Bill Gates',
                photoSrc: 'https://www.w3schools.com/howto/img_avatar.png',
                content: 'Life is too short for long-term grudges'
            }
        ],
    },
    {
        threadId: 4,
        threadPhotoSrc: 'https://www.w3schools.com/howto/img_avatar.png',
        threadTitle: 'Giannis Antetokounmpo',
        messages: [
            {
                id: 41,
                sender: 'Bill Gates',
                photoSrc: 'https://www.w3schools.com/howto/img_avatar.png',
                content: 'Life is too short for long-term grudges'
            },
            {
                id: 51,
                sender: 'Bill Gates',
                photoSrc: 'https://www.w3schools.com/howto/img_avatar.png',
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
})

server.listen(port, () => console.log(`Server is listening at: http://localhost:${port}`))
