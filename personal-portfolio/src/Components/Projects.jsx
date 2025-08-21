import logoTwo from '../image/p1.jpg'
import logoThree from '../image/p2.jpg'
import logoFour from '../image/p3.jpg'
const Projects = () => {
  return (
    <>
         <p className='projectTitle'>Recent Projects</p> 
    
    
          <div className='project'>
        
         
          
    
        <div className='projectCardContainer'>
              
                 
                 
                    <img src={logoTwo} alt="" className='projectLogo'/>
                   
                 

                  <p className='projectName'>Business Website</p> 
                   
                  <p className='projectDiscription'>
    
                    Proficient in building dynamic, responsive, and 
                    component-based web applications using React.js. 
                    Skilled in state management (Redux, Context API), 
                    React hooks, and optimizing performance for 
                    scalable front-end solutions.
                  </p>
               </div>  
    
    
    
                   <div className='projectCardContainer'>
              
                 
                 
                    <img src={logoThree} alt="" className='projectLogo'/>
                    
               
                 <p className='projectName'>E-commerce</p> 
                   
                  <p className='projectDiscription'>
    
                    Experienced in developing fast and efficient back-end applications with Node.js. 
                    Strong knowledge of RESTful APIs, 
                    Express.js, and asynchronous programming, 
                    with expertise in building scalable and secure server-side applications.
                  </p>
               </div>   
             
    
    
              <div className='projectCardContainer'>
              
                 
                 
                    <img src={logoFour} alt="" className='projectLogo'/>
                    
                 
                 <p className='projectName'>Landing Page</p> 
                   
                  <p className='projectDiscription'>
    
                    Strong foundation in JavaScript for building interactive and 
                    dynamic web applications. Proficient in ES6+ features, 
                    DOM manipulation, asynchronous programming (Promises, async/await), 
                    and integrating JavaScript with modern frameworks and libraries.
                  </p>
               </div> 
    
               
          
        </div>
        </>
       
  )
}

export default Projects