import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import PracticeRoomDetailCard from "../Components/PracticeRoomDetailCard";
import { getPracticeRoomLike, postPracticeRoomLike } from "../api/etc";
import { useQuery } from "@tanstack/react-query";
import IHeart from "../Components/icons/Iheart";
import IFilledHeart from "../Components/icons/IfilledHeart";
import IPin from "../Components/icons/Ipin";
import {
    getUserPracticeRoom,
    getUserPracticeRoomDetailList,
} from "../api/user";
import Icalendar from "../Components/icons/Icalendar";

const MainPracticeRoomContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

const Banner = styled.div`
    width: 100%;
    height: 30%;
    justify-content: space-around;
    background-image: url(${(props) => props.bgphoto});
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
`;

const BackBtn = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    color: #7d7d7d;
    border-radius: 50%;
    position: absolute;
    top: 5%;
    left: 5%;
    cursor: pointer;

    svg {
        width: 70%;
        height: 70%;
    }

    &:hover {
        background-color: #278cff;
        color: #ffffff;
    }
`;

const PracticeRoomContainer = styled.div`
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 75%;
    bottom: 0;
    border-radius: 5% 5% 0 0;
    background-color: white;
    overflow-y: auto;

    overflow-y: scroll; /* 세로 스크롤 활성화 */
    -ms-overflow-style: none; /* IE와 Edge에서 스크롤바 숨기기 */
    scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */

    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari에서 스크롤바 숨기기 */
    }
`;

const TitleContainer = styled.div`
    padding: 5%;
    width: 100%;
    height: 20%;
    background-color: white;
    border-bottom: 7px solid #f2f2f2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    margin-bottom: 5%;
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

    div {
        width: auto;
        border: 1px solid #dcdcdc;
        padding: 2% 3%;
        border-radius: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "Pretendard-ExtraLight";
        color: #7d7d7d;
        cursor: pointer;
    }

    span {
        margin-left: 0.5rem;
    }
`;

const Address = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #545454;
    font-family: "Pretendard-ExtraLight";

    a {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 2%;
        text-decoration: none;
        letter-spacing: 2%;
        margin-right: 2%;
        color: #545454;
    }

    p {
        display: flex;
        justify-content: end;
        align-items: center;
        gap: 2%;
        width: 50%;
    }
`;

const CardContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 60%;
    top: 40%;

    overflow-y: auto;

    overflow-y: scroll; /* 세로 스크롤 활성화 */
    -ms-overflow-style: none; /* IE와 Edge에서 스크롤바 숨기기 */
    scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */

    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari에서 스크롤바 숨기기 */
    }
`;

const MainPracticeRoom = () => {
    const { id } = useParams();
    const [query] = useSearchParams();
    const navigate = useNavigate();

    const { data: practiceRoom, isLoading: isLoadingPracticeRoom } = useQuery({
        queryKey: ["practiceRoom", id],
        queryFn: () => getUserPracticeRoom(id),
    });

    const {
        data: likes,
        isLoading: isLoadingLikes,
        refetch,
    } = useQuery({
        queryKey: ["practiceRoomLikes", id],
        queryFn: () => getPracticeRoomLike(id),
    });

    const { data: practiceRoomDetails, isLoading: isLoadingDetails } = useQuery(
        {
            queryKey: ["practiceRoomDetails", id],
            queryFn: () =>
                getUserPracticeRoomDetailList(id, 1, query.get("date")),
        }
    );

    const handleLike = () => {
        postPracticeRoomLike(id).then((res) => (res ? refetch() : null));
    };

    return isLoadingPracticeRoom ? null : (
        <MainPracticeRoomContainer>
            <Banner bgphoto={practiceRoom.image}></Banner>
            <BackBtn>
                <IoIosArrowBack onClick={() => navigate("/")} />
            </BackBtn>

            <PracticeRoomContainer>
                <TitleContainer>
                    <Title>
                        <p>{practiceRoom.name}</p>
                        {!isLoadingLikes && (
                            <div onClick={() => handleLike()}>
                                {likes.find(
                                    (like) =>
                                        like == localStorage.getItem("userId")
                                ) ? (
                                    <IFilledHeart
                                        width={"1rem"}
                                        height={"1rem"}
                                    />
                                ) : (
                                    <IHeart width={"1rem"} height={"1rem"} />
                                )}
                                <span>
                                    {(likes?.length || 0) > 100
                                        ? "99+"
                                        : likes?.length || 0}
                                </span>
                            </div>
                        )}
                    </Title>
                    <Address>
                        <a
                            href={`https://map.naver.com/p/search/${
                                practiceRoom.region + " " + practiceRoom.address
                            }`}
                        >
                            <IPin width={"1.2rem"} height={"1.2rem"} />
                            {practiceRoom.region + " " + practiceRoom.address}
                            <MdOutlineArrowForwardIos />
                        </a>
                        <p>
                            {/* <Icalendar width="1rem" height="1rem" /> */}
                            {query.get("date")}
                        </p>
                    </Address>
                </TitleContainer>
            </PracticeRoomContainer>
            {!isLoadingDetails && (
                <CardContainer>
                    {practiceRoomDetails.map((el) => (
                        <PracticeRoomDetailCard
                            key={el.practiceRoomDetailId}
                            img={el.image}
                            time={el.availableTimeSlots}
                            name={el.name}
                            fee={el.fee}
                            id={id}
                            detailId={el.practiceRoomDetailId}
                            date={query.get("date")}
                            status={el.status}
                        />
                    ))}
                </CardContainer>
            )}
        </MainPracticeRoomContainer>
    );
};

export default MainPracticeRoom;
