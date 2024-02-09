import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import styled from "styled-components";

const Container = styled.div`
  margin: 10px auto;
  width: 370px;
`;

const App = () => {
    return (
        <React.Fragment>
            <Container>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/login" element={<Login/>} />
                </Routes>
            </Container>
        </React.Fragment>
  );
}

export default App;
