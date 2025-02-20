import styled from "styled-components";

const Progress = styled.div`
    height: 5px;
    width: 100%;
    background-color: transparent;
`;
const Bar = styled.div`
    height: 100%;
    width: ${(props) => props.percent};
    background-color: #278cff;
    transition: width 0.5s;
`;

export const ProgressBar = ({ percent }) => {
    return (
        <Progress>
            <Bar percent={percent} />
        </Progress>
    );
};

export default ProgressBar;
