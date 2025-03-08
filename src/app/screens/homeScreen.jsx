"use client"
import React from 'react'
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { changeListLayout, changeTheme, handleSidebar, handleInputCollapse } from '../redux/slices/layoutSlice';
import Drawer from '@mui/material/Drawer';
import Sidebar from '../components/sidebar';
import TaskInput from '../components/taskInput';
import { IconButton, Collapse } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TaskList from '../components/taskList';
const HomeScreen = () => {
    const layoutState = useSelector((state) => state.layout);
    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (

        <div className={`flex w-full  absolute top-[50] sm:pl-6 sm:pr-6 pl-4 pr-4 ${layoutState.isDark ? 'bg-[var(--foreground)]' : 'bg-[var(--background)]'}`}>
            {/* Grid 1 (Collapsible) */}
            <motion.div
                initial={{ flex: authState.login ? 1 / 4 : 0 }}
                animate={{ flex: layoutState.isSidebarOpen ? 1 / 4 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`max-h-[100vh] overflow-y-auto   md:block hidden`}
            >
                <Sidebar />

            </ motion.div>


            {/* Grid 2 (Expands when Grid 1 Collapses) */}
            <motion.div
                initial={{ flex: authState.login ? 1 : 2 }}
                animate={{ flex: layoutState.isSidebarOpen ? 1 : 2 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`${layoutState.isDark ? 'bg-[var(--foreground)]' : 'bg-[var(--background)]'} h-[100vh] overflow-scroll`}
            >
                <div className='mt-[30px] p-4'>
                    <div className='flex flex-row gap-1'>
                        <p className={`${layoutState.isDark ? 'text-[var(--green)]' : 'text-[var(--foreground)]'}`}>To do </p>
                        <IconButton sx={[layoutState.isDark ? { color: 'var(--green)' } : { color: 'var(--foreground)' }, { p: 0 }]} aria-label="menu" onClick={() => dispatch(handleInputCollapse())}>
                            <ArrowDropDownIcon />
                        </IconButton>
                    </div>
                    <Collapse in={!layoutState.isInputCollapse}><TaskInput /></Collapse>
                    <div>
                        {authState.login && <TaskList />}
                    </div>
                </div>
            </motion.div>
            <Drawer open={layoutState.isSidebarOpen} onClose={() => dispatch(handleSidebar())} className='md:hidden' sx={{ '& .mui-MuiPaper-root': { backgroundColor: layoutState.isDark ? 'var(--foreground)' : 'var(--background)' } }}>
                <Sidebar />
            </Drawer>
        </div>

    )
}

export default HomeScreen;