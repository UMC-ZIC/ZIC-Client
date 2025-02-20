import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Icalendar from "./icons/Icalendar";
import IUser from "./icons/Iuser";
import IAddRooom from "./icons/IaddRoom";
import IRevenue from "./icons/Irevenue";
import { MdLogin, MdLogout } from "react-icons/md";

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
    /* background-color: #fff; //정호 */

    img {
        margin-bottom: 10px;
    }

    svg {
        color: #a9a9a9;
        cursor: pointer;

        &:hover {
            color: #278cff !important;
        }
    }
`;

const IconWrapper = styled.div`
    width: auto;
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

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("userType");
        navigate("/login");
    };

    return (
        <Container>
            <Header>
                <a
                    href={
                        localStorage.getItem("userType") == "OWNER"
                            ? "/owner"
                            : "/"
                    }
                >
                    <img src="/assets/img/zic_mainlogo.png" alt="Logo" />
                </a>
                <IconWrapper>
                    {localStorage.getItem("accessToken") ? (
                        <MdLogout
                            onClick={handleLogout}
                            style={{ width: "1.8rem", height: "1.8rem" }}
                        />
                    ) : (
                        <MdLogin
                            onClick={handleLogout}
                            style={{ width: "1.8rem", height: "1.8rem" }}
                        />
                    )}

                    {localStorage.getItem("userType") == "OWNER" && (
                        <>
                            <IAddRooom
                                onClick={handlePlus}
                                width={"1.8rem"}
                                height={"1.8rem"}
                            />
                            <IRevenue
                                onClick={handleOwner}
                                width={"1.8rem"}
                                height={"1.8rem"}
                            />
                        </>
                    )}
                    {localStorage.getItem("userType") == "USER" && (
                        <Icalendar
                            onClick={handleCalender}
                            width={"2.2rem"}
                            height={"2.2rem"}
                        />
                    )}
                    {localStorage.getItem("userType") != "OWNER" && (
                        <IUser
                            onClick={handleUser}
                            width={"2rem"}
                            height={"2rem"}
                        />
                    )}
                </IconWrapper>
            </Header>
            <Content>
                <Outlet />
            </Content>
        </Container>
    );
};

export default MainHeader;
