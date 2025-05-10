import axios from 'axios';

// const API_URL = import.meta.env.VITE_APP_USER_URL;
const API_URL = 'http://127.0.0.1:5000'; // this is jaafars localhost api url

// Action Types
export const FETCH_DRIVERS_REQUEST = 'FETCH_DRIVERS_REQUEST';
export const FETCH_DRIVERS_SUCCESS = 'FETCH_DRIVERS_SUCCESS';
export const FETCH_DRIVERS_FAILURE = 'FETCH_DRIVERS_FAILURE';
export const UPDATE_DRIVER_STATUS = 'UPDATE_DRIVER_STATUS';

// Action Creators
export const fetchDriversRequest = () => ({
  type: FETCH_DRIVERS_REQUEST
});

export const fetchDriversSuccess = (drivers) => ({
  type: FETCH_DRIVERS_SUCCESS,
  payload: drivers
});

export const fetchDriversFailure = (error) => ({
  type: FETCH_DRIVERS_FAILURE,
  payload: error
});

export const updateDriverStatus = (driverId, status, reason) => ({
  type: UPDATE_DRIVER_STATUS,
  payload: { driverId, status, reason }
});

// Async Actions
export const fetchDriverStatusAsync = () => {
  return async (dispatch) => {
    dispatch(fetchDriversRequest());
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/v1/drivers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      // Filter for drivers from all users feature when userbased role is implemented 
      // const drivers = response.data.filter(user => user.role === 'driver');
      // For now below, we are fetching all drivers since based on authorization token
      const drivers = response.data;
      console.log('Fetched drivers:', drivers);
      dispatch(fetchDriversSuccess(drivers));
    } catch (error) {
      dispatch(fetchDriversFailure(error.message));
    }
  };
};

export const updateDriverStatusAsync = (driverId, status, reason) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_URL}/api/v1/${driverId}/status`, 
        { status, reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      dispatch(updateDriverStatus(driverId, status, reason));
    } catch (error) {
      console.error('Error updating driver status:', error);
    }
  };
};