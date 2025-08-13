import { useDispatch } from "react-redux";
import{toggleTask,deleteTask} from"../redux/tasksSlice";


const TaskItem=({task})=>{
    const dispach=useDispatch();
    return(
        <div style={styles.taskItem}>
            <input type="checkbox" checked={task.completed} 
            onChange={()=>dispach(toggleTask(task.id))}
            style={styles.checkbox}/>
            <span style={{...styles.title,...(task.completed && styles.completed)}}>{task.title}</span>
            <button onClick={()=>dispach(deleteTask(task.id))} style={styles.deletedButton}>Delete</button>
    
        </div>
    );
};
const styles ={
    taskItem:{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #add',
        borderRadius: '4px'
    },
    checkbox:{
        marginRight: '1opx'
    },
    title: {
        flexGrow: 1
    },
    completed:{
        TextDecoderation: 'line-through',
        color: '#888'
    },
    deletedButton:{
        backgroundColor: '#ff4444',
        color: 'white',
        border:'none',
        borderRadius: '4px',
        padding: '5px 10px',
        cursor: 'pointer'
    },  
};
export default TaskItem;