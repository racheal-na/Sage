import React from "react";


export default function ContactForm(){

    return(
        <div>
          <form>
            <input type="text" placeholder="Name"required/>
            <br/>
            <input type="email" placeholder="Email"required/>
            <br/>
            <textarea placeholder="message"></textarea>
            <br/>
            <button type="submit" >Submit</button>
          </form> 
        </div>
    );
}