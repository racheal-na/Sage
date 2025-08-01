import Button from "./Components/Button"
import "./App.css"
import{useState} from "react";
function App(){
   const [counter,setCounter] =useState(1);
 return (
   <div>
     <h1>First Component</h1>
     <Button name="Log in"/>
     <br/>
     <br/>
     <Button name="Sign Up"/>
      <br/>
      <br/>
     <Button name="Register"/>
      <br/>
     <br/>
     <Button name="verify"/>
   <br/>
   {/* <div classNme="counter"> */}
   <button onClick={()=>setCounter(counter + 1)}>Add</button>
   <h1 style={{display: 'inline',margin:'0 10px'}}>{counter}</h1>
  <button onClick={()=>setCounter(counter - 1)}>Subtract</button>
  {/* </div>  */}
  </div>
 );
}

export default App