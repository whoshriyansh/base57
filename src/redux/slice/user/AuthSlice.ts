import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as Keychain from 'react-native-keychain';
import { ENDPOINTS } from '../../../services/apiBaseUrl';
import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  UserState,
} from '../../../types/auth';
import Toast from 'react-native-toast-message';
import { axiosInstance } from '../../../services/apiInterceptor';

const initialState: UserState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// REGISTER
export const registerUser = createAsyncThunk<
  LoginResponse,
  RegisterCredentials,
  { rejectValue: string }
>('user/registerUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.REGISTER, credentials);

    const res = response.data.data;
    await Keychain.resetGenericPassword();
    await Keychain.setGenericPassword('authData', JSON.stringify(res));
    Toast.show({
      type: 'success',
      text1: 'Registration Successful',
      text2: response.data.message,
    });
    return response.data;
  } catch (error: any) {
    console.error('Register Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      code: error.code,
    });
    const msg = error.response?.data?.message || 'Registration failed';
    Toast.show({ type: 'error', text1: 'Register Error', text2: msg });
    return rejectWithValue(msg);
  }
});

// LOGIN
export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>('user/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.LOGIN, credentials);

    const res = response.data.data;
    await Keychain.resetGenericPassword();
    await Keychain.setGenericPassword('authData', JSON.stringify(res));
    Toast.show({
      type: 'success',
      text1: 'Login Successful',
      text2: response.data.message,
    });
    return response.data;
  } catch (error: any) {
    console.error('Login Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      code: error.code,
    });
    const msg = error.response?.data?.message || 'Login failed';
    Toast.show({ type: 'error', text1: 'Login Error', text2: msg });
    return rejectWithValue(msg);
  }
});

// LOAD USER
export const loadUserFromStorage = createAsyncThunk<
  { token: string; user: LoginResponse['user'] },
  void,
  { rejectValue: string }
>('user/loadUserFromStorage', async (_, { rejectWithValue }) => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log('Keychain Data:', credentials);
      const authData = JSON.parse(credentials.password);
      return { token: authData.token, user: authData.user };
    }
    return rejectWithValue('No auth data found');
  } catch (error: any) {
    console.error('Load User Error:', error);
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      Keychain.resetGenericPassword();
    },
    setUser: (state, action: PayloadAction<LoginResponse['user']>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // LOGIN
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload || 'Login failed';
      })

      // REGISTER
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload || 'Registration failed';
      })

      // LOAD USER
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loadUserFromStorage.rejected, state => {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      });
  },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
