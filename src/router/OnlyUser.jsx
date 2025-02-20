import { Navigate, Outlet } from "react-router-dom";

const OnlyUser = () => {
    if (localStorage.getItem("userType") != "USER") {
        alert("연습실 이용자만 이용가능한 페이지 입니다.");
    }

    return localStorage.getItem("userType") == "USER" ? (
        <Outlet />
    ) : localStorage.getItem("userType") == "OWNER" ? (
        <Navigate to={"/owner"} />
    ) : (
        <Navigate to={"/login"} />
    );
};

export default OnlyUser;
