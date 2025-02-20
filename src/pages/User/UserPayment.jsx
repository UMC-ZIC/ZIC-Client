import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../Components/Button";
import axios from "axios";
import { TimePicker } from "react-ios-time-picker";
import { checkMobile } from "../../utils/checkMobile";
import { useQuery } from "@tanstack/react-query";
import { getUserPracticeRoom, getUserPracticeRoomDetail } from "../../api/user";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    padding: 5%;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 1fr 6%;
    z-index: 1;
    position: relative;
`;

const Wrapper = styled.div`
    padding-top: 25%;
    width: 100%;
    height: 100%;
`;

const BackBtn = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    color: #7d7d7d;
    border: 1px solid #7d7d7d;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    top: 5%;
    left: 5%;

    svg {
        width: 70%;
        height: 70%;
    }

    &:hover {
        border: none;
        background-color: #278cff;
        color: #ffffff;
    }
`;

const TitleContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    margin-bottom: 7%;
`;

const Title = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5%;

    p {
        font-family: "Pretendard-SemiBold";
        font-size: 150%;
    }
`;

const Address = styled.a`
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 2%;
    text-decoration: none;
    font-family: "Pretendard-ExtraLight";
    letter-spacing: 2%;
    margin-right: 2%;
    color: #545454;
`;

const ReservationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5%;
    width: 100%;
    height: 50%;
    padding: 2%;
    box-sizing: border-box;
`;

const TimeContainer = styled.div`
    width: 100%;
    height: 17%;
    background-color: #d9f0ff80;
    border-radius: 1rem;
    display: flex;
    gap: 1%;
    justify-content: center;
    align-items: center;

    input,
    p {
        font-family: "Pretendard-Bold";
        font-size: 160%;
    }

    input {
        width: 8rem;
        border: 2px solid transparent;
        border-radius: 1rem;
        text-align: center;
    }

    input:first-child,
    input:last-child {
        cursor: pointer;
        padding: 1%;

        &:hover {
            border-color: #278cff;
        }
    }
`;

const InfoContainer = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 5%;
    border-bottom: 1px solid #dcdcdc;
    gap: 5%;

    div {
        font-family: "Pretendard-Light";
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #545454;
    }
`;

const Total = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p:first-child {
        font-family: "Pretendard-Light";
        color: #545454;
    }

    p:last-child {
        font-size: 150%;
        font-family: "Pretendard-Regular";
    }
`;

const BackDiv = styled.div`
    position: absolute;
    height: 100vh;
    width: 100vw;
    max-width: 500px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 50;
