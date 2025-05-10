import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    driverStatus: null,
    availabilityStatus: null,
    driverId: null,
};
const driverStatusAvailabilitySlice = createSlice({
    name: "driverStatusAvailability",
    initialState,
    reducers: {
        setDriverStatus: (state, action) => {
            state.driverStatus = action.payload;
        },
        setAvailabilityStatus: (state, action) => {
            state.availabilityStatus = action.payload;
        },
        setDriverId: (state, action) => {
            state.driverId = action.payload;
        },
    },
});
export const { setDriverStatus, setAvailabilityStatus, setDriverId } = driverStatusAvailabilitySlice.actions;
export const selectDriverStatus = (state) => state.driverStatusAvailability.driverStatus;
export const selectAvailabilityStatus = (state) => state.driverStatusAvailability.availabilityStatus;
export const selectDriverId = (state) => state.driverStatusAvailability.driverId;
export default driverStatusAvailabilitySlice.reducer;
