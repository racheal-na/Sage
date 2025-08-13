
import Logo from './Logo.png';
import {  NavLink,useNavigate } from 'react-router-dom';
export default function NavBar(){
       const navigate= useNavigate();
    return (
<div className='navbar'>
<img src={Logo} alt="logo"/>
<ul>
    <NavLink to='/'><li>Home</li></NavLink>
    <NavLink to='/products'><li>Product</li></NavLink>
    <NavLink to='/about'><li>About Us</li></NavLink>
    <NavLink to='/contact'> <li>Contact Us</li></NavLink>
    <NavLink to='/jobs'> <li>Jobs</li></NavLink>
</ul>
<button onClick={()=> navigate('/contact', {replace: true})}>Get Started</button>

</div>
        
        
        
    );
}