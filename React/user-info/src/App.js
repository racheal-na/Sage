
import {userState,useEffect, useState} from "react";
function App() {
  
    const[users,setUsers] = useState([]);
    useEffect(()=>{
      fetch('https://jsonplaceholder.typicode.com/users')
      .then((res)=>res.json())
      .then((data)=>setUsers(data));
    },[users]);
    
    return (
    
      <div>
  {users.map((user,index)=>(<h1 style={{color:"white",backgroundColor: "orange"}}>{user.name} {user.email}</h1>
  ))}
      
    </div>
     
  );
}

export default App;
