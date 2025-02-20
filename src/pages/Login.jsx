import styled from "styled-components";
import { BsChatFill } from "react-icons/bs";
import Button from "../Components/Button";
import { getTestJWT } from "../api/etc";
import { useNavigate } from "react-router-dom";
import IBanner from "../Components/icons/Ibanner";
import axios from "axios";

const LoginContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const BannerWrapper = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; /* 세로 정렬 */
    font-family: "Pretendard-Bold";
    font-size: 20px;

    div {
        width: 100%;
        height: 20%;
    }
`;

const KakaoWrapper = styled.div`
    height: 25%;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10%;

    a {
        text-decoration: none;
        border-bottom: 1px solid #707070;
        color: #707070;
        font-family: Pretendard-Regular;
        padding: 0 7px 2px 7px;
    }
`;

const KakaoBtn = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    border-radius: 4px;
    padding: 15px 0 15px 0;
    height: auto;
    background-color: #fee500;
    cursor: pointer;

    svg,
    div {
        width: 25px;
        height: 25px;
    }

    p {
        font-family: "pretendard-Medium";
        color: #030303;
        font-size: 16px;
        font-weight: 400px;
    }

    &:hover {
        background-color: #fdef73;
    }
`;

const Login = () => {
    const kakaoLogin = () => {
        window.location.href = `${
            import.meta.env.VITE_API_URL
        }/oauth2/authorization/kakao`;
        // try {
        //     const response = await axios.get(
        //         `${import.meta.env.VITE_API_URL}/oauth2/authorization/kakao`
        //     );
        //     console.log("res응답 : " + response);
        //     if (!response.data.isSuccess) {
        //         console.error("API 오류: ", response.data);
        //     }
        // }catch (error){
        //     console.log("데이터를 불러오는 중 에러 발생 : ", error);
        // }
    };

    // TODO : 삭제하기 - 테스트용 로그인 api
    const navigate = useNavigate();
    const handleUserLogin = () => {
        getTestJWT(1).then(() => navigate("/"));
    };
    const handleOwnerLogin = () => {
        getTestJWT(2).then(() => navigate("/owner"));
    };

    return (
        <LoginContainer>
            <BannerWrapper>
                <div>
                    <IBanner text="당신이 연주할 곳은 여기" />
                </div>
            </BannerWrapper>
            <KakaoWrapper>
                {/* 테스트용 나중에 삭제하기 */}
                <div style={{ display: "flex", width: "100%", gap: "5%" }}>
                    <Button
                        height={"2rem"}
                        text={"이용자"}
                        onClick={handleUserLogin}
                    />
                    <Button
                        height={"2rem"}
                        text={"대여자"}
                        onClick={handleOwnerLogin}
                    />
                </div>

                <KakaoBtn onClick={kakaoLogin}>
                    <BsChatFill />
                    <p>카카오로 시작하기</p>
                    <div />
                </KakaoBtn>
                <a href="/join/category">다른 이메일로 시작하기</a>
            </KakaoWrapper>
        </LoginContainer>
    );
};

export default Login;
