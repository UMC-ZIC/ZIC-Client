import styled from "styled-components";

const FooterBtn = styled.button`
    text-align: center;
    font-family: "Pretendard-Bold";
    color: ${(props) => (props.reverse == "true" ? "#278cff" : "white")};
    font-size: 16px;
    letter-spacing: 1px;
    width: 100%;
    height: ${(props) => props.height};
    background-color: ${(props) =>
        props.reverse == "true" ? "#fff" : "#278cff"};
    border: ${(props) =>
        props.reverse == "true" ? "2px solid #278cff" : "none"};
    border-radius: 1rem;
    cursor: pointer;

    &:hover,
    &:active {
        background-color: #0056b3;
        border-color: #0056b3;
        color: white;
    }
`;

const Button = ({ text, onClick, reverse, height }) => {
    return (
        <FooterBtn
            onClick={onClick}
            reverse={reverse ? "true" : "false"}
            height={height ? height : "6%"}
        >
            {text}
        </FooterBtn>
    );
};

export default Button;
