import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { handleTaskInput } from '../redux/slices/inputSlice';
import { addTask, deleteTask, editTask } from '../redux/slices/taskSlice';
import { Checkbox, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { countTask } from '../lib/countTask';
const TaskList = () => {
    const layoutState = useSelector((state) => state.layout);
    const authState = useSelector((state) => state.auth);
    const taskInputState = useSelector((state) => state.taskInput);
    const taskState = useSelector((state) => state.task);
    const taskTypeState = useSelector((state) => state.taskType);
    const dispatch = useDispatch();

    const checkValid = (item) => {

        switch (taskTypeState.type) {
            case 'all_task': return true;
            case 'importent': return item.importent;
            case 'today': return new Date(item.date).getDate() === new Date().getDate();
            default: return true;
        }
    }
    return (
        <>
            <div className={`my-8 ${layoutState.isGrid ? 'grid md:grid-cols-2 grid-cols-1 gap-5' : ''}`}>
                {
                    taskState.list?.map((item, key) => {
                        return (
                            !item.complete && checkValid(item) && <div key={item.id} className={`flex flex-row justify-between px-2   border-[#496E4B33] ${layoutState.isGrid ? 'border-1 py-8' : 'border-t-1 py-5'}`}>
                                <div className='flex gap-3 items-center'>
                                    <Checkbox className='text-amber-600' sx={{ '& .mui-MuiSvgIcon-root': layoutState.isDark ? { color: 'var(--background)' } : { color: 'var(--foreground)' } }} checked={item.complete} color='success' onClick={() => dispatch(editTask({ id: item.id, complete: !item.complete, importent: item.importent }))} />
                                    <p className={`${layoutState.isDark ? 'text-[var(--background)]' : 'text-[var(--foreground)]'}`}>{item.task}</p>
                                </div>


                                <div className='flex gap-3 items-center'>
                                    <IconButton sx={[layoutState.isDark ? { color: 'var(--background)' } : { color: 'var(--foreground)' }, { p: 0 }]} onClick={() => dispatch(editTask({ id: item.id, complete: item.complete, importent: !item.importent }))}>
                                        {item.importent ? <StarIcon /> : <StarBorderIcon />}
                                    </IconButton>

                                    <IconButton sx={[layoutState.isDark ? { color: 'var(--background)' } : { color: 'var(--foreground)' }, { p: 0 }]} onClick={() => dispatch(deleteTask({ id: item.id }))}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                {countTask(taskState.list, taskTypeState.type).complete > 0 && <p className={`${layoutState.isDark ? 'text-[var(--background)]' : 'text-[var(--foreground)]'}`}>Completed</p>}
                {
                    taskState.list?.map((item, key) => {
                        return (
                            item.complete && checkValid(item) && <div key={item.id} className='flex flex-row justify-between px-2 py-5 border-t-1 border-[#496E4B33]'>
                                <div className='flex gap-3 items-center'>
                                    <Checkbox checked={item.complete} color='success' sx={{ '& .mui-MuiSvgIcon-root': { color: 'white' } }} onClick={() => dispatch(editTask({ id: item.id, complete: !item.complete, importent: item.importent }))} />
                                    <p className={`${layoutState.isDark ? 'text-[var(--background)]' : 'text-[var(--foreground)]'} line-through`}>{item.task}</p>
                                </div>
                                <div className='flex gap-3 items-center'>
                                    <IconButton sx={[layoutState.isDark ? { color: 'var(--background)' } : { color: 'var(--foreground)' }, { p: 0 }]} onClick={() => dispatch(editTask({ id: item.id, complete: item.complete, importent: !item.importent }))}>
                                        {item.importent ? <StarIcon /> : <StarBorderIcon />}
                                    </IconButton>

                                    <IconButton sx={[layoutState.isDark ? { color: 'var(--background)' } : { color: 'var(--foreground)' }, { p: 0 }]} onClick={() => dispatch(deleteTask({ id: item.id }))}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default TaskList