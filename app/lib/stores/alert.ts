import { createSlice } from "@reduxjs/toolkit";
import { AlertMessage } from "../types";

type AlertState = {
    alerts: AlertMessage[]
}

const initialState: AlertState = {
    alerts: [],
};

export const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        addAlert(state, action: { payload: AlertMessage }) {
            state.alerts.push(action.payload);
        },
        removeAlert(state, action: { payload: number }) {
            state.alerts = state.alerts.filter((alert) => alert.id !== action.payload);
        },
    },
});

export const { addAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;


