import { Routes, Route } from "react-router-dom";

import PrivateRouter from "./PrivateRouter";

import Home from "../pages/Home";
import Register from "../pages/Register";
import Notes from "../pages/Notes";

export default function RoutesApp(){
    return(
        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/register' element={ <Register /> } />

            <Route path='/notes' element={ <PrivateRouter><Notes /></PrivateRouter> } />
        </Routes>
    )
}