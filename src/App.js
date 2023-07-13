import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Add from "./pages/Add";
import Videogames from "./pages/Videogames";
import Update from "./pages/Update";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import "./style.css";


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path="/" element ={<Videogames/>}/>  
      <Route path="/add" element ={<Add/>}/> 
      <Route path="/update/:id" element ={<Update/>}/>  
      <Route path="/registration" element ={<Registration/>}/> 
      <Route path="/login" element ={<Login/>}/> 
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
