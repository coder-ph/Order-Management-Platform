import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API } from '../../config/api';

export const fetchIncidents = createAsyncThunk(
  'incidents/fetchIncidents',
  async () => {
    const response = await fetch(`${BASE_API}/incidents`);
    if (!response.ok) {
      throw new Error('Failed to fetch incidents');
    }
    const data = await response.json();
    return data;
  }
);

const incidentsSlice = createSlice({
  name: 'incidents',
  initialState: {
    incidentsList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncidents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIncidents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.incidentsList = action.payload;
      })
      .addCase(fetchIncidents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllIncidents = (state) => state.incidents.incidentsList;
export const selectIncidentsStatus = (state) => state.incidents.status;
export const selectIncidentsError = (state) => state.incidents.error;

export default incidentsSlice.reducer;
