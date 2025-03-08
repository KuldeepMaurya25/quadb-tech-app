import React from 'react'
import { TextField, Button, Alert } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { handleTaskInput } from '../redux/slices/inputSlice';
import { addTask, deleteTask } from '../redux/slices/taskSlice';
const TaskInput = () => {
  const layoutState = useSelector((state) => state.layout);
  const authState = useSelector((state) => state.auth);
  const taskInputState = useSelector((state) => state.taskInput);
  const dispatch = useDispatch();
  const handleTask = () => {
    dispatch(handleTaskInput({ value: '' }))
    dispatch(addTask({ complete: false, importent: false, task: taskInputState.value }));
  }

  return (
    <div className={`mt-[10px]   w-full flex flex-col justify-between  min-h-[150px]   ${layoutState.isDark ? 'bg-[#2F3630]' : 'bg-[#EEF6EF]'} rounded-md`}>
      {!authState.login && <Alert severity="warning">Please login first.</Alert>}
      <TextField id="filled-basic" label="" placeholder='Add a task' className='h-full' multiline value={taskInputState.value} variant="filled"
        fullWidth
        onChange={(e) => dispatch(handleTaskInput({ value: e.target.value }))}
        sx={{
          "& .mui-1ohi1vy-MuiInputBase-input-MuiFilledInput-input": layoutState.isDark ? { color: 'var(--background)' } : { color: 'var(--foreground)' },
          "& .mui-tigmpx-MuiInputBase-root-MuiFilledInput-root": { backgroundColor: 'transparent' },
          "& .mui-tigmpx-MuiInputBase-root-MuiFilledInput-root::before": { borderBottom: "none", transition: "none" },
          "& .css-tigmpx-MuiInputBase-root-MuiFilledInput-root:hover:not(.Mui-disabled, .Mui-error):before": { borderBottom: "none" },
          "& .css-qan929-MuiFormControl-root-MuiTextField-root .css-tigmpx-MuiInputBase-root-MuiFilledInput-root:hover:not(.Mui-disabled, .Mui-error):before": { borderBottom: "none", borderBottomColor: '' }
        }}
      />
      <div className='flex flex-row justify-end m-2 pb-2'>
        <Button variant="outlined" color="success" onClick={handleTask} disabled={!authState.login || !taskInputState}>Add task</Button>
      </div>

    </div>
  )
}

export default TaskInput;