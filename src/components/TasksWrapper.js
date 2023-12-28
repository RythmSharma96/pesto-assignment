import React, { useEffect, useState } from 'react'
import { TasksForm } from './TasksForm'
import { v4 as uuidv4 } from 'uuid'
import { Tasks } from './Tasks';
import { EditTasksForm } from './EditTasksForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
uuidv4();

export const TasksWrapper = () => {
    const[tasks, setTasks] = useState([]);
    const[filteredTasks, setFilteredTasks] = useState([]);
    const[taskListUpdated, setTaskListUpdated] = useState(false);
    const notifyError = () => toast.error("Title is mandatory for adding task!");
    const notifySuccess = () => toast.success("Task added Successfully!")

    const addTasks = (title, description, status) => {
        //call a post api
        addNewTask(title, description, status)
        // setTasks([...tasks, {id : uuidv4(), task : title, description : description, status : status, completed : false, isEditing : false}])
    }

    const toggleComplete = id => {
        setFilteredTasks(filteredTasks.map(task => task.id === id ? {...task, completed : !task.completed} : task))
    }

    const deleteTask = id => {
        deleteTaskcall(id, 'delete')
    }

    const editTask = id => {
        setFilteredTasks(filteredTasks.map(task => task.id === id ? {...task, isEditing : !task.isEditing} : task))
    }

    const editTaskContent = (title, description, status, id) => {
        updateTask(id, title, description, status)
        tasks.map(task => task.id === id ? {...task, isEditing : false} : task)
    }

    const filterByStatus = status => {
        if(status === 'All')
            setFilteredTasks(tasks)
        else{
            setFilteredTasks(tasks.filter(task => task.status === `${status}`))
        }
    }

    function addNewTask(title, description, status) {
        fetch('http://localhost:8000/tasks/task', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
             title : title,
             description : description,
             status : status,
             isEditing : false
            })})
        .then(response => {
            if(!response.ok) throw new Error(response.error);
            else return response.json()
        })
        .then(json => {
            console.log("Saved !! : " + JSON.stringify(json))
            setTaskListUpdated(!taskListUpdated)
            notifySuccess();
        })
        .catch(
            error => {
                console.error(error)
                notifyError(); //only using this for title validation error; ideally this can handle any error message
        });
    }

    function updateTask(id, title, description, status) {
        fetch(`http://localhost:8000/tasks/task/${id}/`, {
            method : 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
             title : title,
             description : description,
             status : status
            })})
        .then(response => response.json())
        .then(json => {
            console.log("Updated :" + JSON.stringify(json))
            setTaskListUpdated(!taskListUpdated)
        })
        .catch(error => console.error(error));
    }
    
    function deleteTaskcall(id) {
        fetch(`http://localhost:8000/tasks/task/${id}/`, {
            method : 'delete',
        })
        .then(response => response)
        .then(json => {
            setTaskListUpdated(!taskListUpdated)
        })
        .catch(error => console.error(error));
    }

    useEffect(() => {
        fetch('http://localhost:8000/tasks/taskList/')
        .then(response => response.json())
        .then(json => {
            setTasks(json)
            setFilteredTasks(json)
            document.getElementById("filter").selectedIndex = 0;
        })
        .catch(error => console.error(error));
    }, [taskListUpdated])

  return (
    <div className='TasksWrapper'>
        <h1>What is your next task?</h1>
    <TasksForm addTasks={addTasks} />
    {(() => {
        if (tasks.length > 0) {
          return <select id = "filter" onChange={ (e) => filterByStatus(e.target.value)} className='tasks-status' >  
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
          </select>;
        }
      })()}
    {filteredTasks.map((task, index) => (
        task.isEditing ? (
            <EditTasksForm task = {task} editTaskContent={editTaskContent}/>
        ) : 
        (
            <Tasks task = {task} key = {index} toggleComplete = {toggleComplete} deleteTask = {deleteTask} editTask = {editTask}/>
        )
    ))}
    {/* <button onClick={notifyError}>Notify!</button> */}
     <ToastContainer
     position="top-center"
     autoClose={2000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
     theme="dark" />
    </div>
  )
}