import React from "react";
import imgp from "./imgp.webp";
import '../index.css';
export default function Portfolio(){
  const handleClick=()=>{
    alert("Thank you for reaching out! Please email me at rahelna716@gmail.com");
    document.getElementById('contact').scrollIntoView({behavior:'smooth'});
  };  
return(
  <section className="hero">
  <div className="container">
    <div className="profile">
        <img src={imgp} alt="profile-Img" className="image"/>
        <div className="Image-frame"></div>
    </div>
    <div className="content">

    <h1>Hi, I am Rahel</h1>
    <h2>Full-Stack Developer</h2>
    <p className="subtitle">I started building websites as a hobby, but my curiosity to understand how data is stored and managed led me to the back end. Now, I love the challenge of building a complete product from a single idea, focusing on creating efficient and scalable applications that are also a joy to use."</p>
    <div className="divider"></div>
    <button className="cta-button" onClick={handleClick}>Get In Touch</button>
  
    </div>
  </div>

  </section>  

);

    }
