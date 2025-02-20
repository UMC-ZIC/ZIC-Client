import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useDropzone } from "react-dropzone";
import PracticeRoomDetailCard from "../../Components/OwnerPracticeRoomDetailCard";
import Button from "../../Components/Button";
import { useQuery } from "@tanstack/react-query";
import {
    axiosOwnerPracticeRoomDetail,
    patchOwnerPracticeRoom,
} from "../../api/owner";
import { getPracticeRoomLike, postPracticeRoomLike } from "../../api/etc";
import IFilledHeart from "../../Components/icons/IfilledHeart";
import IHeart from "../../Components/icons/Iheart";
import IPin from "../../Components/icons/Ipin";

const MainPracticeRoomContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Banner = styled.div`
    width: 100%;
    height: 30%;
    justify-content: space-around;
    background-image: url(${(props) => props.bgphoto});
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    cursor: pointer;

    &:hover {
        border: 0.5rem solid #278cff;
    }
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
    /* background-color: white; */
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

const CardContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 50%;
    top: 40%;
    display: flex;
    flex-wrap: wrap;

    overflow-y: auto;

    overflow-y: scroll; /* 세로 스크롤 활성화 */
    -ms-overflow-style: none; /* IE와 Edge에서 스크롤바 숨기기 */
    scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */

    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari에서 스크롤바 숨기기 */
    }
`;

const BtnContainer = styled.div`
    position: absolute;
    bottom: 2%;
    width: 100%;
    height: 5vh;
    padding: 0 3%;
`;

const OwnerPracticeRoom = () => {
    const navigate = useNavigate();
    const [img, setImg] = useState(null);
    const [previewImg, setPreviewImg] = useState(
        import.meta.env.VITE_DEFAULT_IMG
    );
    const [notUpload, setNotUpload] = useState(true);

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
        queryKey: [
            "practiceRoomLikes",
            practiceRooms?.practiceRoomDTO?.practiceRoomId,
        ],
        queryFn: () =>
            getPracticeRoomLike(practiceRooms.practiceRoomDTO.practiceRoomId),
        enabled: !!practiceRooms?.practiceRoomDTO?.practiceRoomId,
    });

    useEffect(() => {
        refetch();
    }, [likes]);

    useEffect(() => {
        if (!isLoadingPracticeRooms) {
            setPreviewImg(practiceRooms.practiceRoomDTO.img);
        }
    }, [practiceRooms]);

    const handleLike = () => {
        postPracticeRoomLike(practiceRooms.practiceRoomDTO.practiceRoomId).then(
            (res) => (res ? refetch() : null)
        );
    };

    useEffect(() => {
        if (img == null) {
            return;
        } else {
            if (notUpload) {
                uploadImg(img).then((url) => {
                    const body = {
                        name: practiceRooms.practiceRoomDTO.name,
                        address: practiceRooms.practiceRoomDTO.address,
                        image: url,
                        latitude: practiceRooms.practiceRoomDTO.latitude,
                        longitude: practiceRooms.practiceRoomDTO.longitude,
                    };
                    setNotUpload(true);
                    patchOwnerPracticeRoom(
                        practiceRooms.practiceRoomDTO.practiceRoomId,
                        body
                    ).then((res) =>
                        res.isSuccess
                            ? alert("변경되었습니다.")
                            : alert("어떤 문제가 발생하였습니다.")
                    );
                });
            } else {
                console.log("업로드 중 입니다.");
            }
        }
    }, [img]);

    // firebase에 이미지 저장하는 함수
    const uploadImg = (file) => {
        return new Promise((resolve, reject) => {
            try {
                setNotUpload(false);
                const storage = getStorage(app);
                // 연습실 대표 사진 이름 형식 = zic/{대여자 이름}/main/{파일 이름}_{현재 시간}
                const fileName = `zic/${localStorage.getItem(
                    "userName"
                )}_${localStorage.getItem("userId")}/main/${file.name}`;
                const storageRef = ref(storage, fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        console.log(progress);
                    },
                    (error) => {
                        alert("Image Upload Failed");
                        reject(error);
                    },
                    async () => {
                        try {
                            const url = await getDownloadURL(
                                uploadTask.snapshot.ref
                            );
                            resolve(url);
                        } catch (error) {
                            setNotUpload(true);
                            reject(error);
                        }
                    }
                );
            } catch (error) {
                alert("Image Upload Failed");
                setNotUpload(true);
                reject(error);
            }
        });
    };

    // input에 이미지를 넣을 경우 미리보기 url을 변경하는 함수
    const handleImgChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
        if (e.target.name === "imgUrl") {
            setPreviewImg(e.target.value);
        }
    };

    // 이미지 Drop 시 실행
    const onDrop = (acceptedFiles) => {
        const result = confirm("연습실 대표 사진을 변경하시겠습니까?");

        if (result) {
            const reader = new FileReader();
            const file = acceptedFiles;
            if (file) {
                // 이미지 파일을 읽어 setImg로 저장
                reader.readAsDataURL(file[0]); // img 파일을 base64로 인코딩
                setImg(file[0]);
            }

            reader.onload = (e) => {
                // onDrop되면 preview 되게 처리, 기존 이미지 url 정보를 공백처리
                setPreviewImg(reader.result);
                document.getElementsByName("imgUrl")[0].value = "";
            };
        } else {
            return;
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop }); // html 컴포넌트와 연결

    return isLoadingPracticeRooms ? null : (
        <MainPracticeRoomContainer>
            <Banner {...getRootProps()} bgphoto={previewImg}>
                <input multiple={false} name="imgUrl" {...getInputProps()} />
            </Banner>
            <BackBtn>
                <IoIosArrowBack onClick={() => navigate("/owner")} />
            </BackBtn>

            <PracticeRoomContainer>
                <TitleContainer>
                    <Title>
                        <p>{practiceRooms.practiceRoomDTO.name}</p>
                        {!isLoadingLikes && (
                            <div onClick={() => handleLike()}>
                                {/* 본인 id 가져와서 바교하기 */}
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
            </PracticeRoomContainer>
            <CardContainer>
                {practiceRooms.practiceRoomDetailDTO.map((el) => (
                    <PracticeRoomDetailCard
                        key={el.practiceRoomDetailId}
                        img={el.img}
                        name={el.name}
                        fee={el.fee}
                        PracticeRoomId={
                            practiceRooms.practiceRoomDTO.practiceRoomId
                        }
                        status={el.status}
                        DetailId={el.practiceRoomDetailId}
                    />
                ))}
            </CardContainer>
            <BtnContainer>
                <Button
                    text={"방 추가하기"}
                    height={"100%"}
                    onClick={() =>
                        navigate(
                            `/owner/practiceRoom/${practiceRooms.practiceRoomDTO.practiceRoomId}/practiceRoomDetail`
                        )
                    }
                />
            </BtnContainer>
        </MainPracticeRoomContainer>
    );
};

export default OwnerPracticeRoom;
