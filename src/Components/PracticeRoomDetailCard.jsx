import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

const Container = styled.div`
    width: 100%;
    height: 18rem;
    padding: 3%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-bottom: 7px solid #f2f2f2;
    gap: 3%;
`;

const Banner = styled.div`
    width: 100%;
    height: 60%;
    justify-content: space-around;
    background-image: url(${(props) => props.bgphoto});
    filter: ${(props) =>
        props.isNotAvailable == "AVAILABLE" ? "none" : "grayscale(100%)"};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 1rem;
    cursor: pointer;
`;

const InfoContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const FeeContainer = styled.div`
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 4%;
`;

const Bold = styled.p`
    font-family: "Pretendard-Regular";
    font-size: 130%;
`;

const Light = styled.div`
    font-family: "Pretendard-Light";
    font-size: 80%;
    color: #545454;
`;

const CustomScrollContainer = styled(ScrollContainer)`
    width: 100%;
    height: 15%;

    overflow-x: auto; /* 가로 스크롤 활성화 */

    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE, Edge */

    &::-webkit-scrollbar {
        /* Chrome, Safari */
        display: none;
    }
`;

const TimeBlock = styled.div`
    display: flex;
    height: 50%;
    width: 100%;
`;

const Hour = styled.div`
    width: 10%;
    height: 100%;
    background-color: ${(props) =>
        props.isNotAvailable ? "#F2F2F2" : "#80CDFF"};
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Pretendard-Regular";
    min-width: 3rem; /* 각 시간의 최소 너비 */
    border-right: 1px solid #a9a9a9;

    &:first-child {
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
    }

    &:last-child {
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
        border: none;
    }
`;

const Horizon = styled.div`
    height: 100%;
    border: 1px dashed white;
`;

const TextBlock = styled.div`
    display: flex;
    height: 50%;
    width: 100%;
`;

const Text = styled.div`
    width: 10%;
    height: 100%;
    color: #545454;
    display: flex;
    justify-content: start;
    align-items: center;
    font-family: "Pretendard-Regular";
    min-width: 3rem; /* 각 시간의 최소 너비 */

    p {
        font-family: "Pretendard-Light";
        font-size: 80%;
    }
`;

const PracticeRoomDetailCard = ({
    img,
    id,
    time,
    name,
    fee,
    detailId,
    date,
    status,
}) => {
    const navigate = useNavigate();
    const [availableTimes, setAvailableTimes] = useState([]);

    useEffect(() => {
        const hours = Array.from({ length: 24 }, (_, i) => i); // 0부터 23까지 시간 배열 생성

        // 각 시간에 대해 예약 가능 여부 체크
        const times = hours.map((hour) => {
            const currentTime = `${String(hour).padStart(2, "0")}:00:00`;
            // 예약 시간 안에 있는지 확인
            const isNotAvailable = time.every(
                (reserved) =>
                    currentTime < reserved.startTime ||
                    currentTime >= reserved.endTime
            );
            return {
                hour: `${String(hour).padStart(2, "0")}시`,
                isNotAvailable,
            };
        });

        setAvailableTimes(times);
    }, []);

    return (
        <Container>
            <Banner
                bgphoto={img}
                isNotAvailable={status}
                onClick={() => {
                    status == "AVAILABLE"
                        ? navigate(
                              `/user/practiceRoom/${id}/payment/${detailId}?date=${date}`
                          )
                        : alert("현재 이 방은 이용가능 상태가 아닙니다.");
                }}
            />

            <CustomScrollContainer>
                <TextBlock>
                    {availableTimes.map((time, index) => (
                        <Text
                            key={index}
                            isNotAvailable={
                                status != "AVAILABLE"
                                    ? true
                                    : time.isNotAvailable
                            }
                        >
                            <p>{time.hour}</p>
                        </Text>
                    ))}
                </TextBlock>
                <TimeBlock>
                    {availableTimes.map((time, index) => (
                        <Hour
                            key={index}
                            isNotAvailable={
                                status != "AVAILABLE"
                                    ? true
                                    : time.isNotAvailable
                            }
                        >
                            <Horizon />
                        </Hour>
                    ))}
                </TimeBlock>
            </CustomScrollContainer>

            <InfoContainer>
                <Bold>{name}</Bold>
                <FeeContainer>
                    <Light>1시간</Light>
                    <Bold>{fee.toLocaleString()}원</Bold>
                </FeeContainer>
            </InfoContainer>
        </Container>
    );
};

export default PracticeRoomDetailCard;
