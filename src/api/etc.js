import axios from "axios";
import { jwtDecode } from "jwt-decode";

// TODO : 나중에 삭제하기
export const getTestJWT = async (id) => {
    try {
        const response = await axios.get(
            `${
                import.meta.env.VITE_API_URL
            }/api/test/user/get-token-from-user-id?userId=${id}`
        );
        const decoded = jwtDecode(response.data);
        localStorage.setItem("accessToken", response.data);
        localStorage.setItem("userId", decoded.userId);
        localStorage.setItem("userName", decoded.userName);
        localStorage.setItem("userType", decoded.userType);

        console.log(decoded);
        return true; // 성공적인 응답 처리
    } catch (err) {
        console.error(err); // 에러 처리
        throw err;
    }
};
// -------------------------------------------------------------------

// 연습실 좋아요 목록 조회 api
export const getPracticeRoomLike = async (id) => {
    try {
        const response = await axios.get(
            `${
                import.meta.env.VITE_API_URL
            }/api/practice-rooms/${id}/likes/count`,
            {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data.result.likeList; // 성공적인 응답 처리
    } catch (err) {
        console.error(err); // 에러 처리
        throw err;
    }
};

// 연습실 좋아요 변경 api
export const postPracticeRoomLike = async (id) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/practice-rooms/${id}/like`,
            {},
            {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data.isSuccess; // 성공적인 응답 처리
    } catch (err) {
        console.error(err); // 에러 처리
        throw err;
    }
};
