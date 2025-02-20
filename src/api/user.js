import axios from "axios";

// 이용자 전용 연습실 단일 조회 api
export const getUserPracticeRoom = async (id) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/practice-rooms/${id}`
        );
        return response.data.result; // 성공적인 응답 처리
    } catch (err) {
        console.error(err); // 에러 처리
        throw err;
    }
};

// 이용자 전용 연습실 내부 방 목록 조회 api
export const getUserPracticeRoomDetailList = async (id, page, date) => {
    try {
        const response = await axios.get(
            `${
                import.meta.env.VITE_API_URL
            }/api/practice-room-details?practiceRoomId=${id}&page=${page}&size=${100}&date=${date}`
        );
        return response.data.result.resultList; // 성공적인 응답 처리
    } catch (err) {
        console.error(err); // 에러 처리
        throw err;
    }
};

// 이용자 전용 연습실 내부 방 목록 조회 api
export const getUserPracticeRoomDetail = async (id) => {
    try {
        const response = await axios.get(
            `${
                import.meta.env.VITE_API_URL
            }/api/practice-room-details/${id}`
        );
        return response.data.result; // 성공적인 응답 처리
    } catch (err) {
        console.error(err); // 에러 처리
        throw err;
    }
};
