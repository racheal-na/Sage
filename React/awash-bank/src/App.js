
import React from 'react';
import { useSelector,useDispatch} from 'react-redux';

import { add,subtract ,reset} from './Redux/counterSlice';
function App() {
  const count=useSelector(state=>state.counter.value)
  const dispatch = useDispatch();
  return (
    <div style={{textAlign: "center",marginTop:'50'}}>
      <h1>Awash Counter</h1>
      <h1>counter:{count}</h1>
      <div style={{fontSize: "2rem", margin: "20px"}}>{count}</div>
      <button onClick={()=>dispatch(add())}
      style={{padding: "10px 20px",margin: "5px",fontSize: "1rem"}}>ADD</button>
      <button onClick={()=>dispatch(subtract())}
      style={{padding: "10px 20px",margin: "5px",fontSize: "1rem"}}>subtract</button>
      <button onClick={()=>dispatch(reset())}
      style={{padding: "10px 20px",margin: "5px",fontSize: "1rem"}}>Reset</button>
      
    </div>
  );
}

export default App;
