import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name: 'tasks',
    intailState: [
      {id: 1, title: 'Buy groceries',completed: false},
      {id: 1, title: 'Walk the dog',completed: true}
    ],
 reducers: {
    addTask:(state,action)=>{
        const newId=state.length>0?Math.max(...state.map(t =>t.id)) +1 : 1;
        state.push({id: newId,title: action.payload, completed: false});
         
    },
    toggleTask: (state,action)=>{
        const task= state.find(t=>t.id === action.payload);
        if (task) task.completed = !task.completed;
    },
    deleteTask: (state,action)=>{
        return state.filter(t=>t.id !==action.payload);
    }
 }   
});
export const{addTask,toggleTask,deleteTask}= tasksSlice.actions;
export default tasksSlice.reducer;