`;

const UserPayment = () => {
    const navigate = useNavigate();
    const [startTime, setStartTime] = useState("01:00 AM");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [endTime, setEndTime] = useState("12:00 AM");
    const [total, setTotal] = useState(0);
    const [startToggle, setStartToggle] = useState(false);
    const [endToggle, setEndToggle] = useState(false);
    const [query] = useSearchParams();
    const date = query.get("date");
    const { practiceRoomId, practiceRoomDetailId } = useParams();

    const { data: practiceRoom, isLoading: isLoadingPracticeRoom } = useQuery({
        queryKey: ["practiceRoom", practiceRoomId],
        queryFn: () => getUserPracticeRoom(practiceRoomId),
    });

    const { data: detailRoom, isLoading: isLoadingDetail } = useQuery({
        queryKey: ["practiceRoomDetail", practiceRoomDetailId],
        queryFn: () => getUserPracticeRoomDetail(practiceRoomDetailId),
    });

    useEffect(() => {
        const startDate = toTime(startTime);
        const endDate = toTime(endTime);

        const formatTime = (date) => {
            const hours = String(date.getHours()).padStart(2, "0"); // 두 자리 숫자로 변환
            const minutes = String(date.getMinutes()).padStart(2, "0");
            return `${hours}:${minutes}`;
        };

        setStart(formatTime(startDate));
        setEnd(formatTime(endDate));

        if (!isLoadingDetail) {
            const tax_free =
                subtractTimes(startTime, endTime).hours * detailRoom.fee;
            const tax = tax_free / 10;
            setTotal(tax_free + tax);
        }
    }, [startTime, endTime]);

    const hanldeNext = () => {
        console.log(`Start : ${start}, End : ${end}`);
        if (toTime(start).getTime() > toTime(end).getTime()) {
            return alert("시작 시간이 종료 시간보다 늦어선 안됩니다.");
        }

        const body = {
            reservationNumber: date.split("-").join(""),
            practiceRoomDetail: practiceRoomDetailId,
            date,
            startTime: startTime,
            endTime: endTime,
        };

        const option = {
            url: `${
                import.meta.env.VITE_API_URL
            }/api/reservation/payment/kakao/ready`,
            method: "POST",
            headers: {
                Authorization: localStorage.getItem("accessToken"),
                "Content-Type": "application/json",
            },
            data: body,
        };

        axios(option)
            .then((res) => {
                const reservationData = {
                    tid: res.data.result.paymentResponse.tid,
                    reservationNumber:
                        res.data.result.reservationResult.reservationNumber,
                    reservationId: res.data.result.reservationResult.id,
                    date: res.data.result.reservationResult.date,
                };

                window.sessionStorage.setItem(
                    "reservationData",
                    JSON.stringify(reservationData)
                );

                checkMobile()
                    ? (window.location.href =
                          res.data.result.paymentResponse.next_redirect_mobile_url)
                    : (window.location.href =
                          res.data.result.paymentResponse.next_redirect_pc_url);
            })
            .catch((err) => {
                if (err.response && err.response.data.result?.startTime) {
                    alert(err.response.data.result.startTime);
                } else {
                    console.log(err);
                }
            });
    };

    const toTime = (time) => {
        const [hours, minutes] = time.split(":");
        const [min, format] = minutes.split(" ");

        let hour = parseInt(hours, 10);
        const minute = parseInt(min, 10);

        if (format === "PM" && hour !== 12) {
            hour += 12; // PM이면 12 더하기 (단, 12 PM이면 그대로)
        } else if (format === "AM" && hour === 12) {
            hour = 0; // 12 AM이면 0으로 변환
        }

        const date = new Date();
        date.setHours(hour, minute, 0, 0);
        return date;
    };

    function subtractTimes(time1, time2) {
        const difference = toTime(time2) - toTime(time1); // 밀리초 단위로 차이 계산

        const hours = Math.floor(difference / (1000 * 60 * 60)); // 시간 차이
        const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
        ); // 분 차이

        return { hours, minutes };
    }

    return (
        <Container>
            <Wrapper>
                <BackBtn>
                    <IoIosArrowBack
                        onClick={() =>
                            navigate(
                                `/practiceRoom/${practiceRoomId}?date=${date}`
                            )
                        }
                    />
                </BackBtn>
                <TitleContainer>
                    {!isLoadingPracticeRoom && (
                        <>
                            <Title>
                                <p>{practiceRoom.name}</p>
                            </Title>

                            <div>
                                <Address
                                    href={`https://map.naver.com/p/search/${
                                        practiceRoom.region +
                                        " " +
                                        practiceRoom.address
                                    }`}
                                >
                                    <FiMapPin />
                                    {practiceRoom.region +
                                        " " +
                                        practiceRoom.address}
                                    <MdOutlineArrowForwardIos />
                                </Address>
                            </div>
                        </>
                    )}
                </TitleContainer>

                <ReservationContainer>
                    <TimeContainer>
                        {/* UI 변경하기 */}
                        <TimePicker
                            onChange={setStartTime}
                            value={startTime}
                            className="react-ios-time-picker"
                            use12Hours
                        />
                        <p>~</p>
                        <TimePicker
                            onChange={setEndTime}
                            value={endTime}
                            className="react-ios-time-picker"
                            use12Hours
                        />
                    </TimeContainer>
                    <InfoContainer>
                        <div>
                            <p>이용 날짜</p>
                            <p>{date.split("-").join(". ")}</p>
                        </div>
                        <div>
                            <p>총 이용 시간</p>
                            <p>
                                {subtractTimes(startTime, endTime).hours}
                                시간
                            </p>
                        </div>
                        <div>
                            <p>시간 당 금액</p>
                            <p>
                                {!isLoadingDetail
                                    ? detailRoom.fee.toLocaleString()
                                    : 0}
                                원
                            </p>
                        </div>
                        <div>
                            <p>수수료</p>
                            <p>10%</p>
                        </div>
                    </InfoContainer>
                    <Total>
                        <p>결제 금액</p>
                        <p>{total.toLocaleString()}원</p>
                    </Total>
                </ReservationContainer>
            </Wrapper>
            <Button text="결제하기" onClick={hanldeNext} height={"100%"} />

            {(startToggle || endToggle) && (
                <>
                    <BackDiv
                        onClick={() => {
                            setStartToggle(false);
                            setEndToggle(false);
                        }}
                    />
                    <SelectTime />
                </>
            )}
            {startToggle && (
                <SelectTime
                    text={"시작 시간"}
                    notMin={true}
                    time={startTime}
                    setTime={setStartTime}
                    onCancel={setStartToggle}
                />
            )}
            {endToggle && (
                <SelectTime
                    text={"종료 시간"}
                    notMin={true}
                    time={endTime}
                    setTime={setEndTime}
                    onCancel={setEndToggle}
                />
            )}
        </Container>
    );
};

export default UserPayment;
