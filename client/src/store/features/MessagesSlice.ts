import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, MessageThread } from "../../types/types";

// Define a type for the slice state
interface MessagesState {
    messageThreads: MessageThread[];
}

// Define the initial state using that type
const initialState: MessagesState = {
    messageThreads: [],
};

type NewMessage = {
    messageThreadId: number;
    message: Message;
};

export const messagesSlice = createSlice({
    name: "messages",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {

        setMessageThreads: (state, action: PayloadAction<MessageThread[]>) => {
            state.messageThreads = action.payload;
        },

        addMessage: (state, action: PayloadAction<NewMessage>) => {
            state.messageThreads
                .find((mt) => mt.threadId === action.payload.messageThreadId)
                ?.messages.push(action.payload.message);
        },
    },
});

export const { setMessageThreads, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
