import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 type:'today'
};

const taskTypeSlice = createSlice({
  name: "taskType",
  initialState,
  reducers: {
    
    handleTaskType:(state,action)=>{
        state.type= action.payload.type;
    }
  },
});

export const { handleTaskType} = taskTypeSlice.actions;
export default taskTypeSlice.reducer;
