import {useState} from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

function TodoApp(){

    const [newTask, setNewTask] = useState("")
    const [tasks, setTask] = useState(["Dishes", "Bath", "Dinner"])
    // const [addEdit, setAddEdit] = useState('Add Task')

    function handleInputChange(value){
        setNewTask(value)
    }

    function addTask(){
        if(newTask === "") return
        setTask([...tasks, newTask])
        setNewTask('')
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

    // function editTask(index){
    // }

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
    <>
        <h1>TODO LIST</h1>
        <input 
        type="text" 
        value={newTask}
        onChange={()=>{handleInputChange(event.target.value)}}
        placeholder='Enter Task...' 
        />
        <button type="submit" onClick={addTask} className='submit'>Add Task</button>

        <div className="container">
            <h2>Tasks</h2>
            <ol className="todos">
                {tasks.map((task, index)=>(
                    <li key={index}>
                        <span className="text">{task}</span>
                        <div className="buttons">
                            <button onClick={()=>{deleteTask(index)}} className="delete" ><i className="fa-solid fa-trash fa-lg" style={{color: "#ffffff"}}></i></button>
                            <button className="edit"><i className="fa fa-edit fa-lg" style={{ color: "#ffffff" }}></i></button>
                            <div className="up-down-btn">
                                <button onClick={()=>{moveUp(index)}} className="move-up"><i className="fa-solid fa-arrow-up" style={{color: "#ffffff;"}}></i></button>
                                <button onClick={()=>{moveDown(index)}} className="move-down"><i className="fa-solid fa-arrow-down" style={{color: "#ffffff;"}}></i></button>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
        </div>

    </>
  )
}

export default TodoApp