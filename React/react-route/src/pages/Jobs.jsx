import React from "react";
import { Link, useLoaderData } from "react-router-dom";


export default function Jobs(){
       const jobsData=useLoaderData()
    return (
        
<div>


    {jobsData.map((job)=>{
        return <Link>
        <h3>{job.title}</h3>
        <p>{job.location}</p>
        </Link>
    })}



</div>
        
        
        
    );
}
export const jobsLoader= async ()=>{
 const res=await fetch("http://localhost:50000/jobs")
 return res.json();
}