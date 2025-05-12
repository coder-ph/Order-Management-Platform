import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API } from '../../config/api';

export const fetchTrackingEvents = createAsyncThunk(
  'trackingEvents/fetchTrackingEvents',
  async () => {
    const response = await fetch(`${BASE_API}/track_events`);
    if (!response.ok) {
      throw new Error('Failed to fetch tracking events');
    }
    const data = await response.json();
    return data;
  }
);

const trackingEventsSlice = createSlice({
  name: 'trackingEvents',
  initialState: {
    trackingEventsList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrackingEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrackingEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trackingEventsList = action.payload;
      })
      .addCase(fetchTrackingEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllTrackingEvents = (state) => state.trackingEvents.trackingEventsList;
export const selectTrackingEventsStatus = (state) => state.trackingEvents.status;
export const selectTrackingEventsError = (state) => state.trackingEvents.error;

export default trackingEventsSlice.reducer;
