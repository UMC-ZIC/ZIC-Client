import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ScrollContainer from "react-indiana-drag-scroll";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: ${(props) => (props.showDate ? "30% 50%" : "1fr")};
    box-sizing: border-box;
    gap: 8%;

    span {
        font-weight: bold;
    }
`;

const MonthNavigation = styled.div`
    padding: 1% 2%;
    width: 100%;
    border-radius: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f2f2f2;

    button {
        border: none;
    }

    span {
        font-family: "Pretendard-ExtraLight";
        font-size: 120%;
    }
`;

const NextBtn = styled.button`
    display: flex;
`;

const DateScroll = styled(ScrollContainer)`
    padding: 0 1%;
    display: flex;
    width: 100%;
    height: 100%;
    overflow-x: auto;
    scroll-behavior: smooth;

    /* Chrome, Safari, Edge */
    &::-webkit-scrollbar {
        display: none;
    }

    /* Firefox */
    scrollbar-width: none;

    /* Internet Explorer, Edge 레거시 */
    -ms-overflow-style: none;
`;

const DateItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: calc(100% / 7);
    padding: 0 1rem;
    cursor: pointer;
    text-align: center;
    position: relative; /* 가상요소위치 기준*/
    transition: background-color 0.2s, color 0.2s;
    color: ${(props) =>
        props.isSelected ? "#278cff" : props.isSunday ? "red" : "black"};
    border-bottom: ${(props) =>
        props.isSelected ? "3px solid #278cff" : "3px solid transparent"};
`;

const DateLabel = styled.div`
    font-family: "Pretendard-Thin";
    font-size: 0.8rem;
`;

const DateNumber = styled.div`
    font-family: "Pretendard-Regular";
    font-size: 1.2rem;
`;

const DateSelector = ({ onlyMonth, showDate, onChange }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(new Date());

    const dateRef = useRef([]);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        if (onlyMonth) {
            onChange(`${getMonthName(currentMonth).split(". ").join("-")}-01`);
        } else {
            const yyyyMMdd = `${selectedDate.getFullYear()}-${String(
                selectedDate.getMonth() + 1
            ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(
                2,
                "0"
            )}`;
            if (onChange) {
                onChange(yyyyMMdd);
            }
        }
    }, [selectedDate, selectedMonth]);

    // 월 이름 및 날짜 생성
    const getMonthName = (date) => {
        if (onlyMonth) {
            // onlyMonth가 true일 때 yyyy. MM 형식으로 반환
            return `${date.getFullYear()}. ${String(
                date.getMonth() + 1
            ).padStart(2, "0")}`;
        } else {
            // onlyMonth가 false일 때는 기존 월 이름 반환 (예: Feb)
            return date.toLocaleDateString("en-US", { month: "short" });
        }
    };

    const generateDates = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return Array.from(
            { length: daysInMonth },
            (_, i) => new Date(year, month, i + 1)
        );
    };

    // 월 변경
    const changeMonth = (direction) => {
        const newMonth = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + direction,
            1
        );
        setCurrentMonth(newMonth);
    };

    // 날짜 선택
    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const dates = generateDates(currentMonth);

    useEffect(() => {
        const todayIndex = dates.findIndex(
            (date) => date.toDateString() === selectedDate.toDateString()
        );

        if (todayIndex !== -1 && dateRef.current[todayIndex]) {
            dateRef.current[todayIndex].scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            });
        }
    }, [dates]);

    return (
        <Container showDate={showDate}>
            {/* 월 변경 */}
            <MonthNavigation>
                <NextBtn
                    onClick={() => {
                        changeMonth(-1);
                        setSelectedMonth(getMonthName(currentMonth));
                    }}
                >
                    <img src={"/assets/img/prev-button.png"} />
                </NextBtn>
                <span>
                    {getMonthName(currentMonth)}
                    {!onlyMonth && "."}
                </span>
                <NextBtn
                    onClick={() => {
                        changeMonth(1);
                        setSelectedMonth(getMonthName(currentMonth));
                    }}
                >
                    <img src={"/assets/img/next-button.png"} />
                </NextBtn>
            </MonthNavigation>

            {/* 날짜 스크롤 */}
            {showDate && (
                <DateScroll ref={scrollContainerRef}>
                    {dates.map((date, index) => (
                        <DateItem
                            key={index}
                            ref={(el) => (dateRef.current[index] = el)}
                            isSelected={
                                selectedDate?.toDateString() ===
                                date.toDateString()
                                    ? "selected"
                                    : ""
                            }
                            isSunday={date.getDay() === 0}
                            onClick={() => handleDateClick(date)}
                        >
                            <DateLabel>
                                {date.toLocaleDateString("ko-KR", {
                                    weekday: "short",
                                })}
                            </DateLabel>
                            <DateNumber>
                                {String(date.getDate()).padStart(2, "0")}
                            </DateNumber>
                        </DateItem>
                    ))}
                </DateScroll>
            )}
        </Container>
    );
};

export default DateSelector;
