import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1";

export const paypalCapture = async (pay_token, order_id) => {
    try {
        const response = await axios.post(`/payment/paypal/capture?order_id=${order_id}&pay_token=${pay_token}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const paid = async (pay_token) => {
    try {
        const response = await axios.post(`/bookings/paid/${pay_token}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}