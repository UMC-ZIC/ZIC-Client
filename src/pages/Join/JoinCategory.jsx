import styled from "styled-components";
import Button from "../../Components/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JoinContainer } from "../../styles/container";
import { checkMobile } from "../../utils/checkMobile";

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    margin-top: 3%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;

    div {
        width: 100%;
    }

    h1 {
        font-family: "Pretendard-Bold";
        font-size: 130%;
        font-weight: 400px;
    }
`;

const BtnWrapper = styled.div`
    width: 100%;
    height: 10rem;
    margin-top: 12%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 15px;
`;

const JoinBtn = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== "isActive",
})`
    text-align: center;
    font-family: "Pretendard-Bold";
    color: ${(props) => (props.isActive ? "white" : "black")};
    font-size: 110%;
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

    const handleClick = (id) => {
        setActiveBtn(id);
    };

    const handleNext = () => {
        if (activeBtn == null) {
            return alert("가입 목적을 선택해주세요.");
        }
        if (checkMobile() && activeBtn == "owner") {
            return alert("휴대폰으로는 대여자 회원가입을 하실 수 없습니다.");
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
            <div />
            <Button text={"다음"} onClick={handleNext} height={"100%"} />
        </JoinContainer>
    );
};

export default JoinCategory;
