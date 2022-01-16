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

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        sendMessage: (state, action: PayloadAction<Message>) => {
            const message = {
                messageThreadId: action.payload.messageThreadId,
                content: action.payload.content,
                userId: action.payload.user.id
            }
            state.socket.emit('chat message', message)
        },
        userTyped: (state, action: PayloadAction<User>) => {
            state.socket.emit('user typing', action.payload)
        }
    }
})

export const { sendMessage, userTyped } = socketSlice.actions
export default socketSlice.reducer
