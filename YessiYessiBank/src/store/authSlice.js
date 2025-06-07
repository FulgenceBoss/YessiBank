import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';

const TOKEN_KEY = 'user_token';

export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (phoneNumber, {rejectWithValue}) => {
    try {
      const response = await api.post('/auth/send-otp', {phoneNumber});
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({message: error.message});
    }
  },
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({phoneNumber, otp}, {rejectWithValue}) => {
    try {
      const response = await api.post('/auth/verify-otp', {
        phoneNumber,
        code: otp,
      });
      console.log(
        '[Auth] Token reçu, tentative de sauvegarde:',
        response.data.token,
      );
      await SecureStore.setItemAsync(TOKEN_KEY, response.data.token);
      console.log('[Auth] Token sauvegardé avec succès.');
      return response.data;
    } catch (error) {
      console.error('[Auth] Erreur lors de la sauvegarde du token:', error);
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({message: error.message});
    }
  },
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, {rejectWithValue}) => {
    try {
      console.log('[Auth] Vérification du token sauvegardé...');
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        console.log('[Auth] Token trouvé:', token);
        return {token};
      }
      console.log('[Auth] Aucun token trouvé dans SecureStore.');
      return rejectWithValue('No token found');
    } catch (error) {
      console.error('[Auth] Erreur lors de la lecture du token:', error);
      return rejectWithValue(error.message);
    }
  },
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  console.log('[Auth] Déconnexion, suppression du token.');
  await SecureStore.deleteItemAsync(TOKEN_KEY);
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    isAuthenticated: false,
    token: null,
    error: null,
    otpSent: false,
    appIsReady: false,
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
      })
      // checkAuth
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.appIsReady = true;
      })
      .addCase(checkAuth.rejected, state => {
        state.appIsReady = true;
      })
      // logoutUser
      .addCase(logoutUser.fulfilled, state => {
        state.isAuthenticated = false;
        state.token = null;
        state.otpSent = false;
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
