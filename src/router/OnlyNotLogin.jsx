import { Navigate, Outlet } from "react-router-dom";

const OnlyNotLogin = () => {
    if (
        localStorage.getItem("userType") == "OWNER" ||
        localStorage.getItem("userType") == "USER"
    ) {
        alert("이미 로그인하신 상태입니다.");

        if (localStorage.getItem("userType") == "OWNER") {
            return <Navigate to={"/owner"} />;
        } else {
            return <Navigate to={"/"} />;
        }
    } else {
        return <Outlet />;
    }
};

export default OnlyNotLogin;
