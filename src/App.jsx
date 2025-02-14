import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import JoinCategory from "./pages/Join/JoinCategory";
import JoinInfo from "./pages/Join/JoinInfo";
import JoinSuccess from "./pages/Join/JoinSuccess";
import User from "./pages/User/User";
import UserReservation from "./pages/User/UserReservation";
import MainPracticeRoom from "./pages/MainPracticeRoom";
import UserPayment from "./pages/User/UserPayment";
import Main from "./pages/Main";
import Owner from "./pages/Owner/Owner";
import OwnerAddPracticeRoom from "./pages/Owner/AddPracticeRoom";
import OwnerRevenue from "./pages/Owner/OwnerRevenue";
import RootContainer from "./Components/RootContainer";
import JoinHeader from "./Components/JoinHeader";
import MainHeader from "./Components/MainHeader";
import Loading from "./pages/Loading";
import OwnerPracticeRoom from "./pages/Owner/OwnerPracticeRoom";
import {ProgressProvider} from "./context/ProgressContext.jsx";

const JoinRoutes = () => {
    return (
            <Routes>
                <Route element={<JoinHeader />}>
                    {/* 회원 가입 대여자 || 이용자 고르는 페이지 */}
                    <Route path="/category" element={<JoinCategory />} />
                    {/* 이용자 & 대여자 회원 가입 정보 페이지 */}
                    <Route path="/:role/info" element={<JoinInfo />} />
                </Route>
                {/* 회원가입 성공 페이지 */}
                <Route path="/:role/success" element={<JoinSuccess />} />
            </Routes>
    );
};

const UserRoutes = () => {
    return (
        <Routes>
            {/* 결제 페이지 */}
            <Route path="/practiceRoom/:id/payment" element={<UserPayment />} />
            {/* 예약 결제 콜백 페이지 */}
            <Route path="/payment/loading" element={<Loading />} />
            <Route element={<MainHeader />}>
                {/* 예약 내역 페이지 */}
                <Route path="/reservation" element={<UserReservation />} />
                {/* 마이 페이지 */}
                <Route path="/" element={<User />} />
            </Route>
        </Routes>
    );
};

const OwnerRoutes = () => {
    return (
        <Routes>
            <Route element={<MainHeader />}>
                {/* 대여자 메인 페이지 */}
                <Route path="/" element={<Owner />} />
                {/* 대여자 수익 페이지 */}
                <Route path="/revenue" element={<OwnerRevenue />} />
            </Route>
            {/* 대여자 내부방 목록 페이지 */}
            <Route path="/practiceRoom" element={<OwnerPracticeRoom />} />
            {/* 대여자 내부방 변경 페이지 */}
            <Route
                path="/practiceRoom/:practiceRoomId/practiceRoomDetail/:practiceRoomDetailId"
                element={<OwnerAddPracticeRoom />}
            />
            {/* 대여자 연습실 내부 방 추가 페이지 */}
            <Route
                path="/practiceRoom/:practiceRoomId/practiceRoomDetail"
                element={<OwnerAddPracticeRoom />}
            />
        </Routes>
    );
};

function App() {
    return (
        <ProgressProvider>

            <BrowserRouter>
                <Routes>
                    <Route element={<RootContainer />}>
                        {/* 메인 페이지 */}
                        <Route element={<MainHeader />}>
                            <Route path="/" element={<Main />} />
                        </Route>
                        {/* 연습실 내부 방 페이지 */}
                        <Route
                            path="/practiceRoom/:id"
                            element={<MainPracticeRoom />}
                        />

                        {/* 로그인 */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/login/loading" element={<Loading />} />

                        {/* 회원가입 */}
                        <Route path="/join/*" element={<JoinRoutes />} />

                        {/* 유저 */}
                        <Route path="/user/*" element={<UserRoutes />} />

                        {/* 대여자 */}
                        <Route path="/owner/*" element={<OwnerRoutes />} />

                    </Route>
                </Routes>
            </BrowserRouter>
        </ProgressProvider>    
    );
}

export default App;
