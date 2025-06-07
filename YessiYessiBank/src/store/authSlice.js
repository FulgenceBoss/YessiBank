import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../services/api';

export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (phoneNumber, {rejectWithValue}) => {
    try {
      const response = await api.post('/auth/send-otp', {phoneNumber});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({phoneNumber, otp}, {rejectWithValue}) => {
    try {
      const response = await api.post('/auth/verify-otp', {phoneNumber, otp});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    isAuthenticated: false,
    token: null,
    error: null,
    otpSent: false,
  },
  reducers: {
    logout: state => {
      state.isAuthenticated = false;
      state.token = null;
      state.otpSent = false;
    },
  },
  extraReducers: builder => {
    builder
      // sendOtp
      .addCase(sendOtp.pending, state => {
        state.loading = true;
        state.error = null;
        state.otpSent = false;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // verifyOtp
      .addCase(verifyOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
