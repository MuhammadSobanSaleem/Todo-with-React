import {useState} from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import empty_state_img from '../assets/images/empty_state-no-bg.png'


function TodoApp(){

    const [newTask, setNewTask] = useState("")
    const [tasks, setTask] = useState([])
    const [editIndex, setEditIndex] = useState(null)
    const [isBlocked, setIsBlocked] = useState('blocked-btn')

    function handleInputChange(event){
        setNewTask(event.target.value)
        if(event.target.value.length === 0 || (editIndex && tasks[editIndex] === event.target.value)) {
            setIsBlocked('blocked-btn')
        }else{
            setIsBlocked('unblocked-btn')
        }
    }

    function addOrSaveTask(){
        if(newTask.trim() === "") return

        if(editIndex !== null){
            const updatedTasks = [...tasks]
            updatedTasks[editIndex] = newTask
            setTask(updatedTasks)
            setEditIndex(null)
            setNewTask("")
            setIsBlocked('blocked-btn')

            MySwal.fire({
                toast: true,
                icon: "success",
                position: "top",
                showConfirmButton: false,
                timer: 1500,
                title: "Task updated successfully",
                background: "#1e1e1e",
                color: "#d3d3d3",
                timerProgressBar: true,
            });
        }else{
            setTask([...tasks, newTask])
            setNewTask("")
            setIsBlocked('blocked-btn')

            MySwal.fire({
                toast: true,                  // makes it a toast notification
                position: 'top',           // top-right corner (other options: 'top-start', 'bottom-end', etc.)
                showConfirmButton: false,      // no OK button
                timer: 2000,                   // auto close after 2 seconds
                timerProgressBar: true,        // optional progress bar
                icon: 'success',                  // optional: 'success', 'error', 'warning', 'info', 'question'
                title: 'Task added successfully',                // the text you want to show
                background: '#1e1e1e',         // dark black background
                color: '#d3d3d3',      
                showCloseButton: false, 
                
            });

        }

    };

    function deleteTask(index) {
        const taskName = tasks[index]; // save task name

        // Confirmation modal
        MySwal.fire({
            title: <p>Are you sure?</p>,
            html: <i>Do you want to delete <b>{taskName}</b>?</i>,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel',
            background: '#1e1e1e',
            color: '#d3d3d3',
            customClass: { popup: 'my-toast' }
            }).then((result) => {

                if (result.isConfirmed) {
                // Delete the task
                const updatedTasks = tasks.filter((_, i) => i !== index);
                setTask(updatedTasks);

                // Success toast
                MySwal.fire({
                    toast: true,
                    icon: 'success',
                    position: 'top',
                    showConfirmButton: false,
                    timer: 1500,
                    title: `${taskName} deleted`,
                    background: '#1e1e1e',
                    color: '#d3d3d3',
                    timerProgressBar: true,
                    });
                    }
                });
    }

    function editTask(index){
        const allTasks = [...tasks]
        setEditIndex(index)
        setNewTask(allTasks[index])
    
        setTimeout(() => {
            const input = document.querySelector('input')
            if(input){
                input.focus()
            }
        }, 0);

    }

    function moveUp(index){
        if(index == 0) return
        let updatedTask = [...tasks];
        [updatedTask[index], updatedTask[index - 1]] = [updatedTask[index - 1], updatedTask[index]]

        setTask(updatedTask)
    }

    function moveDown(index){
        if(index == tasks.length - 1) return
        let updatedTask = [...tasks];
        [updatedTask[index], updatedTask[index + 1]] = [updatedTask[index + 1], updatedTask[index]]

        setTask(updatedTask)
    }


    return(
    <div className='container'>

        <h1>TODO LIST</h1>
        <div className="input-container">

            <input 
            type="text" 
            value={newTask}
            onChange={handleInputChange}
            placeholder='Enter Task...' 
            autoFocus={editIndex !== null}
            onKeyDown={(e)=>{
                if(e.key === 'Enter') addOrSaveTask()
                }}
            />

        {editIndex !== null ? 
            <div className="edit-save-btn">
                <button type="submit" onClick={addOrSaveTask} className={`submit ${isBlocked}`}>Save Task</button>
                <button className='cancel-edit' onClick={()=>{
                    setEditIndex(null)
                    setNewTask("")
                    }}>Cancel</button>
            </div>

        : <button type="submit" onClick={addOrSaveTask} className={`submit ${isBlocked}`}>Add Task</button> }
        </div>
        

        <div className="task-container">
            <h2>Tasks</h2>
            {tasks.length === 0 && (
                <div className="empty-tasks">
                    <img src={empty_state_img} alt="Empty Tasks" />
                </div>
            )}
            {tasks.length > 0 && (       
                <ol className="todos">
                    {tasks.map((task, index)=>(
                        <li key={task + index}>

                            <span className="text">{task}</span>

                            <div className="buttons">
                                <button onClick={()=>{deleteTask(index)}} className="delete" ><i className="fa-solid fa-trash fa-lg" style={{color: "#ffffff"}}></i></button>
                                <button onClick={()=>{editTask(index)}} className="edit"><i className="fa fa-edit fa-lg" style={{ color: "#ffffff" }}></i></button>

                                <div className="up-down-btn">
                                    <button onClick={()=>{moveUp(index)}} className="move-up"><i className="fa-solid fa-arrow-up" style={{color: "#ffffff;"}}></i></button>
                                    <button onClick={()=>{moveDown(index)}} className="move-down"><i className="fa-solid fa-arrow-down" style={{color: "#ffffff;"}}></i></button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            )}
        </div>

    </div>
  )
}

export default TodoApp