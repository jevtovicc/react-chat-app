import express from 'express';
import http from 'http';
import { Server } from 'socket.io'
import cors, { CorsOptions } from 'cors'

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});
const port = 9000;
const corsOptions: CorsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send("Hello world!");
})

io.on('connection', (socket) => {
    console.log('New user connected')
})

server.listen(port, () => console.log(`Server is listening at: http://localhost:${port}`))
