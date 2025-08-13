import React from "react";
import { Outlet } from "react-router-dom";


export default function JobLayout(){
       
    return (
<div>
<h2>Job Openings</h2>
<p>List of Current job opening in our campany.</p>
<Outlet/>

</div>
    );
}