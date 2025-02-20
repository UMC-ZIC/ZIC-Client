import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Body = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    height: 100%;
    width: 100%;
    max-width: 500px;
`;

const RootContainer = () => {
    return (
        <Body>
            <Container>
                <Outlet />
            </Container>
        </Body>
    );
};

export default RootContainer;
