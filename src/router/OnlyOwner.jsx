import { Navigate, Outlet } from "react-router-dom";

const OnlyAdmin = () => {
    if (localStorage.getItem("userType") != "OWNER") {
        alert("연습실 대여자만 이용가능한 페이지 입니다.");
    }

    return localStorage.getItem("userType") == "OWNER" ? (
        <Outlet />
    ) : (
        <Navigate to={"/"} />
    );
};

export default OnlyAdmin;
