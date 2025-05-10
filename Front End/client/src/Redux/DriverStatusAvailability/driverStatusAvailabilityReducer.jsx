import {
  FETCH_DRIVERS_REQUEST,
  FETCH_DRIVERS_SUCCESS,
  FETCH_DRIVERS_FAILURE,
  UPDATE_DRIVER_STATUS
} from './driverStatusAvailabilityActions';

const initialState = {
  data: [],
  loading: false,
  error: null
};

const driverStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DRIVERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case FETCH_DRIVERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };
    
    case FETCH_DRIVERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case UPDATE_DRIVER_STATUS:
      return {
        ...state,
        data: state.data.map(driver =>
          driver.driver_id === action.payload.driverId
            ? { 
                ...driver, 
                status: action.payload.status,
                inactivity_reason: action.payload.status === 'inactive' ? action.payload.reason : null
              }
            : driver
        )
      };
    
    default:
      return state;
  }
};

export default driverStatusReducer;