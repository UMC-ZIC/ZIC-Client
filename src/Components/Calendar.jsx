import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import moment from "moment";
import axios from "axios";

// reactcalendar가 달이 바뀔 때마다 daylist업데이트 
// 초기 상태
// activeMonth = "2025-01-01"
// 사용자가 다음 달 버튼 클릭 (1월 -> 2월)
// onActiveStartDateChange 발생 -> getActiveMonth(activeStartDate) 호출
// activeStartDate = 2025-02-01
// moment(activeStartDate).format('YYYY-MM-DD') -> "2025-02-01"
// 새로운 activeMonth 저장
// 기존 activeMonth = "2025-01-01"
// 새로운 activeMonth = "2025-02-01"이므로 상태 업데이트
// setActiveMonth("2025-02-01")
// API 호출
// useEffect 실행 -> fetchReservedDates() 호출
// "2025-02-01" 예약된 날짜 API 요청
// UI 업데이트됨


//handleDateSelect api owner랑 연결

const ReactCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date()); //선택한 날짜 (하단에 예약 내역을 표시할 때 사용)
    const [reservations, setReservations] = useState([]); //선택한 날짜의 예약 내역
    const [activeMonth, setActiveMonth] = useState(moment().format('YYYY-MM-DD')); //현재 보이는 달 저장
    const [dayList, setDayList] = useState([]); //해당 달의 예약된 날짜 리스트

    const getActiveMonth = (activeStartDate) => {
        const newActiveMonth = moment(activeStartDate).format('YYYY-MM-DD');
        if (newActiveMonth !== activeMonth) { 
            setActiveMonth(newActiveMonth);
        }
    }; //받아온 인자(activeStartDate)에 따라 현재 보여지는 달(activeMonth)의 State를 변경하는 함수

    useEffect(() => {
        const fetchReservedDates = async () => {
            try {
                console.log(`📌 API 요청: ${activeMonth}`); // ✅ 현재 activeMonth가 변경될 때마다 로그 확인
                const response = await axios.get(
                    `http://43.200.3.214:8080/api/reservation/owner/date?date=${activeMonth}`, {
                        
                        headers: {
                            Authorization: `eyJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInVzZXJUeXBlIjoiT1dORVIiLCJ1c2VyTmFtZSI6Ik93bmVyVGVzdCIsImlhdCI6MTczOTgwMjM5OSwiZXhwIjoxNzM5ODg4Nzk5fQ.sqCnEznfuCYF7IQWisPSbBT7kRAzKvlsri43zSrzF8Q`
                        }
                });

                console.log("API 응답: ", response.data);
                
                if (!response.data.isSuccess) {
                    console.error("API 오류: ", response.data);
                    return;
                }

                // 예약된 날짜 리스트 추출
                const reservedDates = response.data.result?.reservationDateList?.map(item => item) || [];
                setDayList(reservedDates);
                console.log("📌 업데이트된 해당 달 예약된 날짜:", JSON.stringify(reservedDates, null, 1));

            } catch (error) {
                console.error("예약내역 불러오기 실패", error)
            }
        };

        
        fetchReservedDates();
    }, [activeMonth]); //activeMonth가 변경될 때마다 실행

    //하단에 예약 내역을 표시할 때 사용
    const handleDateSelect = async (date) => {
        const activeDate = moment(date).format("YYYY-MM-DD");
        setSelectedDate(date);
        console.log("선택된 날짜: ", activeDate);

        try {
            const response = await axios.get(
                `http://43.200.3.214:8080/api/reservation/owner?date=${activeDate}&page=1`,
               {
                    headers: {
                        Authorization: `eyJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInVzZXJUeXBlIjoiT1dORVIiLCJ1c2VyTmFtZSI6Ik93bmVyVGVzdCIsImlhdCI6MTczOTgwMjM5OSwiZXhwIjoxNzM5ODg4Nzk5fQ.sqCnEznfuCYF7IQWisPSbBT7kRAzKvlsri43zSrzF8Q`
                    }
                }
            );

            console.log("API 응답: ", response);
            
             if (!response.data.isSuccess) {
                 console.error("API 오류: ", response.data.result);
            }
    
            setReservations(response.data.result);
            console.log("RES데이터: " + reservations);
            console.log("RES 데이터:", JSON.stringify(reservations, null, 1)); //(객체이름, 속성, 줄간격)

        } catch (error) {
            console.error("예약 내역 불러오기 실패! : ", error);
        }
    };

    return (
        <div>
            <CalendarComponent 
            showDate={true} 
            onDateSelect={handleDateSelect} 
            reservations={reservations}
            value={selectedDate}
            dayList={dayList} // API에서 가져온 날짜 리스트 전달
            onActiveStartDateChange={({ activeStartDate }) =>
                getActiveMonth(activeStartDate)}
            />
        </div>
    );
};

const CalendarComponent = ({ showDate, onDateSelect, value, dayList, onActiveStartDateChange }) => {

    const tileClassName = ({ date, view }) => {
        // view가 "month"일 때만 적용
        if (view === "month") {
            // 날짜가 일요일(0) 또는 토요일(6)일 경우 빨간색
            if (date.getDay() === 0 || date.getDay() === 6) {
                return "red-day"; // "red-day" 클래스를 반환
            }
        }
        return "";
    };

    const blueDot = ({date, view}) => {
        if (view === "month") {

            const formattedDate = moment(date).format("YYYY-MM-DD");
            console.log("dayList : " + dayList);
            if (dayList.includes(formattedDate)) {
                return <div className="blue-dot" />;
            }
        }
        return null;
    }

    return (
        <Calendar
            onChange={onDateSelect}
            value={value}
            calendarType="gregory"
            view="month"
            prev2Label={null}
            next2Label={null}
            showNeighboringMonth={false}
            formatDay={(locale, date) => moment(date).format("D")}
            formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
            prevLabel={
                <img
                    src="../../assets/img/prev-button.png"
                    alt="prev"
                    className="calendar-prevnav-btn"
                />
            }
            nextLabel={
                <img
                    src="../../assets/img/next-button.png"
                    alt="next"
                    className="calendar-nextnav-btn"
                />
            }
            tileClassName={tileClassName}
            tileContent={({ date, view }) => blueDot({ date, view })}
            onActiveStartDateChange={onActiveStartDateChange}
        />
    );
};

export default ReactCalendar;
export { CalendarComponent };