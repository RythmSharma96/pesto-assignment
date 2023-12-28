import React, { useState } from 'react'

export const EditTasksForm = ({editTaskContent, task}) => {
    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)
    const [status, setStatus] = useState(task.status)

    const handleSubmit = e => {
        e.preventDefault();
        editTaskContent(title, description, status, task.id)
        setTitle("") 
        setDescription("") 
        setStatus("To Do")
    }

  return (
    <form className='TasksForm' onSubmit={ handleSubmit }>
        
        <input type = 'text' className='tasks-input' value={title} placeholder='title' onChange={ (e) => setTitle(e.target.value) }/>
       
        <input type = 'text' className='tasks-input' value={description} placeholder='description' onChange={ (e) => setDescription(e.target.value) }/>
        
        <select value={status} className='tasks-status' onChange={ (e) => setStatus(e.target.value)} >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
        </select>

        <button type='submit' className='tasks-btn'> Update </button>
    </form>
  )
}
