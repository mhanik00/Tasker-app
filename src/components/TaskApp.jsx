import { useState } from 'react'
import image from '../assets/747095.png'
import Nodatafound from './Nodatafound'
import TaskOutput from './TaskOutput'

export default function TaskApp() {

    const [task, setTask] = useState([])

    const [input, setInput] = useState("")

    const submitHandeler = () => {
        event.preventDefault();

        setTask(
            (prev) => {
                return [...prev, { id: crypto.randomUUID(), title: input }]
            }
        )
        setInput("")
    }
    const deletHandeler = (id) => {
        const filterTask = task.filter((task) => task.id != id)
        setTask(filterTask)
    }

    return (
        <>
            <div className="  bg-sky-900 py-5 flex justify-center items-center shadow shadow-emerald-400">
                <img className='w-16' src={image} ></img>
                <h1 className="text-center  text-violet-300 text-3xl font-bold ml-2">Task App</h1>
            </div>

            <div className=' bg-teal-950 flex flex-col  justify-start items-center mt-5 px-3 py-3  h-64  w-96 mx-auto rounded-2xl shadow shadow-emerald-400' >
                <label className="text-blue-700 text-4xl font-semibold  my-3" >Add Task</label>

                <input
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    className='block  mt-3 w-80 placeholder: py-3  placeholder: rounded-full placeholder: px-3 placeholder: bg-sky-900' type='text' placeholder='enter your task...' required>

                </input>

                <button onClick={submitHandeler} className='  my-7  py-3  rounded-3xl bg-amber-400 w-40'>ADD</button>
            </div>

            <div className=' bg-sky-950  mt-5 px-3 py-8   w-96 mx-auto rounded-2xl shadow shadow-emerald-400 text-white' >
                {
                    task.length > 0 ?
                        task.map((task) => {
                            return <TaskOutput key={task.id} task={task} deletHandeler={deletHandeler} />

                        }) : <Nodatafound
                            data="no data found" />

                }
            </div>

        </>
    )
}
