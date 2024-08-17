import { createSlice } from "@reduxjs/toolkit";
import { UserWithoutPassword } from "../types";

type UserState = {
    user: UserWithoutPassword | null | undefined;
}

const initialState: UserState = {
    user: undefined,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action: { payload: UserWithoutPassword }) {
            state.user = action.payload;
        },
        logout(state) {
            state.user = null;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

