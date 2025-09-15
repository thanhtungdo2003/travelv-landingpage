import React, { createContext, useContext, useState } from "react";
const CustomQrContext = createContext();
export const CustomQrProvider = ({ children }) => {

    const [qrData, setQrData] = useState(null);
    const [qrSrc, setQrSrc] = useState('none');
    const [readAt, setReadAt] = useState("");
    const [risksData, setRisksData] = useState(null);
    return (
        <CustomQrContext.Provider value={{
            qrData, setQrData,
            qrSrc, setQrSrc,
            readAt, setReadAt,
            risksData, setRisksData
        }}>
            {children}
        </CustomQrContext.Provider>
    );
};

export const useQrCustom = () => useContext(CustomQrContext);
