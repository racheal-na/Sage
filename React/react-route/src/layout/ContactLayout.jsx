import React from "react";
import Contact from "../pages/Contact";
import { Outlet } from "react-router-dom";


export default function ContactLayout(){
    return(
     <div>
        <Contact/>
        <Outlet/>
     </div>
        
    );
}