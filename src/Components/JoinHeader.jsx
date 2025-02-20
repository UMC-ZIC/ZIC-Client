import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import ProgressBar from "./ProgressBar";

const Container = styled.div`
    display: flex;
    flex-direction: column; /* 세로로 쌓기 */
    height: 100vh; /* 전체 화면 높이 차지 */
`;

const Header = styled.div`
    height: 7%;
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;

    img {
        margin-bottom: 10px;
    }
`;

const Content = styled.div`
    display: flex;
    flex: 1;
    min-height: 0;
`;

const JoinHeader = () => {
    const location = useLocation();
    const [progress, setProgress] = useState("0%");

    // URL에 따라 활성화되는 부분을 판단
    const isFirst = location.pathname.includes("/join/category");
    const isLast =
        location.pathname.includes("/join") &&
        location.pathname.includes("/info");

    useEffect(() => {
        if (isFirst) {
            setProgress("50%"); // 50%로 진행
        } else if (isLast) {
            setProgress("100%"); // 100%로 진행
        } else {
            setProgress("0%"); // 0%로 진행
        }
    }, [isFirst, isLast]);

    console.log({ isFirst, isLast, progress });

    return (
        <Container>
            <Header>
                <a href="/">
                    <img src="/assets/img/zic_mainlogo.svg" alt="Logo" />
                </a>
                <ProgressBar percent={progress} />
            </Header>
            <Content>
                <Outlet />
            </Content>
        </Container>
    );
};

export default JoinHeader;
