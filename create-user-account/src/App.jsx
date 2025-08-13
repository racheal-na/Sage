import { useState } from "react";
import "./App.css";

function App(){
    const[values, setValues]=useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        contact: '',
        hobbi: '',
        resume: '',
        url: '',
        about: '',
    })

    const handleChanges = (e)=>{
         setValues({...values,[e.target.name]:[e.target.value]})
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        alert("...values"+values.about)
        console.log(values)
    }

    const RestFun = ()=>{
        setValues({firstName: '',
        lastName: '',
        email: '',
        gender: '',
        contact: '',
        hobbi: '',
        resume: ''})
    }
    return(
        <div className="container">
            <h1>User Acount</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name*</label> 
            <input type="text" id="firstName" placeholder="Enter First Name" name="firstName" required
            onChange={(e)=>handleChanges(e)} value={values.firstName}
            />

            <label htmlFor="lastName">Last Name*</label> 
            <input type="text" id="lastName" placeholder="Enter Last Name" name="lastName" required
             onChange={(e)=>handleChanges(e)} value={values.lastNamestName}
            />
       
            <label htmlFor="email">Email*</label> 
            <input type="email" id="email" placeholder="Enter Email" name="email" required
             onChange={(e)=>handleChanges(e)} value={values.email}
            />   
 
            <label htmlFor="contact">Contact*</label> 
            <input type="text" id="contact" placeholder="Enter #" name="contact" required
             onChange={(e)=>handleChanges(e)}
            />
        
            <label htmlFor="gender">Gender*</label> 
            <input type="radio" id="female" name="gender" required
             onChange={(e)=>handleChanges(e)}/>Male
            <input type="radio" id="female" name="gender" required
             onChange={(e)=>handleChanges(e)}/>Female
        
            <label htmlFor="age">Age*</label> 
            <input type="text" id="age" placeholder="Enter age" name="age" required
             onChange={(e)=>handleChanges(e)}
            />

            <label htmlFor="hobi">Hobbi*</label> 
            <select id="hobbi" name="hobbi"  onChange={(e)=>handleChanges(e)}>
                <option value="music">Music</option>
                <option value="football">Football</option>
                <option value="drawing">Drawing</option>
                <option value="swimming">Swimming</option>
              
            </select>
            <label htmlFor="resume">Resume</label>
            <input type="file" placeholder="Select Resume" name="resume"  onChange={(e)=>handleChanges(e)}/>
         
            <label htmlFor="url">URL</label>
            <input type="text" id="url" placeholder="Enter URL"  name="url" onChange={(e)=>handleChanges(e)}/>
          
           <label htmlFor="about">About</label>
           <textarea name="about" id="about" cols={30} rows={10}  onChange={(e)=>handleChanges(e)} placeholder="Enter Description"></textarea>

           <button type="button"onClick={RestFun}>Rest</button>
            <button type="submit">Submit</button>
          </form> 
        </div> 
    );
}
export default App;