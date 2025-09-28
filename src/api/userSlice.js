import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
    users:[],
}

const userSlice = createSlice({
    name:"users",
    initialState,
    reducers: {
        addUsers:(state,action) => {
            state.users.push(action.payload);
        },
        removeUser:(state,action) => {
            state.users = state.users.filter(user => user.id !== action.payload)
        }
    }
})

export const {addUsers,removeUser,editUser} = userSlice.actions;

export  default userSlice.reducer;