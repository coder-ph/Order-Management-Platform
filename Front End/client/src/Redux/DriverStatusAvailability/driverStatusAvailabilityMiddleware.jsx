import {
  FETCH_DRIVER_STATUS,
  UPDATE_DRIVER_STATUS,
  fetchDriverStatusSuccess,
  fetchDriverStatusFailure,
  updateDriverStatusSuccess,
  updateDriverStatusFailure
} from './driverStatusAvailabilityActions';

export const driverStatusMiddleware = store => next => action => {
  next(action);

  switch (action.type) {
    case FETCH_DRIVER_STATUS:
      fetch('/api/driver-status')
        .then(response => response.json())
        .then(data => store.dispatch(fetchDriverStatusSuccess(data)))
        .catch(error => store.dispatch(fetchDriverStatusFailure(error.message)));
      break;

    case UPDATE_DRIVER_STATUS:
      const { driverId, status } = action.payload;
      fetch(`/api/driver-status/${driverId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      })
        .then(response => response.json())
        .then(data => store.dispatch(updateDriverStatusSuccess(data)))
        .catch(error => store.dispatch(updateDriverStatusFailure(error.message)));
      break;

    default:
      break;
  }
};