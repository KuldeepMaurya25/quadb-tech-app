import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: ''
};

const inputSlice = createSlice({
    name: "taskInput",
    initialState,
    reducers: {

        handleTaskInput: (state, action) => {
            state.value = action.payload.value;
        }
    },
});

export const { handleTaskInput } = inputSlice.actions;
export default inputSlice.reducer;
