import styled from "styled-components";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useMatch, useParams, useNavigate } from "react-router-dom";
import {
    getOwnerPracticeRoomDetail,
    postOwnerPracticeRoomDetail,
    patchPracticeRoomDetailStatus,
    patchOwnerPracticeRoomDetail,
} from "../api/owner";

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 5%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;

const AddPhoto = styled.div`
    width: 100%;
    height: 20%;
    border-radius: 1rem;
    background-image: url(${(props) => props.bgphoto});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border: ${(props) => (props.bgphoto ? "none" : "4px solid #d9d9d9")};
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
        border-color: #278cff;

        svg {
            color: #278cff;
        }
    }

    svg {
        color: #d9d9d9;
        width: 70%;
        height: 70%;
    }
`;

const InputContainer = styled.div`
    width: 100%;
    height: auto;
`;

const InputLabel = styled.p`
    font-size: 100%;
    font-family: "Pretendard-Regular";
    letter-spacing: 2%;
    margin-top: 5%;
    margin-bottom: 4%;
    color: ${(props) => (props.isActive ? "#C6C6C6" : "#030303")};
`;

const InputWrapper = styled.div`
    position: relative;
    width: 100%;

    input {
        width: 100%;
        background: none;
        border: none;
        border-bottom: 1px solid #c6c6c6;
        padding: 2% 0 2% 1%;
        box-sizing: border-box;
        font-size: 100%;
        font-family: "Pretendard-Light";
        letter-spacing: 2%;
        color: #030303;
        margin-bottom: 4%;

        ::placeholder {
            color: #c6c6c6;
        }
    }

    p {
        position: absolute;
        color: #030303;
        width: 1em;
        height: 1.7em;
        top: 50%;
        transform: translateY(-50%);
        right: 0%;
        font-family: "Pretendard-Regular";
        font-size: 140%;
    }
`;

const BtnWrapper = styled.div`
    width: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 7%;

    div {
        height: 20%;
    }
`;

const AddPracticeRoom = () => {
    const addPractice = useMatch(
        "/owner/practiceRoom/:practiceRoomId/practiceRoomDetail"
    );
    const navigate = useNavigate();
    const [roomName, setRoomName] = useState("");
    const [roomPrice, setRoomPrice] = useState("");
    const { practiceRoomDetailId, practiceRoomId } = useParams();
    const [previewImg, setPreviewImg] = useState(""); // 브라우저에 보여줄 이미지 주소
    const [img, setImg] = useState(null); // firebase에 저장할 img 정보
    const [notUpload, setNotUpload] = useState(true);

    useEffect(() => {
        if (practiceRoomDetailId) {
            console.log(practiceRoomDetailId);
            getOwnerPracticeRoomDetail(practiceRoomDetailId).then((res) => {
                setPreviewImg(res.image);
                setRoomName(res.name);
                setRoomPrice(res.fee);
            });
        }
    }, [practiceRoomDetailId]);

    const handleAddRoom = () => {
        if (!roomName || !roomPrice) {
            alert("룸명과 가격을 모두 입력해주세요.");
            return;
        }

        // 내부 방 추가할 떄
        if (notUpload && addPractice) {
            // firebase에 이미지 업로드 완료시 알림
            uploadImg(img).then((url) => {
                const body = {
                    name: roomName,
                    fee: roomPrice,
                    image: url,
                    status: "AVAILABLE",
                };
                postOwnerPracticeRoomDetail(practiceRoomId, body)
                    .then((res) => {
                        {
                            alert("방이 추가되었습니다.");
                            setNotUpload(true);
                            navigate("/owner/practiceRoom");
                        }
                        console.log(res);
                    })
                    .catch((e) => console.log(e));
            });
        } else if (notUpload && !addPractice && img) {
            // 내부방 이미지가 변경될 떄
            uploadImg(img).then((url) => {
                const body = {
                    name: roomName,
                    fee: roomPrice,
                    image: url,
                    status: "AVAILABLE",
                };
                console.log("Img changed");
                console.log(body);
                patchOwnerPracticeRoomDetail(
                    practiceRoomDetailId,
                    body,
                    "PATCH"
                )
                    .then((res) => {
                        {
                            alert("방 정보가 변경되었습니다.");
                            setNotUpload(true);
                            navigate("/owner/practiceRoom");
                        }
                        console.log(res);
                    })
                    .catch((e) => console.log(e));
            });
        } else if (notUpload) {
            // 내부방 이미지가 그대로일 때
            const body = {
                name: roomName,
                fee: roomPrice,
                image: previewImg,
                status: "AVAILABLE",
            };
            console.log("Img Not change");
            console.log(body);
            patchOwnerPracticeRoomDetail(practiceRoomDetailId, body, "PATCH")
                .then((res) => {
                    alert("방 정보가 변경되었습니다.");
                    setNotUpload(true);
                    navigate("/owner/practiceRoom");
                })
                .catch((e) => console.log(e));
        } else {
            console.log("업로드 중입니다.");
        }
    };

    const toggleStatus = () => {
        if (practiceRoomDetailId) {
            patchPracticeRoomDetailStatus(practiceRoomDetailId)
                .then((res) => {
                    res.isSuccess &&
                        alert(
                            `내부 방 상태가 [${res.result.status}]로 변경되었습니다.`
                        );
                    navigate("/owner/practiceRoom");
                })
                .catch((e) => console.log(e));
        }
    };

    // firebase에 이미지 저장하는 함수
    const uploadImg = (file) => {
        return new Promise((resolve, reject) => {
            try {
                setNotUpload(false);
                const storage = getStorage(app);
                // 연습실 내부방 사진 이름 형식 = zic/{대여자 이름}/room/{파일 이름}_{현재 시간}
                const fileName = `zic/${localStorage.getItem(
                    "userName"
                )}_${localStorage.getItem("userId")}/room/${
                    file.name
                }_${new Date().getTime()}`;
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
                        setNotUpload(true);
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
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop }); // html 컴포넌트와 연결

    return (
        <Container>
            <AddPhoto {...getRootProps()} bgphoto={previewImg}>
                {previewImg != "" ? null : <MdOutlineAddPhotoAlternate />}
                <input multiple={false} name="imgUrl" {...getInputProps()} />
            </AddPhoto>

            <InputContainer>
                <InputLabel isActive={roomName != ""}>룸명</InputLabel>
                <InputWrapper>
                    <input
                        type="text"
                        placeholder="룸명을 입력해 주세요."
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                    />
                </InputWrapper>
                <InputLabel isActive={roomPrice != ""}>
                    시간 당 이용 가격
                </InputLabel>
                <InputWrapper>
                    <input
                        type="text"
                        placeholder="00,000"
                        value={roomPrice}
                        onChange={(e) => setRoomPrice(e.target.value)}
                    />
                    <p>원</p>
                </InputWrapper>
            </InputContainer>

            <BtnWrapper>
                {addPractice ? (
                    <div />
                ) : (
                    <Button
                        text={"이용중지"}
                        height={"20%"}
                        onClick={toggleStatus}
                    />
                )}
                <Button
                    text={addPractice ? "+ 룸 추가하기" : "변경하기"}
                    reverse={true}
                    height={"20%"}
                    onClick={handleAddRoom}
                />
            </BtnWrapper>
        </Container>
    );
};

export default AddPracticeRoom;
