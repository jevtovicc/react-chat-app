import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import socketIOClient, { Socket } from 'socket.io-client'

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
        fetchMessages: (state, _action: PayloadAction) => {
            state.socket.emit('message threads')
        }
    }
})

export const { fetchMessages } = socketSlice.actions
export default socketSlice.reducer
