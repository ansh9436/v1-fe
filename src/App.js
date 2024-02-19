import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BoardList from "./pages/BoardList";
import BoardDetail from "./pages/BoardDetail";
import Mypage         from "./pages/Mypage";
import MypageNickname from "./pages/MypageNickname";
import MypageEmail from "./pages/MypageEmail";
import MypagePasswd from "./pages/MypagePasswd";
import MypageWithdrawal from "./pages/MypageWithdrawal";
import MypageBoard from "./pages/MypageBoard";

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
                    <Route path="/mypage" element={<Mypage/>} />
                    <Route path="/mypage/nickname" element={<MypageNickname/>} />
                    <Route path="/mypage/email" element={<MypageEmail/>} />
                    <Route path="/mypage/passwd" element={<MypagePasswd/>} />
                    <Route path="/mypage/withdrawal" element={<MypageWithdrawal/>} />
                    <Route path="/mypage/board/:myBoardAct" element={<MypageBoard/>} />
                </Routes>
            </div>
        </React.Fragment>
    );
}

export default App;
