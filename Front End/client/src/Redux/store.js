import {configureStore} from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {},
})

export const getRootState = store.getState
export const appDispatch = store.dispatch