import { Navigate, Outlet } from "react-router-dom";

const BlockAdmin = () => {
    if (localStorage.getItem("userType") == "OWNER") {
        alert("연습실 대여자는 이용 불가능한 페이지 입니다.");
    }

    return localStorage.getItem("userType") == "OWNER" ? (
        <Navigate to={"/owner"} />
    ) : (
        <Outlet />
    );
};

export default BlockAdmin;
