import React, { useState } from 'react'

export const TasksForm = ({addTasks}) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("To Do")

    const handleSubmit = e => {
        e.preventDefault();
        addTasks(title, description, status)
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

        <button type='submit' className='tasks-btn'> Add Task </button>
    </form>
  )
}
