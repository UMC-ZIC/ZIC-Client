import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    font-size: 2rem;
    color: white;
    transition: all 0.3s ease-in-out;

    p {
        font-family: "Alongserifbsc";
    }

    .path {
        stroke: white;
        stroke-width: 2;
        stroke-dasharray: 1000; /* 기본적으로 긴 길이를 설정 */
        stroke-dashoffset: 1000; /* 처음에는 점선이 보이지 않도록 설정 */
        animation: draw-stroke 2s forwards, fill-path 3.5s linear; /* 애니메이션을 동시에 실행 */
    }

    @keyframes draw-stroke {
        100% {
            stroke-dashoffset: 0; /* 점선이 모두 연결되도록 */
        }
    }

    @keyframes fill-path {
        0% {
            fill: none; /* 처음에는 채워지지 않음 */
        }
        100% {
            fill: white; /* 애니메이션 완료 시 경로가 채워짐 */
        }
    }
`;

const Loading = () => {
    const pathRef1 = useRef(null);
    const pathRef2 = useRef(null);
    const pathRef3 = useRef(null);
    const [query] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (query.get("jwtAccessToken")) {
            // 로그인 처리 구현
            const jwtAccessToken = query.get("jwtAccessToken");
            const decodedToken = jwtDecode(jwtAccessToken);
            const userId = decodedToken.userId;
            const userName = decodedToken.userName;
            const userType = decodedToken.userType;

            console.log("받은 JWT 액세스 토큰:", jwtAccessToken);
            console.log("받은 JWT 액세스 토큰:", userId);
            console.log("받은 JWT 액세스 토큰:", userName);
            console.log("받은 JWT 액세스 토큰:", userType);

            // 로컬 스토리지 또는 쿠키에 저장
            localStorage.setItem("accessToken", jwtAccessToken);
            localStorage.setItem("userId", userId);
            localStorage.setItem("userName", userName);
            localStorage.setItem("userType", userType);

            // 이후 필요한 페이지로 이동 (예: 홈 화면)
            if (userType === "USER") {
                window.location.href = "/";
            }
            if (userType === "PENDING") {
                window.location.href = "/join/category/";
            }
            if (userType === "OWNER") {
                window.location.href = "/owner/";
            }
        } else if (query.get("pg_token")) {
            // 결제 토큰 처리
            const storedData = JSON.parse(
                window.sessionStorage.getItem("reservationData")
            );
            const body = {
                reservationId: storedData.reservationId,
                tid: storedData.tid,
                partner_order_id: storedData.reservationNumber,
                pg_token: query.get("pg_token"),
            };

            const option = {
                url: `${
                    import.meta.env.VITE_API_URL
                }/api/reservation/payment/kakao/approve`,
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                    "Content-Type": "application/json",
                },
                data: body,
            };

            axios(option)
                .then((res) => {
                    res.data.isSuccess
                        ? navigate(`/user/reservation?${storedData.date}`)
                        : alert("예약 결제 처리 중 문제가 발생하였습니다.");
                    navigate("/");
                })
                .catch((err) => console.error(err));
        } else {
            // TODO : 바꾸기
            console.log("이 페이지에 대한 접근 권한이 없습니다.");
            // alert("이 페이지에 대한 접근 권한이 없습니다.");
            // navigate(-1);
        }
    }, [query]);

    useEffect(() => {
        // ZIC 로고 애니메이션 담당
        if (pathRef1.current && pathRef2.current && pathRef3.current) {
            const length1 = pathRef1.current.getTotalLength();
            const length2 = pathRef2.current.getTotalLength();
            const length3 = pathRef3.current.getTotalLength();

            // 각 path의 stroke-dasharray와 stroke-dashoffset을 해당 경로의 길이에 맞게 설정
            pathRef1.current.style.strokeDasharray = length1;
            pathRef1.current.style.strokeDashoffset = length1;

            pathRef2.current.style.strokeDasharray = length2;
            pathRef2.current.style.strokeDashoffset = length2;

            pathRef3.current.style.strokeDasharray = length3;
            pathRef3.current.style.strokeDashoffset = length3;
        }
    }, []);

    // return <Container><p>ZIC</P></Container>;
    return (
        <Container>
            <svg
                width="105"
                height="47"
                viewBox="0 0 105 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    className="path"
                    ref={pathRef1}
                    d="M0 41.9486L27.1376 2.25984H11.8727C6.55824 2.25984 4.07065 5.65208 4.07065 9.72271H3.27914V0.563721H36.2965V2.25984L8.36744 43.7577H25.1023C30.1906 43.7577 33.0174 42.1747 35.505 36.7472L36.2965 37.1995L32.6782 45.5669H0V42.1747V41.9486Z"
                    fill="white"
                />
                <path
                    className="path"
                    ref={pathRef2}
                    d="M48.3449 40.1394V5.42588C48.3449 2.82519 46.875 1.35523 44.5005 1.35523V0.563721H59.6523V1.35523C57.3908 1.35523 55.8078 2.82519 55.8078 5.42588V40.2525C55.8078 42.8532 57.0516 44.5492 59.6523 44.5492V45.3407H44.5005V44.5492C46.875 44.5492 48.3449 42.8531 48.3449 40.1394Z"
                    fill="white"
                />
                <path
                    className="path"
                    ref={pathRef3}
                    d="M67.0654 21.9362C67.1785 7.01048 78.2597 0 89.2278 0H103.701V13.6819H102.684C102.684 7.46283 94.6553 0.339199 86.514 1.92223C78.9381 3.39218 74.3022 11.4204 74.9806 22.1624C75.7721 34.4873 83.6872 41.9501 90.9239 42.6286C98.1606 43.307 104.267 37.6534 104.153 28.4944H104.945C104.945 37.4272 99.6306 46.36 89.454 46.36C78.0336 46.36 67.0655 37.2011 67.1785 21.8231L67.0654 21.9362Z"
                    fill="white"
                />
            </svg>
        </Container>
    );
};

export default Loading;
