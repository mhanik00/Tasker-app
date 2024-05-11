import { useState, useEffect } from 'react'
import image from '../assets/747095.png'
import Nodatafound from './Nodatafound'
import TaskOutput from './TaskOutput'
export default function TaskApp() {

    const [task, setTask] = useState([])

    const [input, setInput] = useState("")

    useEffect(() => {
        const localDbData = localStorage.getItem("taskData");

        if (localDbData) {
            setTask(JSON.parse(localDbData))
        }
    }, [])

    const saveToLocalDb = (task) => {
        localStorage.clear()
        localStorage.setItem("taskData", JSON.stringify(task))
    }

    const submitHandler = () => {
        event.preventDefault();
        task.input = ("") ? alert("please enter a task") :
            setTask(
                (prev) => {
                    return [...prev, { id: crypto.randomUUID(), task: input, isFavorite: false }]
                }
            )
        saveToLocalDb(task)
        setInput("")
    }

    const deleteHandler = (id) => {
        const filterTask = task.filter((task) => task.id != id)
        setTask(filterTask)
        saveToLocalDb(filterTask)
    }

    const favoriteToggler = (taskId) => {
        const newTaskList = task.map((task) => {
            if (task.id === taskId) {
                return {
                    ...task,
                    isFavorite: !task.isFavorite
                }
            } else {
                return task
            }
        })

        saveToLocalDb(newTaskList)

        setTask(newTaskList)
    }

    return (
        <>
            <div className="  bg-sky-900 py-5 flex justify-center items-center shadow shadow-emerald-400">
                <img className='w-16' src={image} ></img>
                <h1 className="text-center  text-amber-400  text-3xl font-bold ml-2">Task App</h1>
            </div>

            <div className=' bg-teal-950 flex flex-col  justify-start items-center mt-5 px-3 py-3  h-64  w-96 mx-auto rounded-2xl shadow shadow-emerald-400' >
                <label className=" text-amber-400  text-4xl font-semibold  my-3" >Add Task</label>

                <input
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    className='block  mt-3 w-80 placeholder: py-3  placeholder: rounded-full placeholder: px-3 placeholder: bg-sky-900' type='text' placeholder='enter your task...' required>
                </input>

                <button onClick={submitHandler} className='  my-7  py-3  rounded-3xl bg-amber-400 w-40'>ADD
                </button>
            </div>

            <div className=' bg-sky-950  mt-5 px-3 py-8   w-96 mx-auto rounded-2xl shadow shadow-emerald-400 text-white' >
                {
                    task.length > 0 ?
                        task.map((task) => {
                            return <TaskOutput
                                key={task.id}
                                task={task}
                                deleteHandler={deleteHandler}
                                favoriteToggler={favoriteToggler}

                            />

                        }) : <div className='flex justify-evenly items-center '>
                            <Nodatafound
                                data="No task found" />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-3 text-amber-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                        </div>
                }
            </div>
        </>
    )
}
