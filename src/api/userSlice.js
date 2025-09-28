import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: JSON.parse(localStorage.getItem("users")) || [],
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUsers: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.users.push(...action.payload);
            } else {
                state.users.push(action.payload);
            }
            localStorage.setItem("users",JSON.stringify(state.users));
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload)
            localStorage.setItem("users",JSON.stringify(state.users));
        },
        editUser:(state,action) => {
            const {id,newUser} = action.payload;
            const existing = state.users.find(user => user.id === id);
            if(existing){
                existing.username = newUser.username
                existing.name.firstname = newUser.name.firstname;
                existing.name.lastname = newUser.name.lastname;
                existing.address.city = newUser.address.city 
                existing.phone = newUser.phone;
                existing.email = newUser.email;
                existing.password = newUser.password;
            }
        }
    }
})

export const { addUsers, removeUser, editUser } = userSlice.actions;

export default userSlice.reducer;