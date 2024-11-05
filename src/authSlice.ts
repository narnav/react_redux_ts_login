// store/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from './models/User';
import { login } from './authAPI';
import { RootState } from './app/store';

const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
    error: null,
    token: null,
};

// Async action for logging in
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (user: User, { rejectWithValue }) => {
        try {
            const response:any =await  login(user)   // await axios.post('http://127.0.0.1:8000/login', user);
            // console.log(response);
            
            return response.data.token;
        } catch (error: any) {
            return rejectWithValue(error.response.data?.message || 'Login failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                // console.log("pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
                // console.log("fulfilled");
                
                state.isAuthenticated = true;
                state.loading = false;
                state.token = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                // console.log("rejected");
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth.isAuthenticated;
export default authSlice.reducer;
