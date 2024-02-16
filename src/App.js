import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BoardList from "./pages/BoardList";
import BoardDetail from "./pages/BoardDetail";

const App = () => {
    return (
        <React.Fragment>
            <div style={{margin: '10px auto',width: '370px'}}>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/board" element={<BoardList/>} />
                    <Route path="/board/:seq" element={<BoardDetail/>} />
                </Routes>
            </div>
        </React.Fragment>
    );
}

export default App;
