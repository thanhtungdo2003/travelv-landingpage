import React, { createContext, useContext, useState } from "react";
const GenQrContext = createContext();
export const GenQrProvider = ({ children }) => {

    const [latLng, setLatLng] = useState(null);
    const [qrCanvas, setQrCanvas] = useState(null);

    const downloadQrCanvas = () => {
        if (qrCanvas) {
            qrCanvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'qrcode.png';
                link.click();
                URL.revokeObjectURL(url);
            }, 'image/png');
        }
    }
    return (
        <GenQrContext.Provider value={{
            latLng, setLatLng,
            qrCanvas, setQrCanvas,
            downloadQrCanvas
        }}>
            {children}
        </GenQrContext.Provider>
    );
};

export const useGencode = () => useContext(GenQrContext);
