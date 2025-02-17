import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import moment from "moment";
import axios from "axios";

const ReactCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date()); //선택한 날짜 (하단에 예약 내역을 표시할 때 사용)
    const [reservations, setReservations] = useState([]); // 선택한 날짜의 예약 내역
    const [activeMonth, setActiveMonth] = useState(moment(new Date()).format('YYYY-MM-DD')); // //현재 날짜를 'YYYY-MM' 형태로 변환
    const [dayList, setDayList] = useState([]); // 해당 달의 예약된 날짜 리스트

    const getActiveMonth = (activeStartDate) => {
        const newActiveMonth = moment(activeStartDate).format('YYYY-MM');
        setActiveMonth(newActiveMonth); // 현재 보이는 달 업데이트
    }; //받아온 인자(activeStartDate)에 따라 현재 보여지는 달(activeMonth)의 State를 변경하는 함수

    //이거는 해당 달에 대한 전체적인 데이터를 조회를 한 후
    //해당 달에 예약된 날짜가 있다면 점으로 예약내역이 있다라는걸 알려줘야한다

    useEffect(() => {
        console.log("데이리스트: ", dayList)
        const fetchReservedDates = async () => {
            try {
                const response = await axios.get(
                    `http://43.200.3.214:8080/api/reservation/owner/date?date=${activeMonth}`, {
                        
                        headers: {
                            Authorization: `eyJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInVzZXJUeXBlIjoiT1dORVIiLCJ1c2VyTmFtZSI6Ik93bmVyVGVzdCIsImlhdCI6MTczOTc2ODIyNCwiZXhwIjoxNzM5ODU0NjI0fQ.mMmzEGCD4GlpIoX0-lgdh5PqT6HfHO7oSFO_xNsxlUw`
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
                console.log("API 응답 데이터 :", JSON.stringify(reservedDates, null, 1));

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
                        Authorization: `eyJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInVzZXJUeXBlIjoiT1dORVIiLCJ1c2VyTmFtZSI6Ik93bmVyVGVzdCIsImlhdCI6MTczOTcyODcxNCwiZXhwIjoxNzM5ODE1MTE0fQ.CV0CiqvkaccpMmp5IdlLP8A_WhxzmJPn9xBycOA4j0o`
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
            onActiveStartDateChange={({ activeStartDate }) => getActiveMonth(activeStartDate)}
            // tileContent={({ date, view }) => {
            //     // 달력에서 날짜에 점 표시 (예약된 날짜 표시)
            //     // api로 특정 달 전체 예약 내역 날짜 데이터 받아온다
            //     // 데이터를 날짜 리스트에 넣는다
            //     // dayList와 캘린더의 날짜를 비교해서 같으면 블루닷
            //     if (view === "month") {
            //         const reservedDates = moment(date).format("YYYY-MM-DD");
            //         return dayList.includes(reservedDates) ? <div className="blue-dot"/> : null;
            //     }
            // }}
            />
        </div>
    );
};

const CalendarComponent = ({ showDate, onDateSelect, value, dayList }) => {
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

    const blueDot = ({date, view, reservedDates}) => {
        if (view === "month") {
            const reservedDatesArray = Object.values(reservedDates).flat(); 
            if (reservedDatesArray.includes(date)) {
                return "blue-dot";
            }
        }
        return "";
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
            tileContent={blueDot}
        />
    );
};

export default ReactCalendar;
export { CalendarComponent };