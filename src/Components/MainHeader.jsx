import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { CiCalendar } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const Header = styled.div`
    height: 7%;
    width: 100%;
    max-width: 500px;
    padding: 5%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff; //정호

    img {
        margin-bottom: 10px;
    }

    svg {
        width: 30%;
        height: 30%;
        color: #a9a9a9;
        cursor: pointer;
    }
`;

const IconWrapper = styled.div`
    width: 25%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 5%;
`;

const Content = styled.div`
    display: flex;
    flex: 1;
    min-height: 0;
`;

const MainHeader = () => {
    const navigate = useNavigate();

    // TODO : JWT를 통해 오너 페이지로 갈지 유저 페이지로 갈지 구현
    const handlePlus = () => {
        navigate("/owner/practiceRoom");
    };

    const handleOwner = () => {
        navigate("/owner/revenue");
    };

    const handleCalender = () => {
        navigate("/user/reservation");
    };

    const handleUser = () => {
        navigate("/user");
    };

    return (
        <Container>
            <Header>
                {/* TODO : owner는 메인 클릭시 /owner로 이동하게 구현 */}
                {/* TODO : user는 메인 클릭시 /으로 가게 구현 */}
                <a href="/">
                    <img src="/assets/img/zic_mainlogo.png" alt="Logo" />
                </a>
                <IconWrapper>
                    <CiSquarePlus onClick={handlePlus} />
                    <FaUser onClick={handleOwner} />
                    <CiCalendar onClick={handleCalender} />
                    <CiUser onClick={handleUser} />
                </IconWrapper>
            </Header>
            <Content>
                <Outlet />
            </Content>
        </Container>
    );
};

export default MainHeader;
