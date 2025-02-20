import React from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

const ChartContainer = styled.div`
    width: 100%;
    height: 100%;
    min-height: 30%;

    h2 {
        font-size: 120%;
        margin-bottom: 3%;
        font-family: "Pretendard-Regular";
    }
`;

const Chart = ({ list }) => {
    const monthlyEarning = list;

    // X축 (월) 데이터 추출
    const categories = monthlyEarning.map((item) => `${item.month}월`);

    // Y축 (총 수익) 데이터 추출
    const seriesData = monthlyEarning.map((item) => item.totalRevenue);

    // ApexCharts 옵션 설정
    const options = {
        chart: {
            background: "#EDF8FF",
            type: "line",
            zoom: { enabled: false },
        },
        stroke: {
            curve: "straight", // 곡선 스타일
            width: 4,
            colors: ["#278CFF"],
        },
        markers: {
            size: 6, // 마커 크기
            colors: ["#FFFFFF"], // 마커 내부 색상 (흰색)
            strokeColors: "#008FFB", // 마커 테두리 색상 (파란색)
            strokeWidth: 2, // 테두리 두께
            shape: "circle", // 마커 모양 (기본값: 원형)
        },
        // X축 설정
        xaxis: {
            categories: categories,
            labels: {
                style: {
                    fontFamily: "Pretendard-Light", // ✅ 폰트 변경
                },
            },
        },
        yaxis: {
            labels: { show: false },
        },
        tooltip: {
            y: {
                formatter: (value) => `${value.toLocaleString()}원`, // 툴팁 포맷
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (value) => `${Math.floor(value / 1000)},`, // ✅ 1,000 단위 표시
            style: {
                colors: ["#008FFB"], // ✅ 선과 같은 색상
            },
            background: {
                enabled: false, // ✅ 배경 제거
            },
            offsetY: -10, // 마커 위로 띄우기
        },
        colors: ["#008FFB"], // 라인 색상
    };

    const series = [
        {
            name: "총 수익",
            data: seriesData,
        },
    ];

    return (
        <ChartContainer>
            <h2>누적 수익</h2>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={"100%"}
            />
        </ChartContainer>
    );
};

export default Chart;
