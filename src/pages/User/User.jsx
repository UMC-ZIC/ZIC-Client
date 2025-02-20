import styled from "styled-components"; // styled-components import 추가
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../../styles/font.css";
import axios from "axios";
import { mypage } from "../../assets/mypage";

const User = () => {
    const [data, setData] = useState({
        userName: "",
        userThisMonthPractices: {
            userThisMonthPracticeList: [],
            totalPracticeCount: 0,
        },
        frequentPracticeRooms: {
            frequentPracticeRoomDetailList: [],
        },
    });

    const navigate = useNavigate();
    // mypage;
    useEffect(() => {
        fetchNewsList();
    }, []);

    const fetchNewsList = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/user/mypage`,
                {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                }
            );

            console.log("API 응답: ", response);

            if (!response.data.isSuccess) {
                console.error("API 오류: ", response.data);
            }
            setData(response.data.result);
            console.log(data);
            // setData(mypage.result);
        } catch (error) {
            console.error("데이터를 불러오는 중 에러 발생:", error);
        }
    };

    //logout api 연동해야함
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("userType");
        navigate("/login");
    };

    return (
        <Container>
            <TopContent>
                <UserInfoBox>
                    <UserName>{data.userName}</UserName>
                    <KakaoImageComponent />
                </UserInfoBox>
                <BtnWrapper>
                    <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
                </BtnWrapper>
            </TopContent>

            <CenterContent>
                <PracticeBox>
                    <span>이번 달 연습 횟수</span>
                    <PracticeWrapper>
                        {data.userThisMonthPractices.userThisMonthPracticeList.map(
                            (practice, index) => (
                                <div key={index}>
                                    <p>{`${practice.practiceRoomName} ${practice.practiceRoomNameDetail}`}</p>
                                    <p>{practice.practiceCount}회</p>
                                </div>
                            )
                        )}
                    </PracticeWrapper>
                    <DividerLine />
                    <Count>
                        <p>총 연습 횟수</p>
                        <p>
                            {data.userThisMonthPractices.totalPracticeCount}회
                        </p>
                    </Count>
                </PracticeBox>
            </CenterContent>

            <BottomContent>
                <span>자주 가는 연습실</span>
                <PracticeRankBox>
                    {data.frequentPracticeRooms.frequentPracticeRoomDetailList
                        .filter((_, index) => index < 3)
                        .map((room, index) =>
                            index === 0 ? (
                                <div key={index}>
                                    <img
                                        src="/assets/img/Union.svg"
                                        alt="1위 아이콘"
                                    />
                                    <p>{room.roomName}</p>
                                </div>
                            ) : (
                                <div key={index}>
                                    <p>{index + 1}</p>
                                    <p>{room.roomName}</p>
                                </div>
                            )
                        )}
                </PracticeRankBox>
            </BottomContent>
        </Container>
    );
};

export default User;

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgb(233, 231, 231);
`;
const TopContent = styled.div`
    width: 100%;
    height: 17%;
    min-height: 17%;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    gap: 5%;
    background-color: #ffffff;
    align-items: center;
`;

const UserInfoBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    background-color: rgba(217, 240, 255, 0.5);
    width: 90%;
    height: 40%;
    align-items: center;
    margin-top: 5%;
    border-radius: 10px;
    padding: 2% 7%;
`;

const UserName = styled.a`
    font-weight: bold;
    text-decoration: none;
    font-size: 120%;
    color: #030303;
    font-family: "Pretendard-Regular";
`;

const BtnWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    padding: 2% 5% 2% 0;
`;

const LogoutBtn = styled.button`
    width: 20%;
    height: auto;
    font-family: "Pretendard-Regular";
    font-size: 110%;
    color: #545454;
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

const CenterContent = styled.div`
    width: 100%;
    flex: 1;
    margin: 1.5% 0%;
    padding: 6% 4%;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    box-sizing: border-box;
    min-height: 0;
`;

const PracticeBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    span {
        font-size: 1.1rem;
        font-family: "Pretendard-SemiBold";
        color: #030303;
        margin-bottom: 4%;
    }
`;

const PracticeWrapper = styled.div`
    width: 100%;
    height: 60%;
    display: flex;
    padding: 0 3%;
    margin: 2% 0;
    flex-direction: column;
    justify-content: start;
    gap: 1rem;
    overflow-y: auto;

    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE, Edge */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }

    div {
        display: flex;
        justify-content: space-between;
    }

    p {
        font-size: 1.1rem;
        font-family: "Pretendard-Regular";
        color: #545454;
    }
`;

const Count = styled.div`
    font-family: "Pretendard-Light";
    color: #545454;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 3%;
`;

const DividerLine = styled.div`
    width: 100% !important;
    height: 2px;
    background-color: #dcdcdc;
    margin: 2% 0% !important;
    margin-bottom: 4% !important;
`;

const BottomContent = styled.div`
    flex-shrink: 0;
    padding: 8% 5%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;

    span {
        font-size: 1.1rem;
        font-family: "Pretendard-SemiBold";
        color: #030303;
        margin-bottom: 4%;
    }
`;

const PracticeRankBox = styled.div`
    div {
        background-color: rgba(217, 240, 255, 0.5);
        display: flex;
        align-items: center;
        flex-direction: row;
        height: 3rem;
        padding: 1%;
        margin-bottom: 3%;
        border-radius: 0.5rem;
        justify-content: flex-start;
    }

    div:nth-child(1) {
        background-color: #d9f0ff;
    }

    div img {
        margin-left: 5%;
        width: 24px;
        height: 24px;
    }

    div p:first-of-type {
        font-family: "Pretendard-Regular";
        font-size: 1.2rem;
        color: #030303;
        margin-left: 6.3%;
        margin-right: 2.3%;
    }

    div p:nth-of-type(2) {
        font-family: "Pretendard-Regular";
        font-size: 1.1rem;
        color: #545454;
        margin-left: 6%;
    }
`;

// const RankedItem = styled.div`
//     display: flex;
//     align-items: center;
//     padding: 12px 16px;
//     border-radius: 10px;

//     img,span {
//         width: 6%;
//         font-size: 16px;
//         font-weight: bold;
//         color: #666;
//     }

//     p {
//         font-family: "Pretendard-Regular";
//         font-size: 1rem;
//         color: #030303;
//     }

//     &:nth-child(2),
//     &:nth-child(3) {
//         background-color: #F5F9FF;
//     }
// `;

const KakaoImageComponent = () => (
    <img src="/assets/img/kakaoImage.svg" alt="Kakao Image" width={"8%"} />
);
