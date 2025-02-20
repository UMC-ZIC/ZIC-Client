import styled from "styled-components";

const ReservationContainer = styled.div`
    width: 100%;
    height: 6rem;
    padding: 2% 0;
    border-bottom: 1px solid #dcdcdc;
    display: flex;
    gap: 5%;
    box-sizing: border-box;
    cursor: pointer;
`;

const ReservationImg = styled.div`
    background-image: url(${(props) => props.bgphoto});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 5rem;
    height: 5rem;
    border-radius: 1rem;
`;

const ReservationInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: start;
    gap: 2%;
`;

const TitleWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 4%;

    p {
        font-size: 130%;
        font-family: "Pretendard-Bold";
    }

    div {
        background-color: #d9f0ff;
        font-family: "Pretendard-Regular";
        padding: 2% 3%;
        border-radius: 1rem;
    }
`;

const Info = styled.div`
    font-family: "Pretendard-Light";
    font-size: 80%;
    color: #545454;
    display: flex;
    flex-direction: column;

    p:first-child {
        margin-bottom: 3%;
    }
`;

const ReservationCard = ({
    img,
    roomName,
    detailName,
    date,
    startTime,
    endTime,
    onClick,
}) => {
    const dateFormat = (time) => {
        return time.replace(/-/g, ". ");
    };

    const timeFormat = (time) => {
        return time.split(":").slice(0, 2).join(":");
    };

    return (
        <ReservationContainer onClick={onClick ? onClick : null}>
            <ReservationImg bgphoto={img} />
            <ReservationInfo>
                <TitleWrapper>
                    <p>{roomName}</p>
                    <div>{detailName}</div>
                </TitleWrapper>
                <Info>
                    <p>예약 날짜 | {dateFormat(date)}.</p>
                    <p>
                        예약 시간 |{" "}
                        {`${timeFormat(startTime)} ~ ${timeFormat(endTime)}`}
                    </p>
                </Info>
            </ReservationInfo>
        </ReservationContainer>
    );
};

export default ReservationCard;
