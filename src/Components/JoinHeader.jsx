import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useProgress } from "../context/ProgressContext.jsx";

const Container = styled.div`
    display: flex;
    flex-direction: column; /* 세로로 쌓기 */
    height: 100vh; /* 전체 화면 높이 차지 */
`;

const Header = styled.div`
    height: 7%;
    width: 100%;
    max-width: 500px;
    /* 경계선 지우기 */
    /* border-bottom: 2px solid black; */
    display: flex;
    justify-content: center;
    align-items: flex-end;

    img {
        margin-bottom: 10px;
    }
`;

const Content = styled.div`
    display: flex;
    flex: 1;
    min-height: 0;
`;

const StandardBar = styled.div`
    width: 100%;
    height: 3px;
    background-color : #DCDCDC;
    position: relative;
`

const ProgressBar = styled.div`
    position: absolute;
    top: -1.5px;
    left: 0;
    background-color: #2196F3;
    width: ${(props) => props.$progress}%;
    height: 5px;
    border-radius: 0 5px 5px 0; 
    transition: width 0.5s ease-in-out;
`;


const JoinHeader = () => {
    const { progress } = useProgress();
    console.log("현재 progress값:" , progress);
    return (
        
        <Container>
            <Header>
                <a href="/">
                    <img src="/assets/img/zic_mainlogo.svg" alt="Logo" />
                </a>
            </Header>
            {/* TODO : 진행 바 설정 */}
            <StandardBar>
                <ProgressBar $progress={progress} />
            </StandardBar>

            <Content>
                <Outlet />
            </Content>
        </Container>
    );
};

export default JoinHeader;
