import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { Message, MessageThread, User } from '../../types/types';

// Define a type for the slice state
interface AuthState {
    status: 'loading' | 'idle',
    error: string | null
    user?: User
}

// Define the initial state using that type
const initialState: AuthState = {
    status: 'idle',
    error: null,
    user: undefined
}

type LoginValues = {
    username: string;
    password: string
};

export const authSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.user!.messageThreads
                .find((mt) => mt.id === action.payload.messageThreadId)
                ?.messages.push(action.payload);
        },
    },
    extraReducers: (builder) => {

        // login
        builder.addCase(login.pending, (state) => {
            state.status = 'loading';
            state.error = null
        });

        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.user = payload
            state.status = 'idle'
        });

        builder.addCase(login.rejected, (state, { payload }) => {
            if (payload) {
                state.error = payload;
            }
            state.status = 'idle';
        })

        // signup
        builder.addCase(signup.pending, (state) => {
            state.status = 'loading';
            state.error = null
        });

        builder.addCase(signup.fulfilled, (state, { payload }) => {
            state.user = payload
            state.status = 'idle'
        });

        builder.addCase(signup.rejected, (state, { payload }) => {
            if (payload) {
                state.error = payload;
            }
            state.status = 'idle';
        })


        // createMessageThread
        builder.addCase(createMessageThread.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })

        builder.addCase(createMessageThread.fulfilled, (state, { payload }) => {
            state.user?.messageThreads.push(payload);
            state.status = 'idle'
        })

        builder.addCase(createMessageThread.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload;
            }
            state.status = 'idle';
        });

        // addUserToMessageThread
        builder.addCase(addParticipantsToMessageThread.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })

        builder.addCase(addParticipantsToMessageThread.fulfilled, (state, { payload }) => {
            const index = state.user?.messageThreads.findIndex(mt => mt.id === payload.id);
            if (index) {
                state.user!.messageThreads[index] = payload;
            }
            state.status = 'idle'
        })

        builder.addCase(addParticipantsToMessageThread.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload;
            }
            state.status = 'idle';
        });

        // sendFriendRequest
        builder.addCase(sendFriendRequest.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })

        builder.addCase(sendFriendRequest.fulfilled, (state, { payload }) => {
            state.user?.following.push(payload)
            state.user?.followedBy.push(payload)
            state.status = 'idle'
        })

        builder.addCase(sendFriendRequest.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload;
            }
            state.status = 'idle';
        });


    }
})

export const login = createAsyncThunk<User, LoginValues, { rejectValue: string }>(
    "login",
    async ({ username, password }, thunkApi) => {
        try {
            const response = await axios.post<User>('http://localhost:9000/api/auth/login', {
                username: username,
                password: password
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
);

type SignupValues = {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
}

export const signup = createAsyncThunk<User, SignupValues, { rejectValue: string }>(
    "signup",
    async (user, thunkApi) => {
        try {
            const response = await axios.post<User>('http://localhost:9000/api/auth/signup', user);
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return thunkApi.rejectWithValue(e.response.data as string)
            } else {
                return thunkApi.rejectWithValue('Error on server side occurred')
            }
        }
    }
);

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

export const addParticipantsToMessageThread = createAsyncThunk<MessageThread, { messageThreadId: number, participants: User[] }, { rejectValue: string }>(
    "addParticipantsToMessageThread",
    async ({ messageThreadId, participants }, thunkApi) => {
        try {
            const response =
                await axios.post<MessageThread>(`http://localhost:9000/api/messageThreads/${messageThreadId}/addParticipants`, {
                    participants: participants
                })
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

export const sendFriendRequest = createAsyncThunk<User, { senderUsername: string, friendUsername: string }, { rejectValue: string }>(
    "sendFriendRequest",
    async ({ senderUsername, friendUsername }, thunkApi) => {
        try {
            const response = await axios.post<User>(`http://localhost:9000/api/users/sendFriendRequest`, {
                senderUsername: senderUsername,
                friendUsername: friendUsername
            })
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

export const { addMessage } = authSlice.actions
export default authSlice.reducer
