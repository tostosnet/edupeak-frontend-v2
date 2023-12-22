import { paths } from 'src/routes/paths';

import axios from 'src/utils/axios';
import jwt from 'jsonwebtoken';
// import { cookies } from 'next/headers';

// ----------------------------------------------------------------------


function jwtDecode(token) {
    try {
        const decoded = jwt.decode(token, { complete: true });
        console.log(decoded);

        if (decoded) return decoded.payload;
        else throw new Error('Error decoding JWT')
    } catch (error) {
        // Handle decoding error
        console.error(error.message);
        return null;
    }
}

// ----------------------------------------------------------------------

export const isValidToken = (exp) => {
    if (!exp) {
        return false;
    }

    // const decoded = jwtDecode(accessToken);

    const currentTime = Date.now() / 1000;

    return exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp) => {
    // eslint-disable-next-line prefer-const
    let expiredTimer;

    const currentTime = Date.now();

    // Test token expires after 10s
    // const timeLeft = currentTime + 10000 - currentTime; // ~10s
    const timeLeft = exp * 1000 - currentTime;

    clearTimeout(expiredTimer);

    expiredTimer = setTimeout(() => {
        alert('Token expired');

        sessionStorage.removeItem('tokenLifeTime');

        window.location.href = paths.auth.jwt.login;
    }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (exp) => {
    if (exp) {
        // This function below will handle when token is expired
        tokenExpired(exp);
        sessionStorage.setItem('tokenLifeTime', exp);
    } else {
        sessionStorage.removeItem('tokenLifeTime');
    }
};



// utils/cookie.js

// export function parseCookies() {
//     const cookieStore = cookies()
//     const token = cookieStore.get('token')
//     console.log(cookieStore, token);
    
//     return {
//         token,
//         get: (name) => token[name],
//         properties: (name) => token[name],
//     };
// }
