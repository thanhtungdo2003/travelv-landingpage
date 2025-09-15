import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1";

export const paypalCapture = async (order_token, order_id) => {
    try {
        const response = await axios.post(`/payment/paypal/capture?order_id=${order_id}&order_token=${order_token}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const orderCreate = async (pay_token) => {
    try {
        const response = await axios.post(`/order/create/${pay_token}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}