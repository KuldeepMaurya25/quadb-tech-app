"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useSelector, useDispatch } from "react-redux";
import { changeListLayout, changeTheme, handleSidebar } from '../redux/slices/layoutSlice';
import { Button } from '@mui/material';
import { handleLogin, handleLogout } from '../lib/auth';

export default function Navbar() {
  const layoutState = useSelector((state) => state.layout);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="fixed" elevation={0} enableColorOnDark={true} sx={[layoutState.isDark ? { backgroundColor: 'var(--foreground)' } : { backgroundColor: 'var(--background)' }, { height: '50px' }]}>
        <Toolbar variant="dense" className='flex flex-row justify-between'>

          <div className=' flex flex-row'>
            <IconButton edge="start" sx={[layoutState.isDark ? { color: 'var(--background)' } : { color: 'var(--foreground)' }, { mr: 2 }]} aria-label="menu" onClick={() => dispatch(handleSidebar())} >
              <MenuIcon />
            </IconButton>
            <Image src={'/company-logo.png'} width={90} height={32} alt='company-logo' />
          </div>
          <div>
            <IconButton onClick={() => dispatch(changeListLayout())} sx={[layoutState.isDark ? { color: 'var(--background)' } : { color: 'var(--foreground)' }]}>
              {
                layoutState.isGrid ? <ViewListIcon /> : <GridViewOutlinedIcon />
              }

            </IconButton>
            <IconButton onClick={() => dispatch(changeTheme())} sx={[layoutState.isDark ? { color: 'var(--background)' } : { color: 'var(--foreground)' }]}>
              {
                layoutState.isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />
              }

            </IconButton>
            {
              authState.login ? <Button size='sm' onClick={() => handleLogout(dispatch)} variant="contained" color="success" disableElevation sx={{ ml: 1 }}>Logout</Button> : <Button onClick={() => handleLogin(dispatch)} variant="contained" color="success" disableElevation sx={{ ml: 1 }} size='sm'>Login</Button>
            }

          </div>

        </Toolbar>
      </AppBar>
    </Box>
  );
}