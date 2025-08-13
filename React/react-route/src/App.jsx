
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import About from "./pages/About";
import RootLayout from "./layout/RootLayout";
import ContactLayout from "./layout/ContactLayout";
import ContactInfo from "./Components/ContactInfo";
import ContactForm from "./Components/ContactForm";
import NotFound from "./Components/NotFound";
import JobLayout from "./layout/JobsLayout";
import Jobs, { jobsLoader } from "./pages/Jobs";


function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='products' element={<Product/>}/>
         <Route path='about' element={<About/>}/>
          <Route path='contact' element={<ContactLayout/>}>
             <Route path='info' element={<ContactInfo/>}/>
             <Route path='form' element={<ContactForm/>}/>

          </Route>
          <Route path='jobs' element={<JobLayout/>}>
              <Route index element={<Jobs/>} loader={jobsLoader}/>
          </Route>
          <Route path='*' element={<NotFound/>}/>
    </Route>
  ))
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
