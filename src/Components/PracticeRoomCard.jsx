import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const RoomItem = styled(Link)`
    width: 100%;
    display: flex;
    align-items: stretch;
    padding: 3%;
    background: white;
    border-bottom: 1.5px solid #d9d9d9;
    text-decoration: none; /*밑줄 제거*/
    color: inherit; /*부모 요소 색상*/

    img {
        width: 5rem;
        height: 5rem;
        border-radius: 0.8rem;
        object-fit: cover;
        margin-right: 4%;
    }
`;

const InfoContainer = styled.div`
    flex: 1;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    flex-direction: column;
`;

const RoomInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    flex: 1; /* 남은 공간을 채움 */
    padding: 0.5rem 0 0 0; /* 위아래 여백 */

    h3 {
        // 연습실 이름
        margin-left: 3%;
        font-family: "Pretendard-SemiBold";
        font-size: 100%;
        color: #333;
    }
`;

const RoomAvailable = styled.pre`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.3rem 0.8rem;
    border-radius: 1rem;
    background-color: ${(props) => (props.isFull ? "#f2f2f2" : "#d9f0ff")};
    color: ${(props) => (props.isFull ? "#7d7d7d" : "#278cff")};
    font-size: 80%;
    white-space: nowrap;
    font-family: "Pretendard-Regular", sans-serif !important;
`;

const RoomTime = styled.p`
    display: flex;
    align-items: flex-end; /* 하단 정렬 */
    justify-content: flex-end;
    gap: 0.2rem;
    margin: 0; /* 기본 여백 제거 */

    span:first-child {
        // 시간
        font-size: 70%;
        color: #545454;
    }

    span:nth-child(2) {
        // 가격
        font-size: 150%;
        font-weight: bold;
        margin-left: 1%;
    }

    span:last-child {
        // 원
        font-size: 90%;
        margin-left: 1px;
    }
`;

const PracticeRoomCard = ({
    practiceRoom,
    selectedDate,
    totalCount,
    availableCount,
    price,
}) => {
    const [isFull, setIsFull] = useState(false);
    useEffect(() => {
        if (availableCount == totalCount) setIsFull(true);
    }, []);

    const handleNext = (e) => {
        if (isFull) {
            e.preventDefault(); // 네비게이션을 막는다.
            alert("현재 연습실이 만실입니다.");
        }
    };

    return (
        <RoomItem
            to={`/practiceRoom/${practiceRoom.practiceRoomId}?date=${selectedDate}`}
            className="room-item"
            key={practiceRoom.id}
            onClick={handleNext}
        >
            <img src={practiceRoom.image} alt={practiceRoom.name} />
            <InfoContainer>
                <RoomInfo>
                    <RoomAvailable isFull={isFull}>
                        {isFull
                            ? `만실 ${availableCount} / ${totalCount}`
                            : `이용가능 ${availableCount} / ${totalCount}`}
                    </RoomAvailable>
                    <h3>{practiceRoom.name}</h3>
                </RoomInfo>
                <RoomTime>
                    <span>1시간</span>
                    <span>{price.toLocaleString()}</span>
                    <span>원</span>
                </RoomTime>
            </InfoContainer>
        </RoomItem>
    );
};

export default PracticeRoomCard;
