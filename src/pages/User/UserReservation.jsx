import Button from "../../Components/Button";
import { Link, useNavigate } from "react-router-dom";
import CalendarComponent from "../../Components/Calendar";
import styled from "styled-components";
import ReservationCard from "../../Components/ReservationCard";
import { useEffect, useState } from "react";
import moment from "moment";
import { checkMobile } from "../../utils/checkMobile";
import axios from "axios";

const Container = styled.div.attrs((props) => ({
    ismobile: undefined,
}))`
    padding: 5%;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: ${(props) => (props.ismobile ? "45%" : "35%")} 1rem 1fr 6%;
    box-sizing: border-box;
    gap: 3%;
`;

const CalendarWrapper = styled.div``;

const ReservationContainer = styled.div`
    width: 100%;
    height: 100%;

    overflow-y: auto; /* 세로 스크롤 활성화 */
    scrollbar-width: none; /* Firefox에서 스크롤바 숨김 */

    &::-webkit-scrollbar {
        /* Chrome, Safari에서 스크롤바 숨김 */
        display: none;
    }
`;

const Label = styled.p`
    font-family: "Pretendard-Bold";
    font-size: 1rem;
`;

const UserReservation = () => {
    const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD")); //선택한 날짜 (하단에 예약 내역을 표시할 때 사용)
    const [reservations, setReservations] = useState({ resultList: [] }); //선택한 날짜의 예약 내역
    const isMobile = checkMobile();

    const navigate = useNavigate();
    const handleNext = () => {
        navigate("/");
    };
    const axiosReservationCancle = (id, tid, amount, tax_free, vat) => {
        const body = {
            reservationId: id,
            tid: tid,
            cancel_amount: amount,
            cancel_tax_free_amount: tax_free,
            cancel_vat_amount: vat,
        };

        const option = {
            url: `${import.meta.env.VITE_EC2_URL}/api/reservation/payment/kakao/cancel`,
            method: "POST",
            headers: {
                Authorization: import.meta.env.VITE_USER_JWT,
                "Content-Type": "application/json",
            },
            data: body,
        };

        axios(option)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.error(err));
    };

    // 예약 취소 api 호출 함수
    const axiosReservationCancle = (id, tid, amount, tax_free, vat) => {
        const body = {
            reservationId: id, //예약 id
            tid: tid, // 취소할 결제의의 거래 id
            cancel_amount: amount, // 취소할 총 금액
            cancel_tax_free_amount: tax_free, // 면세 금액
            cancel_vat_amount: vat, // 부가세 금액
        };

        const option = {
            url: `${import.meta.env.VITE_API_URL}/api/reservation/payment/kakao/cancel`,
            method: "PATCH",
            headers: {
                Authorization: `eyJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInVzZXJUeXBlIjoiVVNFUiIsInVzZXJOYW1lIjoiVXNlclRlc3QiLCJpYXQiOjE3Mzk5ODUyMDIsImV4cCI6MTc0MDA3MTYwMn0.q0qr_So9GMKjWtu5PLHq4G7K_X-yAAq1knI4Th-l-Qg`,
                "Content-Type": "application/json",
            },
            data: body,
        };

        axios(option)
            .then((res) => {
                alert("예약 취소 성공", res.data);
            })
            .catch((err) => console.error("예약 취소 실패", err.response.data));
    }

    const handleDateSelect = async (date) => {
            console.log("handleDateSelect 실행됨! 선택된 날짜:", date);
            setSelectedDate(moment(date).format("YYYY-MM-DD"));
    };

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/reservation/user?date=${selectedDate}&page=1`,
                   {
                        headers: {
                            Authorization: `eyJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInVzZXJUeXBlIjoiVVNFUiIsInVzZXJOYW1lIjoiVXNlclRlc3QiLCJpYXQiOjE3Mzk5ODUyMDIsImV4cCI6MTc0MDA3MTYwMn0.q0qr_So9GMKjWtu5PLHq4G7K_X-yAAq1knI4Th-l-Qg`
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
        reservations?.resultList?.forEach(el => {
            console.log("예약 상태:", el.reservationResult.status);
        });
    }, [reservations]);

    return (
        <Container ismobile={checkMobile()}>
            <CalendarWrapper>
                <CalendarComponent role="user" onDateSelect={handleDateSelect}/>
            </CalendarWrapper>
<<<<<<< HEAD
            <ReservationWrapper>
                <ReservationLabel>예약 내역</ReservationLabel>
                {reservations?.resultList?.length > 0 ? (
                    reservations.resultList.map((el) => {
                        const reservationStatus = el.reservationResult.status; // 예약 상태 가져오기
                        const reservationEndTime = moment(`${el.reservationResult.date} ${el.reservationResult.endTime}`, "YYYY-MM-DD HH:mm"); // 예약 종료 시간
                        const now = moment(); // 현재 시간

                        // 종료된 예약 여부 확인
                        const isPastReservation = reservationEndTime.isBefore(now);

                        return (
                            <ReservationCard
                                key={el.reservationResult.id}
                                img={el.reservationResult.practiceRoomDetail.practiceRoomDetailImage ?? ""}
                                roomName={el.reservationResult.practiceRoom.PracticeRoomName ?? "이름 없음"}
                                detailName={el.reservationResult.practiceRoomDetail.practiceRoomDetailName ?? "상세 이름 없음"}
                                date={el.reservationResult.date ?? "날짜 없음"}
                                startTime={el.reservationResult.startTime ?? "시작 시간 없음"}
                                endTime={el.reservationResult.endTime ?? "종료 시간 없음"}
                                onClick={() => {
                                    if (isPastReservation) {
                                        alert("이미 종료된 예약은 취소할 수 없습니다.");
                                        return;
                                    }

                                    if (reservationStatus === 'SUCCESS') {
                                        axiosReservationCancle(
                                            el.reservationResult.id,
                                            el.reservationDetailResult.tid,
                                            el.reservationDetailResult.amount,
                                            el.reservationDetailResult.tax_free_amount,
                                            el.reservationDetailResult.vat_amount
                                        );
                                    } else {
                                        alert("해당 예약은 결제 완료 상태가 아닙니다.");
                                    }
                                }}
                            />
                        );
                    })
                ) : (
                    <p>예약 내역이 없습니다.</p>
                )}
            </ReservationWrapper>
=======
            <Label>예약 내역</Label>
            <ReservationContainer>
                {userReservation.result.resultList.map((el) => (
                    <ReservationCard
                        key={el.reservationResult.id}
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
                        onClick={() =>
                            axiosReservationCancle(
                                el.reservationResult.id,
                                el.reservationDetailResult.tid,
                                el.reservationDetailResult.amount,
                                el.reservationDetailResult.tax_free_amount,
                                el.reservationDetailResult.vat_amount
                            )
                        }
                    />
                ))}
            </ReservationContainer>
>>>>>>> 64cf041594747cf6b443177e813f25907088c130
            <Button text="예약하기" onClick={handleNext} height={"100%"} />
        </Container>
    );
};

export default UserReservation;