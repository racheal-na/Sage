
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';

import Home from './pages/Home';
import NavBar from './components/NavBar';
import AddTask from './pages/AddTask';
import About from './pages/About';
function App() {
  return (
    <Router>
    <div>
      <NavBar/>
      <div style={{padding:'20px'}}>
        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/add" element={<AddTask/>}/>
          <Route path="/about" element={<About/>}/>

        </Routes>
      </div>
      
    </div>
    </Router>
  );
}

export default App;
