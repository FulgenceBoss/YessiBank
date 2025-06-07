import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../services/api';

// Thunk asynchrone pour envoyer l'OTP
export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (phoneNumber, {rejectWithValue}) => {
    try {
      const response = await apiClient.post('/auth/send-otp', {phoneNumber});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Thunk asynchrone pour vérifier l'OTP et obtenir le token
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({phoneNumber, code}, {rejectWithValue}) => {
    try {
      const response = await apiClient.post('/auth/verify-otp', {
        phoneNumber,
        code,
      });
      // TODO: Sauvegarder le token de manière sécurisée (AsyncStorage)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    otpSent: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // sendOtp
      .addCase(sendOtp.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.otpSent = false;
      })
      .addCase(sendOtp.fulfilled, state => {
        state.isLoading = false;
        state.otpSent = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // verifyOtp
      .addCase(verifyOtp.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
