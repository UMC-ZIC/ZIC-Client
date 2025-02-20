import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const KakaoLoginCallback = () => {
    const location = useLocation();

    useEffect(() => {
        // URL에서 JWT 액세스 토큰 가져오기
        const params = new URLSearchParams(location.search);
        const jwtAccessToken = params.get("jwtAccessToken");
        // const jwtAccessToken = `eyJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjMsInVzZXJUeXBlIjoiUEVORElORyIsInVzZXJOYW1lIjoi7ISc7KCV7Zi4IiwiaWF0IjoxNzM5ODg1MzI1LCJleHAiOjE3Mzk5NzE3MjV9.RyZ18ieklSuitk8g9F5JMlvMvOBTOQTAExnqD9yiVHA`;

        if (jwtAccessToken) {
            const decodedToken = jwtDecode(jwtAccessToken);
            const userId = decodedToken.userId;
            const userName = decodedToken.userName;
            const userType = decodedToken.userType;

            console.log("받은 JWT 액세스 토큰:", jwtAccessToken);
            console.log("받은 JWT 액세스 토큰:", userId);
            console.log("받은 JWT 액세스 토큰:", userName);
            console.log("받은 JWT 액세스 토큰:", userType);

            // 로컬 스토리지 또는 쿠키에 저장
            localStorage.setItem("accessToken", jwtAccessToken);
            localStorage.setItem("userId", userId);
            localStorage.setItem("userName", userName);
            localStorage.setItem("userType", userType);

            // 이후 필요한 페이지로 이동 (예: 홈 화면)
            if (userType === "USER") {
                window.location.href = "/";
            }
            if (userType === "PENDING") {
                window.location.href = "/join/category/";
            }
            if (userType === "OWNER") {
                window.location.href = "/owner/";
            }
        }
    }, [location]);

    return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoLoginCallback;
