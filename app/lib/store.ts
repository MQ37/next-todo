import { configureStore } from '@reduxjs/toolkit';
import userReducer from './stores/user';
import alertReducer from './stores/alert';

export const makeStore = () => {
  return configureStore({
    reducer: {
        user: userReducer,
        alert: alertReducer,
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

