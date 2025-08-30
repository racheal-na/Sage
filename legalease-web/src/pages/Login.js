// import { useState } from "react";
// import api from "../api";
// import { useNavigate } from "react-router-dom";


// export default function Login(){
//     const [email,setEmail]=useState('');
//     const [password,setPassword]=useState("");
//     const navigate = useNavigate();

//     const handleSubmit = async(e)=>{
//         e.preventDefault();
//         try{
//             const {data}=await api.post("./auth/login",{email,password});
//             localStorage.setItem("token",data.token);
//             navigate("/dashboard");
        
//         }catch (err){
//            alert("Login failed");
//         }
//     };
//     return(
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                  <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// }