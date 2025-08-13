import React from "react";

import NavBar from "../Components/NavBar";
import { Outlet } from "react-router-dom";

export default function RootLayout(){
    return(
        <div>
       <NavBar/>
       <div className="container">
       <Outlet/>
       </div>

        </div>
    )
}