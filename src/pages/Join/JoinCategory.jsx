import styled from "styled-components";
import Button from "../../Components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JoinContainer } from "../../styles/container";
import { useProgress } from "../../context/ProgressContext.jsx";

const Wrapper = styled.div`
    height: 70%;
    width: 100%;
    margin-top: 3%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
        width: 100%;
    }

    h1 {
        font-family: "Pretendard-Bold";
        font-size: 125%;
        font-weight: 400px;
    }
`;

const BtnWrapper = styled.div`
    width: 100%;
    height: 30%;
    margin-top: 15%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 15px;
`;

const JoinBtn = styled.button`
    text-align: center;
    font-family: "Pretendard-Bold";
    color: ${(props) => (props.isActive ? "white" : "black")};
    font-size: 16px;
    letter-spacing: 1px;
    width: 100%;
    height: 100%;
    background-color: ${(props) => (props.isActive ? "#0095ff" : "#dcdcdc")};
    border: none;
    border-radius: 30px;
    cursor: pointer;

    :last-child {
        margin-top: 5%;
        font-size: 200%;
    }
`;

const JoinCategory = () => {
    const [activeBtn, setActiveBtn] = useState(null);
    const navigate = useNavigate();
    const { setProgress } = useProgress();

    const handleClick = (id) => {
        setActiveBtn(id);
        setProgress(50);
    };

    const handleNext = () => {
        if (activeBtn == null) {
            return alert("가입 목적을 선택해주세요.");
        }
        navigate(`/join/${activeBtn}/info`);
    };

    return (
        <JoinContainer>
            <Wrapper>
                <div>
                    <h1>어떤 목적으로 가입하시나요?</h1>
                </div>
                <BtnWrapper>
                    {["user", "owner"].map((id) => (
                        <JoinBtn
                            key={id}
                            isActive={activeBtn == id}
                            onClick={() => handleClick(id)}
                        >
                            <p>연습실</p>
                            <p>{id == "user" ? "이용자" : "대여자"}</p>
                        </JoinBtn>
                    ))}
                </BtnWrapper>
            </Wrapper>
            <Button text={"다음"} onClick={handleNext} />
        </JoinContainer>
    );
};

export default JoinCategory;
