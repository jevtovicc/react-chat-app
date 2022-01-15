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
        builder.addCase(fetchMessageThreads.pending, (state) => {
            state.status = 'loading';
            state.error = null
        });

        builder.addCase(fetchMessageThreads.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.messageThreads = payload
            state.status = 'idle'
        });

        builder.addCase(fetchMessageThreads.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload;
                state.error = 'Some error that should not occurr'
            }
            state.status = 'idle';
        })
    }
});

export const fetchMessageThreads = createAsyncThunk<MessageThread[], {}, { rejectValue: string }>(
    "fetchMessageThreads",
    async ({ }, thunkApi) => {
        try {
            const response = await axios.get<MessageThread[]>('http://localhost:9000/api/messageThreads');
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
