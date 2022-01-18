import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Message, MessageThread } from "../../types/types";

// Define a type for the slice state
interface MessagesState {
    status: 'loading' | 'idle',
    error: string | null,
    messageThreads: MessageThread[],
}

// Define the initial state using that type
const initialState: MessagesState = {
    status: 'idle',
    error: null,
    messageThreads: [],
};

export const messagesSlice = createSlice({
    name: "messages",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messageThreads
                .find((mt) => mt.id === action.payload.messageThreadId)
                ?.messages.push(action.payload);
        },
    },
    extraReducers: (builder) => {

        // createMessageThread
        builder.addCase(createMessageThread.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })

        builder.addCase(createMessageThread.fulfilled, (state, { payload }) => {
            state.messageThreads.push(payload);
            state.status = 'idle'
        })

        builder.addCase(createMessageThread.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload;
            }
            state.status = 'idle';
        });

        // addUserToMessageThread
        builder.addCase(addUserToMessageThread.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })

        builder.addCase(addUserToMessageThread.fulfilled, (state, { payload }) => {
            const index = state.messageThreads.findIndex(mt => mt.id === payload.id);
            state.messageThreads[index] = payload;
            state.status = 'idle'
        })

        builder.addCase(addUserToMessageThread.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload;
            }
            state.status = 'idle';
        });

    }
});

export const createMessageThread = createAsyncThunk<MessageThread, { username: string, messageThreadName: string }, { rejectValue: string }>(
    "createMessageThread",
    async ({ username, messageThreadName }, thunkApi) => {
        try {
            const response = await axios.post<MessageThread>('http://localhost:9000/api/messageThreads', {
                username: username,
                messageThreadName: messageThreadName
            });
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return thunkApi.rejectWithValue(e.response.data as string)
            } else {
                return thunkApi.rejectWithValue('Error on server side occurred')
            }
        }
    }
)

export const addUserToMessageThread = createAsyncThunk<MessageThread, { messageThreadId: number, username: string }, { rejectValue: string }>(
    "addUserToMessageThread",
    async ({ messageThreadId, username }, thunkApi) => {
        try {
            const response = await axios.post<MessageThread>(`http://localhost:9000/api/messageThreads/${messageThreadId}/addUser`, { username: username })
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return thunkApi.rejectWithValue(e.response.data as string)
            } else {
                return thunkApi.rejectWithValue('Error on server side occurred')
            }
        }
    }
)

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
