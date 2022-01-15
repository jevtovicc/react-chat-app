import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import socketIOClient, { Socket } from 'socket.io-client'
import { Message } from '../../types/types';

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
            state.socket.emit('chat message', action.payload)
        }
    }
})

export const { sendMessage } = socketSlice.actions
export default socketSlice.reducer
