import React from 'react'
import logoOne from '../image/react.png'
import logoTwo from '../image/node.png'
import logoThree from '../image/js.png'
import logoFour from '../image/ui.png'
const Skill = () => {
  return (
    <>
     <p className='skillTitle'>My Expertise</p> 


      <div className='skill'>
    
     
      

    <div className='skillCardContainer'>
          
             
             <div className='cardTitleContainer'>
                <img src={logoOne} alt="" className='logo'/>
                <p className='skillName'>React</p> 
             </div>
               
              <p className='skillDiscription'>

                Proficient in building dynamic, responsive, and 
                component-based web applications using React.js. 
                Skilled in state management (Redux, Context API), 
                React hooks, and optimizing performance for 
                scalable front-end solutions.
              </p>
           </div>  



               <div className='skillCardContainer'>
          
             
             <div className='cardTitleContainer'>
                <img src={logoTwo} alt="" className='logo'/>
                <p className='skillName'>Node.js</p> 
             </div>
               
              <p className='skillDiscription'>

                Experienced in developing fast and efficient back-end applications with Node.js. 
                Strong knowledge of RESTful APIs, 
                Express.js, and asynchronous programming, 
                with expertise in building scalable and secure server-side applications.
              </p>
           </div>   
         


          <div className='skillCardContainer'>
          
             
             <div className='cardTitleContainer'>
                <img src={logoThree} alt="" className='logo'/>
                <p className='skillName'>JavaScript</p> 
             </div>
               
              <p className='skillDiscription'>

                Strong foundation in JavaScript for building interactive and 
                dynamic web applications. Proficient in ES6+ features, 
                DOM manipulation, asynchronous programming (Promises, async/await), 
                and integrating JavaScript with modern frameworks and libraries.
              </p>
           </div> 

           <div className='skillCardContainer'>
          
             
             <div className='cardTitleContainer'>
                <img src={logoFour} alt="" className='logo'/>
                <p className='skillName'>UI/UX Design</p> 
             </div>
               
              <p className='skillDiscription'>

                Skilled in designing intuitive, user-friendly interfaces that enhance user experiences.
                Experienced with wireframing, prototyping, and 
                applying design principles to create visually appealing and functional 
                digital products.
              </p>
           </div> 
      
    </div>
    </>
   
  )
}

export default Skill
