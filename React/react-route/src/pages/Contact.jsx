import React from "react";
import { useNavigate } from "react-router-dom";


export default function Contact(){
      const navigate = useNavigate()
    return (
<div>
<h1>Contact Page</h1>
<div className="contact-buttons">
    <button onClick={()=>navigate('info')}>Contact Info</button>
    <br/>
    <button onClick={()=>navigate('form')}>Contact Form</button>
</div>




</div>
        
        
        
    );
}