
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksSlice";

export default function AddTask(){
const [title,setTitle] = useState();
const dispatch=useDispatch();
const navigate = useNavigate();
const [priority,setPriority]=useState('medium')
const [error,setError]=useState();
const handleSubmit=(e)=>{
    e.preventDefault();
    if (!title.trim()){
        setError('Task title is required');
        return;
    }
    dispatch(addTask(title));
        setTitle(' ');
        navigate('/home');

};

return (
        <div className="add-task"> 
          <h1>Add New Tasks</h1>
          <form onSubmit={handleSubmit} className="task-form">

            {error && <p className="error-masage">{error}</p>}
            <div className="form-group">
                <label htmlFor="title">Task Title</label>
                <input type="text" id="title" value={title}
                onChange={(e)=>setTitle(e.target.value)} placeholder="Enter Task Title"
                className={error ? 'input error':' '} requred/>
                </div>
               <br/>
               <br/>
               <div className=".form-group ">
               <label htmlFor="priority">priority</label>
               <select id="priority" value={priority} 
               onChange={(e)=>setPriority(e.target.value)}>
                <option value='high'>High</option>
                <option value='medium'>Medium</option>
                <option value='small'>Small</option>
                
               </select>
               </div>
               <div className="form-action">
              <button type="button" className="cancel-btn" onClick={()=>navigate('/')}>cancel</button>                
              <button type="button" className="add-btn" onClick={()=>navigate('/')}>Add Task</button>                
            

            </div>
          </form>
        </div>
    );
};
