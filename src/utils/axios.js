import Axios from 'axios';

import { HOST_API } from 'src/config-global';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------
const axiosInstance = Axios.create({
    baseURL: HOST_API,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    },
    withCredentials: true,
    withXSRFToken: true
});


// Pre-fetch csrf-token for auth authorization
// const csrf = () => axiosInstance.get('/sanctum/csrf-cookie')

// const useCsrfToken = async () => {
//     const response = await axiosInstance.get('/sanctum/csrf-cookie');
//     const token = response.data?.token;
//     if (!token) throw Error("Invalid token");
// }


// Attach csrf_token to request before they are sent
// axiosInstance.interceptors.request.use(csrf, (error) => Promise.resolve(error.response && error.response.data || "Had problem validating request"))


axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
        console.log(error)
        return Promise.reject((error.response && error.response.data) || 'Something went wrong')
    }
);


export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });
    return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
    chat: '/api/chat',
    kanban: '/api/kanban',
    calendar: '/api/calendar',
    auth: {
        me: '/api/user',
        login: '/login',
        register: '/register',
        logout: '/logout',
    },
    mail: {
        list: '/api/mail/list',
        details: '/api/mail/details',
        labels: '/api/mail/labels',
    },
    post: {
        list: '/api/post/list',
        details: '/api/post/details',
        latest: '/api/post/latest',
        search: '/api/post/search',
    },
    product: {
        list: '/api/product/list',
        details: '/api/product/details',
        search: '/api/product/search',
    },
};
