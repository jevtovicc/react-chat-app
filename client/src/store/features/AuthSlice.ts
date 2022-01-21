import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { Message, MessageThread, User } from '../../types/types';
import { RootState } from '../store';

// Define a type for the slice state
interface AuthState {
    status: 'loading' | 'idle',
    error: string | null
    accessToken?: string,
    user?: User,
    searchedUser?: User,
}

// Define the initial state using that type
const initialState: AuthState = {
    status: 'idle',
    error: null,
    accessToken: undefined,
    user: undefined,
    searchedUser: undefined
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
        clearError: (state) => {
            state.error = null;
        },
        resetSearchedUser: (state) => {
            state.searchedUser = undefined
        }
    },
    extraReducers: (builder) => {

        // login
        builder.addCase(login.pending, (state) => {
            state.status = 'loading';
            state.error = null
        });

        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.accessToken = payload.accessToken
            state.user = payload.user
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

        // findUserByUsername
        builder.addCase(findUserByUsername.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })

        builder.addCase(findUserByUsername.fulfilled, (state, { payload }) => {
            state.status = 'idle'
            state.searchedUser = payload
        })

        builder.addCase(findUserByUsername.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload;
            }
            state.status = 'idle';
        });


    }
})

export const login = createAsyncThunk<{ user: User, accessToken: string }, LoginValues, { rejectValue: string }>(
    "login",
    async ({ username, password }, thunkApi) => {
        try {
            const response = await axios.post<{ user: User, accessToken: string }>('http://localhost:9000/api/auth/login', {
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

export const createMessageThread = createAsyncThunk<MessageThread, { messageThreadName: string, participants: User[] }, { rejectValue: string, state: RootState }>(
    "createMessageThread",
    async ({ messageThreadName, participants }, thunkApi) => {
        const accessToken = thunkApi.getState().auth.accessToken;
        try {
            const response = await axios.post<MessageThread>('http://localhost:9000/api/messageThreads', {
                messageThreadName: messageThreadName,
                participants: participants
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
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

export const addParticipantsToMessageThread = createAsyncThunk<MessageThread, { messageThreadId: number, participants: User[] }, { rejectValue: string, state: RootState }>(
    "addParticipantsToMessageThread",
    async ({ messageThreadId, participants }, thunkApi) => {
        try {
            const accessToken = thunkApi.getState().auth.accessToken;
            const response =
                await axios.post<MessageThread>(`http://localhost:9000/api/messageThreads/${messageThreadId}/addParticipants`, {
                    participants: participants
                }, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
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

export const findUserByUsername = createAsyncThunk<User, { username: string }, { rejectValue: string, state: RootState }>(
    "findUserByUsername",
    async ({ username }, thunkApi) => {
        const accessToken = thunkApi.getState().auth.accessToken;
        try {
            const response = await axios.get<User>(`http://localhost:9000/api/users?username=${username}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
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

export const sendFriendRequest = createAsyncThunk<User, { friendUsername: string }, { rejectValue: string, state: RootState }>(
    "sendFriendRequest",
    async ({ friendUsername }, thunkApi) => {
        const accessToken = thunkApi.getState().auth.accessToken;
        try {
            const response = await axios.post<User>(`http://localhost:9000/api/users/sendFriendRequest`, {
                friendUsername: friendUsername
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
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

export const { addMessage, clearError, resetSearchedUser } = authSlice.actions
export default authSlice.reducer
