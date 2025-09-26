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
           state.users = state.users.filter(user => user.id !== action.payload);
           console.log(state.users)
        },
        editUser : (state,action) => {
            const {id,text} = action.payload;
            const user = state.users.find(u => u.id === id);
            console.log("user",user);
        }
    }
})

export const {addUsers,removeUser,editUser} = userSlice.actions;

export  default userSlice.reducer;