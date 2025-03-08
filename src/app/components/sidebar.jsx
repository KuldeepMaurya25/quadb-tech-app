import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import Image from 'next/image';
import Button from '@mui/material/Button';
import { handleLogin, handleLogout } from '../lib/auth';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import IconButton from '@mui/material/IconButton';
import sidebar from '../data/sidebar.json'
import { handleTaskType } from '../redux/slices/taskType';
import { handleSidebar } from '../redux/slices/layoutSlice';

import { countTask } from '../lib/countTask';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required chart components
ChartJS.register(ArcElement, Tooltip, Legend);
const Sidebar = () => {
  const layoutState = useSelector((state) => state.layout);
  const authState = useSelector((state) => state.auth);
  const taskTypeState = useSelector((state) => state.taskType);
  const taskState = useSelector((state) => state.task);
  const chartData = {
    labels: ["Done", "Pending"],
    datasets: [
      {
        data: [countTask(taskState.list, taskTypeState.type).complete, countTask(taskState.list, taskTypeState.type).pending],
        backgroundColor: ["#3F9142", "#142E15"],
        borderColor: ["#3F9142", "#142E15"]
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  const dispatch = useDispatch();
  const IconComponent = (type) => {
    const Icon = {
      'all_task': <AssignmentIcon />,
      'today': <CalendarTodayIcon />,
      'importent': <StarBorderIcon />,
      'assigned_to_me': <AssignmentIndIcon />,
    }
    return Icon[type.type];
  }

  const handleTaskTypeClick = (type) => {
    dispatch(handleTaskType({ type: type }))
  }

  return (
    <div className={`mt-[80px] ${layoutState.isDark ? 'bg-[#2C2C2C]' : 'bg-[#EEF6EF]'} h-full relative rounded-md md:min-w-fit min-w-[40vw]`}>
      {authState.login ? <><div className={`absolute top-[-50] w-full flex justify-center`} >
        <Image src={'/user.png'} width={90} height={32} alt='user' />
      </div>
        <div className='pt-[60px] flex flex-col items-center p-3 '>
          <p className={`${layoutState.isDark ? 'text-[var(--white)]' : 'text-[var(--black)]'} font-[500] text-[15px]`}>Hey,{authState.userName}</p>
          <div className={`${layoutState.isDark ? 'bg-[var(--foreground)]' : 'bg-[var(--background)]'} mt-5 shadow w-full`}>

            {
              sidebar['taskType']?.map((item, key) => {
                return (
                  <div key={key} className={`${taskTypeState.type == item.key ? (layoutState.isDark ? 'bg-[#2F3630]' : 'bg-[#EEF6EF]') : ''} my-2 p-3 rounded  cursor-pointer`} onClick={() => handleTaskTypeClick(item.key)}>
                    <div className='flex flex-row gap-3  ' >
                      <IconButton
                        sx={[taskTypeState.type == item.key ? { color: 'var(--green)' } : (layoutState.isDark ? { color: 'var(--background)' } : { color: 'var(--foreground)' }), { p: 0 }]}
                        aria-label="menu" >
                        <IconComponent type={item.key} />
                      </IconButton>
                      <p className={`${taskTypeState.type == item.key ? 'text-[var(--green)]' : (layoutState.isDark ? 'text-[var(--white)]' : 'text-[var(--black)]')} font-[600] text-[15px]`}>{item.name}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className={`${layoutState.isDark ? 'bg-[var(--foreground)]' : 'bg-[var(--background)]'} my-10 shadow w-full flex flex-col justify-center items-center`}>
            <p className={`${layoutState.isDark ? 'text-[var(--white)]' : 'text-[var(--black)]'} font-[600] text-[20px] capitalize `}>{taskTypeState.type.replaceAll('_', ' ')}: {countTask(taskState.list, taskTypeState.type).total}</p>

            <div style={{ width: "200px", height: "200px" }}>
              <Doughnut data={chartData} options={options} />
            </div>
          </div>
        </div>
      </>
        :
        <div className='flex justify-center items-center pt-10'>
          {
            authState.login ? <Button size='sm' onClick={() => handleLogout(dispatch)} variant="contained" color="success" disableElevation className='ml-2'>Logout</Button> : <Button onClick={() => handleLogin(dispatch)} variant="contained" color="success" disableElevation className='ml-2' size='sm'>Login</Button>
          }

        </div>
      }




    </div>
  )
}

export default Sidebar