import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API } from '../../config/api';

export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async () => {
    const response = await fetch(`${BASE_API}/clients`);
    if (!response.ok) {
      throw new Error('Failed to fetch clients');
    }
    const data = await response.json();
    return data;
  }
);

const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    clientsList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clientsList = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllClients = (state) => state.clients.clientsList;
export const selectClientsStatus = (state) => state.clients.status;
export const selectClientsError = (state) => state.clients.error;

export default clientsSlice.reducer;
