import Button from "../../Components/Button";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Container = styled.div`
    height: 100vh;
    display: grid;
    grid-template-rows: 1fr 6% 6%;
    padding: 5%;
    box-sizing: border-box;

    div:last-child {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    a {
        text-decoration: none;
        border-bottom: 1px solid #707070;
        color: #707070;
        font-family: Pretendard-Regular;
        padding: 0 7px 2px 7px;
    }
`;

const Wrapper = styled.div`
    margin-top: 50%;
    width: 100%;

    display: flex;
    flex-direction: column;

    p:first-child {
        font-family: "Pretendard-Regular";
        font-size: 120%;
        color: #030303;
        margin-bottom: 5%;
    }

    p:last-child {
        font-family: "Pretendard-Bold";
        font-size: 250%;
        color: #030303;
    }
`;

const JoinSuccess = () => {
    const param = useParams();
    const navigate = useNavigate();

    const handleNext = () => {
        if (param.role == "user") {
            navigate("/");
        } else if (param.role == "owner") {
            const practiceRoomId = localStorage.getItem("practiceRoomId");
            console.log(practiceRoomId);
            localStorage.removeItem("practiceRoomId");

            navigate(
                `/owner/practiceRoom/${practiceRoomId}/practiceRoomDetail`
            );
        }
    };

    return (
        <Container>
            <Wrapper>
                <p>회원가입에</p>
                <p>성공했어요!</p>
            </Wrapper>

            <Button
                text={param.role == "owner" ? "룸 등록하기" : "예약하기"}
                onClick={handleNext}
                height={"100%"}
            />
            <div>{param.role == "owner" && <a href="/owner">건너뛰기</a>}</div>
        </Container>
    );
};

export default JoinSuccess;
