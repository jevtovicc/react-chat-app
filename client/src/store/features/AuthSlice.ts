import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';
import { User } from '../../types/types';

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

export default authSlice.reducer
