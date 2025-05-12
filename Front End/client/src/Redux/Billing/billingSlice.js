import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API } from '../../config/api';

export const fetchBilling = createAsyncThunk(
  'billing/fetchBilling',
  async () => {
    const response = await fetch(`${BASE_API}/billing`);
    if (!response.ok) {
      throw new Error('Failed to fetch billing data');
    }
    const data = await response.json();
    return data;
  }
);

const billingSlice = createSlice({
  name: 'billing',
  initialState: {
    billingList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBilling.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBilling.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.billingList = action.payload;
      })
      .addCase(fetchBilling.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllBilling = (state) => state.billing.billingList;
export const selectBillingStatus = (state) => state.billing.status;
export const selectBillingError = (state) => state.billing.error;

export default billingSlice.reducer;
