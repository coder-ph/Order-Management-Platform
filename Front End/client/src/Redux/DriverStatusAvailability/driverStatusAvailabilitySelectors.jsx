import { createSelector } from 'reselect';

// Base selector with null check
export const selectDriverStatusState = state => state?.driverStatus || {};

// Selectors
export const selectData = (state) => selectDriverStatusState(state).data || [];
export const selectLoading = (state) => selectDriverStatusState(state).loading;
export const selectError = (state) => selectDriverStatusState(state).error;

// Advanced selectors
export const selectDriversByCarrier = createSelector(
  [selectData],
  (drivers) => (carrierId) => drivers.filter(driver => driver.carrier_id === carrierId)
);

export const selectDriversByStatus = createSelector(
  [selectData],
  (drivers) => (status) => drivers.filter(driver => driver.status === status)
);

export const selectDriverStatistics = createSelector(
  [selectData],
  (drivers) => ({
    total: drivers.length,
    active: drivers.filter(d => d.status === 'active').length,
    inactive: drivers.filter(d => d.status === 'inactive').length,
    pending: drivers.filter(d => d.status === 'pending').length,
    onLeave: drivers.filter(d => d.status === 'on_leave').length,
    suspended: drivers.filter(d => d.status === 'suspended').length
    
  })
);

// Find by ID
export const selectById = createSelector(
  [selectData, (_, id) => id],
  (data, id) => data?.find(item => item.id === id)
);

// Filter function
const filterByProps = (data = [], filters = {}) => {
  return data.filter(item => 
    Object.entries(filters).every(([key, value]) => item[key] === value)
  );
};

// Generic filter selector
export const createFilterSelector = (filters) => {
  return createSelector(
    selectData,
    data => filterByProps(data, filters)
  );
};

// Usage helpers
export const getByStatus = (status) => createFilterSelector({ status });

// Get by multiple properties
export const getByFilters = (filters) => createFilterSelector(filters);

/* Example usage in components:
   
   // Single filter
   const activeDrivers = useSelector(state => getByStatus('active')(state));
   
   // Multiple filters
   const filters = { status: 'active', date: '2025-05-05' };
   const filteredDrivers = useSelector(state => getByFilters(filters)(state));
*/