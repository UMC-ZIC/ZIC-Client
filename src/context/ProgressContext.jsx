import { createContext, useContext, useState } from "react";

// 진행률 관리용 Context 생성
const ProgressContext = createContext();

// Context Provider
export const ProgressProvider = ({ children }) => {
    const [progress, setProgress] = useState(0);
    
    return (
        <ProgressContext.Provider value={{ progress, setProgress }}>
            {children}
        </ProgressContext.Provider>
    );
};

// Hook을 사용해서 쉽게 접근할 수 있도록
export const useProgress = () => useContext(ProgressContext);
