import OwnerReservationStat from "../../Components/OwnerReservationStat";
import styled from "styled-components";
import Chart from "../../Components/Chart";
import DateSelector from "../../Components/DateSelector";
import { useEffect, useState } from "react";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { axiosRevenue } from "../../api/owner";

const StatContainer = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 10% 25% 25% 35%;

    & > div {
        padding: 5%;

        &:nth-child(2) {
            border-bottom: 5px solid #f2f2f2;
        }
    }
`;

const OwnerRevenue = () => {
    const [selectedDate, setSelectedDate] = useState(
        moment().format("YYYY-MM-DD")
    );

    const { data } = useQuery({
        queryKey: ["revenue", selectedDate], // queryKey는 쿼리 고유 키
        queryFn: () => axiosRevenue(selectedDate), // 실제 데이터 요청 함수
        enabled: !!selectedDate, // selectedDate가 있을 때만 쿼리 활성화
        placeholderData: {
            practiceRoomEarning: [
                {
                    practiceRoomDetail: [
                        {
                            practiceRoomDetailId: 0,
                            practiceRoomDetailName: "로딩중",
                            fee: 0,
                            reservationCount: 0,
                            totalRevenue: 0,
                        },
                    ],
                },
            ],
            monthlyEarning: [
                {
                    year: 0,
                    month: 0,
                    totalRevenue: 0,
                },
            ],
        },
    });

    useEffect(() => {
        console.log(selectedDate);
    }, [selectedDate]);

    return (
        <StatContainer>
            <DateSelector
                onlyMonth={true}
                onChange={setSelectedDate}
                showDate={false}
            />
            {data.practiceRoomEarning && (
                <>
                    <OwnerReservationStat
                        text={"총 이용 횟수"}
                        list={data.practiceRoomEarning[0].practiceRoomDetail}
                        count={true}
                    />
                    <OwnerReservationStat
                        text={"총 수익"}
                        list={data.practiceRoomEarning[0].practiceRoomDetail}
                        count={false}
                    />
                    <Chart list={data.monthlyEarning} />
                </>
            )}
        </StatContainer>
    );
};

export default OwnerRevenue;
