import CalendarComponent from "../../Components/Calendar";
import styled from "styled-components";
import ReservationCard from "../../Components/ReservationCard";
import moment from "moment";
import { useState, useEffect } from "react";
import { checkMobile } from "../../utils/checkMobile";

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

const Owner = ({ reservations = { result: { resultList: [] } } }) => {
    const [selectedDate, setSelectedDate] = useState(
        moment().format("YYYY-MM-DD")
    );
    const isMobile = checkMobile();

    // 날짜 선택 시 처리 함수
    const handleDateSelect = (date, reservationData) => {
        const formattedDate = moment(date).format("YYYY-MM-DD"); // 날짜 포맷
        setSelectedDate(formattedDate); // 상태에 저장
    };

    useEffect(() => {
        console.log(selectedDate);
        console.log(reservations);
    }, [selectedDate, reservations]);


    // 예약 내역이 존재하는지 확인하고, 그에 맞게 렌더링
    const resultList = reservations.result?.resultList || [];

    // API로 대여자 예약 내역 조회 구현
    return (
        <Container ismobile={isMobile}>
            <CalendarWrapper>
                <CalendarComponent onDateSelect={handleDateSelect} />
            </CalendarWrapper>

            <ReservationWrapper>
                <ReservationLabel>예약 내역</ReservationLabel>
                {reservations.result.resultList.map((el) => (
                    <ReservationCard
                        key={el.reservationResult.id} // 고유 키 추가
                        img={
                            el.reservationResult.practiceRoomDetail
                                .practiceRoomDetailImage
                        }
                        roomName={
                            el.reservationResult.practiceRoom.PracticeRoomName
                        }
                        detailName={
                            el.reservationResult.practiceRoomDetail
                                .practiceRoomDetailName
                        }
                        date={el.reservationResult.date}
                        startTime={el.reservationResult.startTime}
                        endTime={el.reservationResult.endTime}
                    />
                ))}
            </ReservationWrapper>
        </Container>
    );
};

export default Owner;