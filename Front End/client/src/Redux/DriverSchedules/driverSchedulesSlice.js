import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API } from '../../config/api';

export const fetchDriverSchedules = createAsyncThunk(
  'driverSchedules/fetchDriverSchedules',
  async () => {
    const response = await fetch(`${BASE_API}/driver_schedules`);
    if (!response.ok) {
      throw new Error('Failed to fetch driver schedules');
    }
    const data = await response.json();
    return data;
  }
);

const driverSchedulesSlice = createSlice({
  name: 'driverSchedules',
  initialState: {
    driverSchedulesList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDriverSchedules.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDriverSchedules.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.driverSchedulesList = action.payload;
      })
      .addCase(fetchDriverSchedules.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllDriverSchedules = (state) => state.driverSchedules.driverSchedulesList;
export const selectDriverSchedulesStatus = (state) => state.driverSchedules.status;
export const selectDriverSchedulesError = (state) => state.driverSchedules.error;

export default driverSchedulesSlice.reducer;
