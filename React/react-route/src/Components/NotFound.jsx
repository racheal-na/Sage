import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound(){
    const navigate = useNavigate()
    return(
    
        <div>
            <h2 style={{color: 'red'}}>404 | Page not found </h2>
            <p>💿 Hey developer 👋
You can provide a way better UX than this when your app throws errors by providing your own ErrorBoundary or errorElement prop on your route.</p>

        <br/>
        <button onClick={()=>navigate('/')}>Go to home Page</button>
        </div>
    );
}