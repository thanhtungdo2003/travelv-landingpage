import axios from 'axios';
import { getTokenCookie } from './AccountService';
import JSZip from "jszip";
import { saveAs } from "file-saver";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1";

export const genQrCode = async (input, getMatrix) => {
    try {
        const response = await axios.get(`/qr/generate?text=${input}&get_matrix=${getMatrix || 'false'}&fill_color=black&back_color=white`, { responseType: getMatrix ? "json" : "blob" });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const genMultiQrCode = async (input) => {
    try {
        const response = await axios.post(`/qr/generate-multiple`, {
            texts: input,
            fill_color: "black",
            back_color: "white"
        });
        return response.data;
    } catch (err) {
        console.log(err);
        return err

    }
}

export const genQrPrivate = async (qrdata) => {
    try {
        const { password, data, message } = qrdata;
        const response = await axios.post(`/qr/qr-private/?data=${data}&password=${password}&message=${message}`, {}, {
            headers: {
                Authorization: `Bearer ${getTokenCookie()}`
            }
        });
        return response.data;
    } catch (err) {
        console.log(err);
        return err
    }
}

export const unlockQrPrivate = async (qrdata) => {
    try {
        const { id, password, username } = qrdata;
        const response = await axios.get(`/qr/qr-private/${id}?username=${username}&password=${password}`);
        return response.data;
    } catch (err) {
        console.log(err);
        return err
    }
}
export const predictUrl = async (input) => {
    try {
        const response = await axios.get(`/qr/predict_url?url=${input}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const handleDownload = async (input) => {
    const data = await genQrCode(input);
    const blob = new Blob([data], { type: "image/png" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "qr-code.png";
    link.click();
    URL.revokeObjectURL(link.href);
};

export function detectQrContent(data) {
    if (!data || typeof data !== "string") return "Unknown";
    data = data.trim();
    // vCard
    if (data.startsWith("BEGIN:VCARD")) {
        return {
            title: "vCard",
            name: "vcard",
        };
    }
    // Phone number (tel:)
    if (data.toLowerCase().startsWith("tel:")) {
        return {
            title: "Phone Number",
            name: "phone"
        };
    }
    if (data.toLowerCase().startsWith("spxvn")) {
        return {
            title: "SPX Express Code",
            name: "spxvn"
        }
    }
    // Email
    if (data.toLowerCase().startsWith("mailto:") || /\S+@\S+\.\S+/.test(data)) {
        return {
            title: "Email",
            name: "email"
        }
    }
    // URL
    try {
        const url = new URL(data);
        return {
            title: "URL",
            name: "url",
            cleanUrl: url.href.replace(/^https?:\/\//, "")
        }
    } catch (_) {
        // not a valid URL
    }
    // default fallback
    return {
        title: "Text",
        name: "text"
    }
}


export async function downloadZip(images) {
    const zip = new JSZip();
    console.log(images)
    images.forEach((item, index) => {
        // item có thể là object { input, image }
        // lấy phần base64 sau dấu phẩy
        const base64Data = item.src.includes(",")
            ? item.src.split(",")[1]
            : item.src;
        // thêm vào zip
        zip.file(`qr_${index + 1}.png`, base64Data, { base64: true });
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "qrs.zip");
}

export function getMapURL(type, location) {
    switch (type) {
        case 'google':
            return `https://www.google.com/maps?q=${location?.lat},${location?.lng}`
        case 'openstreet':
            return `https://www.openstreetmap.org/?mlat=${location?.lat}&mlon=${location?.lng}#map=18/${location?.lat}/${location?.lng}`
        case 'bing':
            return `https://www.bing.com/maps?q=${location?.lat},${location?.lng}`
        case 'HERE':
            return `https://wego.here.com/?map=${location?.lat},${location?.lng},18,normal`
        case 'apple':
            return `https://maps.apple.com/?ll=${location?.lat},${location?.lng}`
        case 'googleearth':
            return `https://earth.google.com/web/@${location?.lat},${location?.lng}`
    }
}