import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import socketIOClient, { Socket } from 'socket.io-client'
import { Message, User } from '../../types/types';

// TODO: read from config file
const ENDPOINT = "http://127.0.0.1:9000";

interface SocketState {
    socket: Socket
}

const initialState: SocketState = {
    socket: socketIOClient(ENDPOINT)
}

type NewMessage = {
    messageThreadId: number,
    message: Message
}

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        fetchMessages: (state, _action: PayloadAction) => {
            state.socket.emit('message threads')
        },
        sendMessage: (state, action: PayloadAction<NewMessage>) => {
            state.socket.emit('chat message', action.payload.messageThreadId, action.payload.message)
        }
    }
})

export const { fetchMessages, sendMessage } = socketSlice.actions
export default socketSlice.reducer
