
import { HeartIcon } from '@heroicons/react/24/outline'

import { HeartIcon as HeartFill, TrashIcon, } from '@heroicons/react/24/solid'

export default function TaskOutput({ deleteHandler, task, favoriteToggler }) {

    return (
        <div className='flex justify-between mx-2 mt-2 border-b  border-b-amber-200 pb-2  font-sans text-xl'>

            <p className={`font-semibold ${task.isFavorite ? " text-amber-400 " : "text-white"}`}>
                {task.task}
            </p>

            <button onClick={() => favoriteToggler(task.id)}>
                {
                    task.isFavorite ?
                        <HeartFill className="h-5 w-5  text-amber-400 " />
                        :
                        <HeartIcon className="h-5 w-5  text-amber-400  " />
                }
            </button>

            <button onClick={() => deleteHandler(task.id)}>
                <TrashIcon className='h-5 w-5  text-amber-400 ' />
            </button>

        </div>
    )
}
