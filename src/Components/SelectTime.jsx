import styled from "styled-components";
import Button from "./Button";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const TimeContainer = styled.div`
    height: 50%;
    width: 100%;
    max-width: 500px;
    position: absolute;
    background-color: #fff;
    z-index: 100;
    bottom: 0;
    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;
    overflow: hidden;
    padding: 5%;

    display: grid;
    grid-template-rows: 15% 1fr 13%;
`;

const Title = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;

    font-family: "Pretendard-Light";
    font-size: 1.2rem;
`;

const SpinnerContainer = styled.div`
    padding: 7%;
`;

const SwiperWrapper = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5%;
    overflow: hidden;
`;

const Time = styled.div`
    font-size: 2rem;
    font-family: "Pretendard";
    border: 2px solid transparent;
    background-color: ${(props) =>
        props.isActive ? "#EDF8FF" : "transparent"};
    color: ${(props) => (props.isActive ? "#353535" : "#7D7D7D")};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    width: 100%;
    height: 90%;
    transition: background-color 0.3s ease, color 0.3s ease;
    cursor: pointer;

    &:hover {
        border-color: #278cff;
    }
`;

const SelectTime = ({ text, time, notMin, setTime, onCancel }) => {
    const hours = [...Array(12)].map((_, i) => i.toString().padStart(2, "0"));
    const minutes = [...Array(60)].map((_, i) => i.toString().padStart(2, "0"));
    const meridiem = ["AM", "PM"];

    const [selectedHour, setSelectedHour] = useState("00");
    const [selectedMinute, setSelectedMinute] = useState("00");
    const [selectedMeridiem, setSelectedMeridiem] = useState("AM");

    useEffect(() => {
        if (time) {
            const [hour, minute] = time.split(":");
            console.log(time.split(":")[0]);
            setSelectedHour(hour);
            setSelectedMinute(minute);

            // 12시 이상이면 PM, 그 외에는 AM으로 설정
            if (parseInt(hour, 10) >= 12) {
                setSelectedMeridiem("PM");
            } else {
                setSelectedMeridiem("AM");
            }
        }
    }, [time]);

    const getInitialIndex = (arr, value) => arr.indexOf(value);

    const handleSelect = () => {
        let hour = parseInt(selectedHour, 10); // 문자열을 숫자로 변환
        if (selectedMeridiem === "PM") {
            hour += 12; // PM일 경우 12를 더함 (단, 12시인 경우는 그대로 두기)
        }

        const formattedHour = hour.toString().padStart(2, "0"); // 2자리로 포맷팅

        setTime(`${formattedHour}:${selectedMinute}`);
        onCancel(false);
    };

    return (
        <TimeContainer>
            <Title>
                <p>{text}</p>
            </Title>
            <SpinnerContainer>
                <SwiperWrapper>
                    {/* 시 */}
                    <Swiper
                        direction={"vertical"}
                        slidesPerView={1}
                        loop={true}
                        loopAdditionalSlides={2}
                        slideToClickedSlide={true}
                        initialSlide={getInitialIndex(
                            hours,
                            time ? time.split(":")[0] : "00"
                        )}
                        onSlideChange={(swiper) =>
                            setSelectedHour(hours[swiper.realIndex])
                        }
                        style={{ height: "50px", width: "22%" }}
                    >
                        {hours.map((hour) => (
                            <SwiperSlide
                                key={hour}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "50px",
                                    width: "100%",
                                }}
                            >
                                {({ isActive }) => (
                                    <Time isActive={isActive}>{hour}</Time>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* 분 */}
                    <Swiper
                        direction={"vertical"}
                        slidesPerView={1}
                        loop={false}
                        slideToClickedSlide={false}
                        style={{
                            height: "50px",
                            width: "22%",
                            pointerEvents: "none",
                            cursor: "pointer",
                        }}
                    >
                        {minutes.map((minute) => (
                            <SwiperSlide
                                key={minute}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "50px",
                                }}
                            >
                                {({ isActive }) => (
                                    <Time isActive={isActive}>{minute}</Time>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* 오전, 오후 */}
                    <Swiper
                        direction={"vertical"}
                        slidesPerView={1}
                        loop={false}
                        slideToClickedSlide={true}
                        initialSlide={getInitialIndex(
                            meridiem,
                            time && parseInt(time.split(":")[0], 10) >= 12
                                ? "PM"
                                : "AM"
                        )}
                        onSlideChange={(swiper) =>
                            setSelectedMeridiem(meridiem[swiper.realIndex])
                        }
                        style={{ height: "50px", width: "22%" }}
                    >
                        {meridiem.map((el) => (
                            <SwiperSlide
                                key={el}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "50px",
                                }}
                            >
                                {({ isActive }) => (
                                    <Time isActive={isActive}>{el}</Time>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </SwiperWrapper>
            </SpinnerContainer>
            <Button text={"완료"} height={"100%"} onClick={handleSelect} />
        </TimeContainer>
    );
};

export default SelectTime;
