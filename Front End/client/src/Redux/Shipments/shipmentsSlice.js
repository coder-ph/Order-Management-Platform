import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API } from '../../config/api';

export const fetchShipments = createAsyncThunk(
  'shipments/fetchShipments',
  async () => {
    const response = await fetch(`${BASE_API}/shipment_order`);
    if (!response.ok) {
      throw new Error('Failed to fetch shipments');
    }
    const data = await response.json();
    return data;
  }
);

const shipmentsSlice = createSlice({
  name: 'shipments',
  initialState: {
    shipmentsList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShipments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shipmentsList = action.payload;
      })
      .addCase(fetchShipments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllShipments = (state) => state.shipments.shipmentsList;
export const selectShipmentsStatus = (state) => state.shipments.status;
export const selectShipmentsError = (state) => state.shipments.error;

export default shipmentsSlice.reducer;
