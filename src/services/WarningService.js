import { ToastAndroid } from 'react-native';

const BASE_MESSAGE = 'A server error occured, please retry later.';

export const showWarning = (error, message = BASE_MESSAGE) => {
    ToastAndroid.show(message, ToastAndroid.LONG, ToastAndroid.BOTTOM);
};
