import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API } from '../../config/api';

export const fetchDrivers = createAsyncThunk(
  'drivers/fetchDrivers',
  async () => {
    const response = await fetch(`${BASE_API}/drivers`);
    if (!response.ok) {
      throw new Error('Failed to fetch drivers');
    }
    const data = await response.json();
    return data;
  }
);

const driversSlice = createSlice({
  name: 'drivers',
  initialState: {
    driversList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.driversList = action.payload;
      })
      .addCase(fetchDrivers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllDrivers = (state) => state.drivers.driversList;
export const selectDriversStatus = (state) => state.drivers.status;
export const selectDriversError = (state) => state.drivers.error;

export default driversSlice.reducer;
