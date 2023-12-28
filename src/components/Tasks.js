import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const Tasks = ({task, toggleComplete, deleteTask, editTask}) => {
  return (
    <div className='Tasks'>
        <p onClick={ () => toggleComplete(task.id) } className={`${ task.status === 'Done' ? 'completed':''}`}> title : {task.title} , description : {task.description} , status : {task.status}</p>
            <div>
                <FontAwesomeIcon icon={faPenToSquare} onClick={ () => editTask(task.id) }/>
                <FontAwesomeIcon icon={faTrash} onClick={ () => deleteTask(task.id) } />
            </div>
        </div>
  )
}
