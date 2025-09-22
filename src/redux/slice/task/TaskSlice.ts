import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import { ENDPOINTS } from '../../../services/apiBaseUrl';
import { apiClient } from '../../../services/api';
import { Task, TaskState } from '../../../types/task';

// Initial state
const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Thunk to fetch all tasks
export const fetchTasks = createAsyncThunk<
  Task[],
  void,
  { rejectValue: string }
>('task/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get(ENDPOINTS.FETCH_ALL);

    Toast.show({
      type: 'success',
      text1: 'Tasks Fetched Successfully',
      text2: response.data.message,
    });

    return response.data.data; // return the array of tasks
  } catch (error: any) {
    console.error('Fetching Tasks Failed', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      code: error.code,
    });

    const msg = error.response?.data?.message || 'Fetching Tasks Failed';
    Toast.show({ type: 'error', text1: 'Fetching Tasks Failed', text2: msg });

    return rejectWithValue(msg);
  }
});

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Fetching Tasks Failed';
      });
  },
});

export const { setTasks, addTask } = taskSlice.actions;
export default taskSlice.reducer;
