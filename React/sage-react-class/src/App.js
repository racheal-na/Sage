import Button from "./Components/Button"
import "./App.css"
import{useState} from "react";
import LogAndLogout from "./Components/Conditional/LoginAndLogout";
import StatusBadge from "./Components/Conditional/StatusBadge";
import UseEffectHook from "./Components/UseEffectHook";
import ReactList from "./Components/ReactList";
import Card from "./Components/Card.jsx";
function App(){
   const [counter,setCounter] =useState(1);
 return (
     <div>
     
     <h1>First Component</h1>
     <Button style={{color: "red"}} name="Log in"/>
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
   <br/>
   {/* <div classNme="counter"> */}
   <button style={{color: "white",backgroundColor: "orangered"}} onClick={()=>setCounter(counter + 1)}>Add</button>
   <br/>
   <h1 style={{display: 'inline',margin:'0 10px',color: "white",backgroundColor: "orangered"}}>{counter}</h1>
  <br/>
  <button  style={{color: "white",backgroundColor: "orangered"}} onClick={()=>setCounter(counter - 1)}>Subtract</button>
  {/* </div>  */}
  <LogAndLogout/>
  <StatusBadge/>
  <ReactList/>
  <UseEffectHook/>
   <Card/>
  </div>
 );
}

export default App