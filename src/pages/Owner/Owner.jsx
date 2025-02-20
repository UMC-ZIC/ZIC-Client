import styled from "styled-components";
import ReservationCard from "../../Components/ReservationCard";
import moment from "moment";
import { useState, useEffect } from "react";
import { checkMobile } from "../../utils/checkMobile";
import CalendarComponent from "../../Components/Calendar";
import axios from "axios";

const Container = styled.div.attrs((props) => ({
    ismobile: undefined,
}))`
    padding: 5%;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: ${(props) => (props.ismobile ? "45%" : "35%")} 1fr;
    box-sizing: border-box;
    gap: 3%;
`;

const CalendarWrapper = styled.div``;

const ReservationWrapper = styled.div`
    width: 100%;
    height: 100%;
    
    overflow-y: auto; /* 세로 스크롤 활성화 */
    scrollbar-width: none; /* Firefox에서 스크롤바 숨김 */

    &::-webkit-scrollbar {
        /* Chrome, Safari에서 스크롤바 숨김 */
        display: none;
    }
`;

const ReservationLabel = styled.p`
    font-family: "Pretendard-Bold";
    font-size: 1rem;
    margin-bottom: 3%;
`;

const Owner = () => {
    const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD")); //선택한 날짜 (하단에 예약 내역을 표시할 때 사용)
    const [reservations, setReservations] = useState({ resultList: [] }); //선택한 날짜의 예약 내역
    const isMobile = checkMobile();

    const handleDateSelect = async (date) => {
        console.log("handleDateSelect 실행됨! 선택된 날짜:", date);
        setSelectedDate(moment(date).format("YYYY-MM-DD"));
    };

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/reservation/owner?date=${selectedDate}&page=1`,
                   {
                        headers: {
                            Authorization: `eyJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInVzZXJUeXBlIjoiT1dORVIiLCJ1c2VyTmFtZSI6Ik93bmVyVGVzdCIsImlhdCI6MTczOTg1NjU5NywiZXhwIjoxNzM5OTQyOTk3fQ.2FBl4QlMDhc0FfCYqx9W-bLJzQ1IKJU3XP6WQjwioiE`
                        }
                    }
                );
    
                 if (!response.data.isSuccess) {
                    console.error("API 오류: ", response.data.result);
                    return;
                }
    
                setReservations(response.data.result);
    
            } catch (error) {
                console.error("예약 내역 불러오기 실패! : ", error);
            }
        };

        fetchReservations();
    }, [selectedDate]);

    useEffect(() => {
        console.log("RES 데이터 업데이트됨:", JSON.stringify(reservations, null, 1));
    }, [reservations]);

    // API로 대여자 예약 내역 조회 구현
    return (
        <Container ismobile={isMobile}>
            <CalendarWrapper>
                <CalendarComponent role="owner" onDateSelect={handleDateSelect}/>
            </CalendarWrapper>

            <ReservationWrapper>
                <ReservationLabel>예약 내역</ReservationLabel>
                {reservations?.resultList?.length > 0 ? (
                    reservations.resultList.map((el) => (
                        <ReservationCard
                            key={el.id}
                            img={el.practiceRoomDetail.practiceRoomDetailImage}
                            roomName={el.practiceRoom.PracticeRoomName}
                            detailName={el.practiceRoomDetail.practiceRoomDetailName}
                            date={el.date}
                            startTime={el.startTime}
                            endTime={el.endTime}
                        />
                    ))
                ) : (
                    <p>예약 내역이 없습니다.</p>
                )}
            </ReservationWrapper>
        </Container>
    );
};

export default Owner;