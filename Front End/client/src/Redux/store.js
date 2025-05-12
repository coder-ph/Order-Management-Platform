// store.js
import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./Order/orderSlice"; 
import paymentReducer from './Payment/paymentSlice';
import driverStatusReducer from './DriverStatusAvailability/driverStatusAvailabilityReducer';
import incidentsReducer from './Incidents/incidentsSlice';
import driversReducer from './Drivers/driversSlice';
import billingReducer from './Billing/billingSlice';
import ordersReducer from './Orders/ordersSlice';
import shipmentsReducer from './Shipments/shipmentsSlice';
import trackingEventsReducer from './TrackingEvents/trackingEventsSlice';
import clientsReducer from './Clients/clientsSlice';
import driverSchedulesReducer from './DriverSchedules/driverSchedulesSlice';

const rootReducer = {
  order: orderReducer,
  payment: paymentReducer,
  driverStatus: driverStatusReducer,
  incidents: incidentsReducer,
  drivers: driversReducer,
  billing: billingReducer,
  orders: ordersReducer,
  shipments: shipmentsReducer,
  trackingEvents: trackingEventsReducer,
  clients: clientsReducer,
  driverSchedules: driverSchedulesReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
