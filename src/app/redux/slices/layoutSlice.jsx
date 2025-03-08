import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGrid: false,
  isDark: false,
  isSidebarOpen: true,
  isInputCollapse: false
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    changeListLayout: (state) => {
      state.isGrid = !state.isGrid
    },
    changeTheme: (state) => {
      state.isDark = !state.isDark
    },
    handleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    handleInputCollapse: (state) => {
      state.isInputCollapse = !state.isInputCollapse
    }
  },
});

export const { changeListLayout, changeTheme, handleSidebar, handleInputCollapse } = layoutSlice.actions;
export default layoutSlice.reducer;
