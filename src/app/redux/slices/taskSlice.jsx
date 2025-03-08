import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
    list: [],
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {

        addTask: (state, action) => {
            state.count = state.count + 1
            state.list = [...state.list, { id: state.count, complete: action.payload.complete, importent: action.payload.importent, task: action.payload.task, date: new Date() }];
        },
        deleteTask: (state, action) => {
            const filteredData = state.list.filter(item => item.id !== action.payload.id);
            state.list = filteredData
        },
        editTask: (state, action) => {
            const updatedData = state.list.map(item =>
                item.id == action.payload.id ? { ...item, complete: action.payload.complete, importent: action.payload.importent } : item
            );
            state.list = updatedData
        }
    },
});

export const { addTask, deleteTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
