import React from 'react';
import {  NavLink,useNavigate } from 'react-router-dom';



export default function NavBar(){
    const navigate= useNavigate();
    return(
        <div>
            
        <ul>
    <NavLink to='/'><li>Home</li></NavLink>
    <NavLink to='/addTask'><li>Add Tasks</li></NavLink>
    <NavLink to='/about'><li>About Us</li></NavLink>
    </ul>
    <button onClick={()=> navigate('/', {replace: true})}>Get Started</button>
        </div>
    
);
}