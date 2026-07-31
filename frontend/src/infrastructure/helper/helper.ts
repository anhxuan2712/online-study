import dayjs from "dayjs";
import moment from "moment";
import Constants from "../../core/common/constants";
const baseURL = process.env.REACT_APP_BASE_URL
export const validateFields = (isImplicitChange = false, key: any, isCheck: any, setError: Function, error: any, message: string) => {
    if (isImplicitChange) {
        error[key] = {
            isError: isCheck,
            message: message,
        };
    }
    else {
        setError({
            ...error,
            [key]: {
                isError: isCheck,
                message: message,
            }
        });
    }
};

export const configImageURL = (img: string) => {
    if (img) {
        return `${baseURL}/preview/${img}`
    }
    return ""
}

export const convertStringToBoolean = (value: string) => {
    const booleanValue = value === 'true'; // Chuyển chuỗi 'true' và 'false' về boolean
    return booleanValue
};

export const convertDate = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("YYYY-MM-DD hh:mm:ss");
    } return null;

};
export const convertDateShow = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("hh:mm:ss DD-MM-YYYY");
    } return null;

};

export const convertDateOnlyShow = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("DD-MM-YYYY");
    } return null;

};

export const convertDateOnly = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("YYYY-MM-DD");
    } return null;

};
export const convertDateBooking = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("YYYY-MM-DDThh:mm:ss");
    } return null;
};

export const formatCurrencyVND = (amount: string) => {
    // Định dạng số với phân cách hàng nghìn
    let formattedAmount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedAmount} ₫`;
}
export const configGender = (gender: boolean) => {
    if (gender == Constants.Gender.MALE.value) {
        return Constants.Gender.MALE.position
    }
    else if (gender == Constants.Gender.FEMALE.value) {
        return Constants.Gender.FEMALE.position
    }
}
