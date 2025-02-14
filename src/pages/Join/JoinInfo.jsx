import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../Components/Button";
import { JoinContainer } from "../../styles/container";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { regions, instruments } from "../../assets/category";
import ScrollContainer from "react-indiana-drag-scroll";
import { useProgress } from "../../context/ProgressContext.jsx";

const InputContainer = styled.div`
    width: 100%;
    height: 20%;
    margin-bottom: 60%;
`;

const InputLabel = styled.p`
    font-size: 100%;
    font-family: "Pretendard-Regular";
    letter-spacing: 2%;
    margin-top: 5%;
    margin-bottom: 2%;
    color: ${(props) => (props.isActive ? "#C6C6C6" : "#030303")};
`;

const InputWrapper = styled.div`
    position: relative;
    width: 100%;

    input {
        width: 100%;
        background: none;
        border: none;
        border-bottom: 1px solid #dcdcdc;
        padding: 2% 0 2% 1%;
        box-sizing: border-box;
        font-size: 100%;
        font-family: "Pretendard-Regular";
        letter-spacing: 2%;
        color: #030303;
    }

    svg {
        position: absolute;
        color: #c6c6c6;
        width: 1.7em;
        height: 1.7em;
        top: 50%;
        transform: translateY(-50%);
        right: 0%;
        cursor: pointer;
    }
`;

const RegionCategory = styled(ScrollContainer)`
    width: 100%;
    max-width: 100%;
    height: 30%;
    margin-top: 2%;
    overflow-x: auto;
    display: flex;
    gap: 1%;

    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE, Edge */

    &::-webkit-scrollbar {
        /* Chrome, Safari */
        display: none;
    }
`;

const RegionBtn = styled.button`
    width: 20%;
    background-color: ${(props) => (props.selected ? "#278cff" : "#ffffff")};
    border: 1px solid ${(props) => (props.selected ? "#278cff" : "#dcdcdc")};
    border-radius: 2rem;
    color: ${(props) => (props.selected ? "#ffffff" : "#7d7d7d")};
    font-size: 120%;
    font-family: "Pretendard-Regular";
    cursor: pointer;
    flex-shrink: 0;

    &:hover {
        background-color: #278cff;
        border-color: #63acff;
        color: #ffffff;
    }
`;

const InstrumentContainer = styled.div`
    height: 50%;
    width: 100%;

    p {
        font-size: 100%;
        font-family: "Pretendard-Regular";
        letter-spacing: 2%;
        margin-bottom: 5%;
        color: ${(props) => (props.isActive ? "#C6C6C6" : "#030303")};
    }
`;

const InstrumentWarpper = styled.div`
    height: 70%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 3%;
`;

const InstrumentBtn = styled.button`
    background-color: ${(props) => (props.selected ? "#278CFF" : "#f2f2f2")};
    text-align: center;
    font-size: 100%;
    font-family: "Pretendard-Regular";
    letter-spacing: 2%;
    border: none;
    color: ${(props) => (props.selected ? "#FFFFFF" : "#7d7d7d")};
    cursor: pointer;
`;

const JoinInfo = () => {
    const role = useParams();
    const navigate = useNavigate();
    const [regionToggle, setRegionToggle] = useState(false);
    const [region, setRegion] = useState("");
    const [brand, setBrand] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const [selectedInstruments, setSelectedInstruments] = useState([]);
    const { setProgress } = useProgress();

    const handleNext = () => {
        console.log(region);
        console.log(selectedInstruments);
        // TODO : 로그인 API 설정하기
        navigate(`/join/${role.role}/success`);
    };

    const handleInstrumentClick = (instrument) => {
        setSelectedInstruments(
            (prevSelected) =>
                prevSelected.includes(instrument)
                    ? prevSelected.filter((item) => item !== instrument) // 이미 선택된 악기라면 제거
                    : [...prevSelected, instrument] // 선택되지 않은 악기라면 추가
        );
    };

    return (
        <JoinContainer>
            {role.role == "user" ? (
                <InputContainer>
                    <InputLabel isActive={region != ""}>지역</InputLabel>
                    <InputWrapper>
                        <input
                            type="text"
                            placeholder="도로명, 지번, 건물명 검색"
                            value={region}
                            onChange={(e) => {
                                setRegion(e.target.value);
                            }}
                        />
                        <IoIosSearch
                            onClick={() => setRegionToggle(!regionToggle)}
                        />
                    </InputWrapper>
                    {regionToggle ? (
                        <RegionCategory>
                            {regions.map((el) => (
                                <RegionBtn
                                    key={el}
                                    selected={region == el}
                                    onClick={() => setRegion(el)}
                                >
                                    {el}
                                </RegionBtn>
                            ))}
                        </RegionCategory>
                    ) : null}
                </InputContainer>
            ) : (
                <InputContainer>
                    <InputLabel isActive={brand != ""}>상호명</InputLabel>
                    <InputWrapper>
                        <input
                            type="text"
                            placeholder="상호명을 입력해주세요."
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </InputWrapper>
                    <InputLabel isActive={number != ""}>사업자 번호</InputLabel>
                    <InputWrapper>
                        <input
                            type="text"
                            placeholder="사업자 번호를 입력해주세요."
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </InputWrapper>
                    <InputLabel isActive={region != "" || address != ""}>
                        주소
                    </InputLabel>
                    <InputWrapper>
                        <input
                            type="text"
                            placeholder="도로명, 지번, 건물명 검색"
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                        />
                        <IoIosSearch />
                    </InputWrapper>
                    <InputWrapper>
                        <input
                            type="text"
                            placeholder="상세주소를 작성해주세요."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            style={{ marginTop: "5%" }}
                        />
                    </InputWrapper>
                </InputContainer>
            )}

            <InstrumentContainer isActive={selectedInstruments.length > 0}>
                <p>연주 가능 종목</p>
                <InstrumentWarpper>
                    {instruments.map((instrument) => (
                        <InstrumentBtn
                            key={instrument}
                            selected={selectedInstruments.includes(instrument)} // 선택된 상태 확인
                            onClick={() => handleInstrumentClick(instrument)} // 클릭 이벤트 핸들러
                        >
                            {instrument}
                        </InstrumentBtn>
                    ))}
                </InstrumentWarpper>
            </InstrumentContainer>

            <Button text={"완료"} onClick={handleNext} />
        </JoinContainer>
    );
};

export default JoinInfo;
