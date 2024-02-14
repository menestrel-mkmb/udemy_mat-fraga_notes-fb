import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Register from "../pages/Register";
import Notes from "../pages/Notes";

export default function RoutesApp(){
    return(
        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/notes' element={ <Notes /> } />
            <Route path='/register' element={ <Register /> } />
        </Routes>
    )
}