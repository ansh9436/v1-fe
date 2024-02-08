import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Board from "./pages/Board";
import BoardDetail from "./components/Board/BoardDetail";
import MyPage from "./pages/MyPage";

const Container = styled.div`
  margin: 10px auto;
  width: 370px;
`;

const App = () => {
    return (
        <Container>
            <Routes>
                <Route path="/" component={<Board/>} />
                <Route path="/board" component={<Board/>} />
                <Route path="/board/:boardId" component={<BoardDetail/>} />
                <Route path="/register" component={<Register/>} />
                <Route path="/login" component={<Login/>} />
                <Route path="/mypage" component={<MyPage/>} />
            </Routes>
        </Container>
  );
}

export default App;
