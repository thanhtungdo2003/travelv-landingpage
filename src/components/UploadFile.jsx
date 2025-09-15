import jsQR from "jsqr";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useQrCustom } from "../contexts/customQr";

export default function FileUpload() {
    const uploadQrRef = useRef();
    const [isUploadDragging, setIsUploadDragging] = useState(false);
    const {setQrSrc} = useQrCustom();

    const handleUploadDrop = (e) => {
        e.preventDefault();
        setIsUploadDragging(false)
        const file = e.dataTransfer.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const imageUrl = event.target.result;
            setQrSrc(imageUrl);

            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);                
            };
            img.src = imageUrl;
        };
        reader.readAsDataURL(file);

    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const imageUrl = event.target.result;
            setQrSrc(imageUrl);

            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);                
            };
            img.src = imageUrl;
        };
        reader.readAsDataURL(file);
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const handleDragEnter = () => {
        setIsUploadDragging(true);
    };
    const handleDragLeave = () => {
        setIsUploadDragging(false);
    };
    return (<>
        <div className='upload-container'>
            <div className='upload-zone' style={{
                backgroundColor: isUploadDragging ? "rgba(55, 55, 55, 1)" : "",
                position: "relative"
            }}

            >
                <div style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    zIndex: 100

                }}
                    onClick={() => {
                        uploadQrRef.current.click();
                    }}
                    onDragOver={handleDragOver}
                    onDrop={handleUploadDrop}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                >

                </div>
                <div className='upload-zone-icon'>
                    <Upload color='rgba(167, 167, 167, 1)' size={40} />
                </div>
                <div className='upload-zone-title' style={{ color: "rgba(167, 167, 167, 1)" }}>Upload your QR code</div>
                <div className='upload-zone-title' style={{ color: "rgba(167, 167, 167, 1)" }}>Click and up or drop your QR code image</div>
            </div>
            <input ref={uploadQrRef} type='file' style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    </>)
}