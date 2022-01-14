import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MessageThread } from '../../types/types'

// Define a type for the slice state
interface MessagesState {
    messageThreads: MessageThread[]
}

// Define the initial state using that type
const initialState: MessagesState = {
    messageThreads: []
}

type NewMessage = {
    messageThreadId: number,
    messageContent: string
}

export const messagesSlice = createSlice({
    name: 'messages',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setMessageThreads: (state, action: PayloadAction<MessageThread[]>) => {
            state.messageThreads = action.payload
        },
        sendMessage: (state, action: PayloadAction<NewMessage>) => {
            const message = {
                id: Math.random(),
                sender: 'Mark Zuckerberg',
                photoSrc: 'https://www.w3schools.com/howto/img_avatar.png',
                content: action.payload.messageContent
            }
            state.messageThreads.find(mt => mt.threadId === action.payload.messageThreadId)?.messages.push(message)
        }
    }
})

export const { setMessageThreads, sendMessage } = messagesSlice.actions;
export default messagesSlice.reducer
