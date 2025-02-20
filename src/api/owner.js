import axios from "axios";

// 대여자 전용 수익 통게 조회 api
export const axiosRevenue = async (date) => {
    const option = {
        url: `${import.meta.env.VITE_API_URL}/api/owner/revenue?date=${date}`,
        method: "GET",
        headers: {
            Authorization: localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
        },
    };

    try {
        const res = await axios(option);
        return res.data.result; // 데이터를 반환
    } catch (err) {
        console.error(err);
        return err.result; // 에러가 나면 빈 객체 반환
    }
};

// 대여자 전용 연습실과 내부 방 목록 조회 api
export const axiosOwnerPracticeRoomDetail = async () => {
    const option = {
        url: `${import.meta.env.VITE_API_URL}/api/practice-room-details/owner`,
        method: "GET",
        headers: {
            Authorization: localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
        },
    };

    try {
        const res = await axios(option);
        return res.data.result; // 데이터를 반환
    } catch (err) {
        console.error(err);
        return err.result; // 에러가 나면 빈 객체 반환
    }
};

// 대여자 전용 연습실 내부 방 단일 조회 api
export const getOwnerPracticeRoomDetail = async (practiceRoomDetailId) => {
    const option = {
        url: `${
            import.meta.env.VITE_API_URL
        }/api/practice-room-details/${practiceRoomDetailId}`,
        method: "GET",
        headers: {
            Authorization: localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
        },
    };

    try {
        const res = await axios(option);
        return res.data.result; // 데이터를 반환
    } catch (err) {
        console.error(err);
        return err.result; // 에러가 나면 빈 객체 반환
    }
};

// 대여자 전용 연습실 내부 방 정보 변경 api
export const patchOwnerPracticeRoomDetail = async (id, body, method) => {
    const option = {
        url: `${import.meta.env.VITE_API_URL}/api/practice-room-details/${id}`,
        method: method,
        headers: {
            Authorization: localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
        },
        data: body,
    };

    try {
        const res = await axios(option);
        return res.data.result; // 데이터를 반환
    } catch (err) {
        console.error(err);
        return err.result; // 에러가 나면 빈 객체 반환
    }
};

// 대여자 전용 연습실 내부 방 이용 가능 상태 변경 api
export const patchPracticeRoomDetailStatus = async (id) => {
    try {
        const response = await axios.patch(
            `${
                import.meta.env.VITE_API_URL
            }/api/practice-room-details/status/${id}`,
            {},
            {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data; // 성공적인 응답 처리
    } catch (err) {
        console.error(err); // 에러 처리
        throw err;
    }
};

// 대여자 전용 연습실 내부 방 등록 api
export const postOwnerPracticeRoomDetail = async (id, body) => {
    try {
        const response = await axios.post(
            `${
                import.meta.env.VITE_API_URL
            }/api/practice-room-details?practiceRoomId=${id}`,
            body,
            {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data; // 성공적인 응답 처리
    } catch (err) {
        console.error(err); // 에러 처리
        throw err;
    }
};

// 대여자 전용 연습실 내부 방 정보 변경 api
export const patchOwnerPracticeRoom = async (id, body) => {
    try {
        const response = await axios.patch(
            `${import.meta.env.VITE_API_URL}/api/practice-rooms/${id}`,
            body,
            {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data; // 성공적인 응답 처리
    } catch (err) {
        console.error(err); // 에러 처리
        throw err;
    }
};
