import { createSlice } from '@reduxjs/toolkit'

export interface Message {
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

// Define a type for the slice state
interface MessagesState {
    messageThreads: MessageThread[]
}

// Define the initial state using that type
const initialState: MessagesState = {
    messageThreads: [
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
                }
            ],
        },
    ]
}

export const messagesSlice = createSlice({
    name: 'messages',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
    }
})

export default messagesSlice.reducer