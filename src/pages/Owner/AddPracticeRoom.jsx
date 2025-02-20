import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import AddPracticeRoom from "../../Components/AddPracticeRoom";
import { useQuery } from "@tanstack/react-query";
import { getPracticeRoomLike, postPracticeRoomLike } from "../../api/etc";
import { axiosOwnerPracticeRoomDetail } from "../../api/owner";
import IFilledHeart from "../../Components/icons/IfilledHeart";
import IHeart from "../../Components/icons/Iheart";
import IPin from "../../Components/icons/Ipin";

const OwnerPracticeRoomContainer = styled.div`
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
`;

const TitleContainer = styled.div`
    padding: 5%;
    width: 100%;
    height: 20%;
    background-color: white;
    border-bottom: 3px solid #f2f2f2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
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
    color: #545454;

    a {
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 2%;
        text-decoration: none;
        font-family: "Pretendard-ExtraLight";
        letter-spacing: 2%;
        margin-right: 2%;
        color: #545454;
    }
`;

const OwnerAddPracticeRoom = () => {
    const navigate = useNavigate();
    const { practiceRoomId } = useParams();

    const { data: practiceRooms, isLoading: isLoadingPracticeRooms } = useQuery(
        {
            queryKey: ["practiceRooms"],
            queryFn: () => axiosOwnerPracticeRoomDetail(),
        }
    );
    const {
        data: likes,
        isLoading: isLoadingLikes,
        refetch,
    } = useQuery({
        queryKey: ["practiceRoomLikes", practiceRoomId],
        queryFn: () => getPracticeRoomLike(practiceRoomId),
    });

    useEffect(() => {
        refetch();
    }, [likes]);
    const handleLike = () => {
        postPracticeRoomLike(practiceRoomId).then((res) =>
            res ? refetch() : null
        );
    };

    return isLoadingPracticeRooms ? null : (
        <OwnerPracticeRoomContainer>
            <Banner bgphoto={practiceRooms.practiceRoomDTO.img} />
            <BackBtn>
                <IoIosArrowBack
                    onClick={() => navigate("/owner/practiceRoom")}
                />
            </BackBtn>

            <PracticeRoomContainer>
                <TitleContainer>
                    <Title>
                        <p>{practiceRooms.practiceRoomDTO.name}</p>
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
                                practiceRooms.practiceRoomDTO.region +
                                " " +
                                practiceRooms.practiceRoomDTO.address
                            }`}
                        >
                            <IPin width={"1.2rem"} height={"1.2rem"} />
                            {practiceRooms.practiceRoomDTO.region +
                                " " +
                                practiceRooms.practiceRoomDTO.address}
                            <MdOutlineArrowForwardIos />
                        </a>
                    </Address>
                </TitleContainer>
                <AddPracticeRoom />
            </PracticeRoomContainer>
        </OwnerPracticeRoomContainer>
    );
};

export default OwnerAddPracticeRoom;
