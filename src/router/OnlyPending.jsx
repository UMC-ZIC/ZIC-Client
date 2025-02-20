import { Navigate, Outlet } from "react-router-dom";

const OnlyPending = () => {
    if (localStorage.getItem("userType") != "PENDING") {
        alert(
            "회원가입하셨거나 로그인 상태가 아닌 분은 이용 불가능한 페이지 입니다."
        );
    }

    return localStorage.getItem("userType") == "PENDING" ? (
        <Outlet />
    ) : localStorage.getItem("userType") == "OWNER" ? (
        <Navigate to={"/owner"} />
    ) : (
        <Navigate to={"/"} />
    );
};

export default OnlyPending;
