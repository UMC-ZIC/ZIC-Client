import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import moment from "moment";
import axios from "axios";

const CalendarComponent = ({ role, onDateSelect }) => {
    const [activeMonth, setActiveMonth] = useState(moment().format('YYYY-MM-DD')); //현재 보이는 달 저장
    const [dayList, setDayList] = useState([]); //해당 달의 예약된 날짜 리스트

    const getActiveMonth = (activeStartDate) => {
        const newActiveMonth = moment(activeStartDate).format('YYYY-MM-DD');
        if (newActiveMonth !== activeMonth) { 
            setActiveMonth(newActiveMonth);
        }
    };

    const tileClassName = ({ date, view }) => {
        // view가 "month"일 때만 적용
        if (view === "month") {
            const day = date.getDay();
            if (day === 0) {
                return "red-day"; // 일요일
            } else if (day === 6) {
                return "blue-day"; // 토요일
            }
            else {
                return "black-day"; // 평일 (월~금)
            }
        }
         return "";
    };

    const blueDot = ({date, view}) => {
        if (view === "month") {

            const formattedDate = moment(date).format("YYYY-MM-DD");
            if (dayList.includes(formattedDate)) {
                return <div className="blue-dot" />;
            }
        }
        return null;
    }

    const handleDateClick = (date) => {
        const activeDate = moment(date).format("YYYY-MM-DD");
        console.log("선택된 날짜:", activeDate);

        if (onDateSelect) {
            onDateSelect(activeDate);
        } else {
            console.error("onDateSelect가 정의되지 않음");
        }
    };

    useEffect(() => {
        const FetchReservedDates = async () => {
            try {
                //역할 (role)에 따라 api url 변경
                const apiUrl =
                role === "owner"
                    ? `${import.meta.env.VITE_API_URL}/api/reservation/owner/date`
                    : `${import.meta.env.VITE_API_URL}/api/reservation/user/date`;

                const response = await axios.get(`${apiUrl}?date=${activeMonth}`, {
                        headers: {
                            Authorization: `eyJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInVzZXJUeXBlIjoiVVNFUiIsInVzZXJOYW1lIjoiVXNlclRlc3QiLCJpYXQiOjE3Mzk5ODUyMDIsImV4cCI6MTc0MDA3MTYwMn0.q0qr_So9GMKjWtu5PLHq4G7K_X-yAAq1knI4Th-l-Qg`
                        }
                });

                console.log("API 응답: ", response.data);
                
                if (!response.data.isSuccess) {
                    console.error("API 오류: ", response.data);
                    return;
                }

                const reservedDates = response.data.result?.reservationDateList?.map(item => item) || [];
                setDayList(reservedDates);

            } catch (error) {
                console.error("예약내역 불러오기 실패", error)
            }
        };

        FetchReservedDates();
    }, [activeMonth, role]);

    return (
        <Calendar
            showDate={true} 
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
            onActiveStartDateChange={({ activeStartDate }) =>
                getActiveMonth(activeStartDate)}
            onClickDay={handleDateClick} 
        />
    );
};

export default CalendarComponent;