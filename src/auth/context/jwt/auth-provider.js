'use client';

import PropTypes from 'prop-types';
import { useMemo, useEffect, useReducer, useCallback } from 'react';

import axios, { endpoints } from 'src/utils/axios';

import { AuthContext } from './auth-context';
import { setSession, isValidToken, parseCookies } from './utils';

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

const initialState = {
    user: null,
    loading: true,
};

const reducer = (state, action) => {
    if (action.type === 'INITIAL') {
        return {
            loading: false,
            user: action.payload.user,
        };
    }
    if (action.type === 'LOGIN') {
        return {
            ...state,
            user: action.payload.user,
        };
    }
    if (action.type === 'REGISTER') {
        return {
            ...state,
            user: action.payload.user,
        };
    }
    if (action.type === 'LOGOUT') {
        return {
            ...state,
            user: null,
        };
    }
    return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'tokenLifeTime';

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const initialize = useCallback(async () => {
        try {
            const exp = sessionStorage.getItem(STORAGE_KEY);
            if (exp && isValidToken(exp)) {
                setSession(exp);

                const response = await axios.get(endpoints.auth.me);

                const { user } = response.data;

                dispatch({
                    type: 'INITIAL',
                    payload: {
                        user: {
                            ...user,
                            accessToken,
                        },
                    },
                });
            } else {
                dispatch({
                    type: 'INITIAL',
                    payload: {
                        user: null,
                    },
                });
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: 'INITIAL',
                payload: {
                    user: null,
                },
            });
        }
    }, []);

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    useEffect(() => {
        initialize();
    }, [initialize]);

    
    // LOGIN
    const login = useCallback(async (email, password) => {
        await csrf()

        const data = {
            email,
            password,
        };

        const response = await axios.post(endpoints.auth.login, data);

        const { user, exp } = response.data;

        setSession(exp);

        dispatch({
            type: 'LOGIN',
            payload: {
                user
            },
        });
    }, []);

    // REGISTER
    const register = useCallback(async ({ email, password, password_confirmation, first_name, last_name }) => {
        await csrf()

        const data = {
            email,
            password,
            password_confirmation,
            first_name,
            last_name,
        };

        const response = await axios.post(endpoints.auth.register, data);

        const { exp, user } = response.data;

        sessionStorage.setItem(STORAGE_KEY, exp);

        dispatch({
            type: 'REGISTER',
            payload: {
                user
            },
        });
    }, []);

    // LOGOUT
    const logout = useCallback(async () => {
        setSession(null);
        dispatch({
            type: 'LOGOUT',
        });
    }, []);

    // ----------------------------------------------------------------------

    const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

    const status = state.loading ? 'loading' : checkAuthenticated;

    const memoizedValue = useMemo(
        () => ({
            user: state.user,
            method: 'jwt',
            loading: status === 'loading',
            authenticated: status === 'authenticated',
            unauthenticated: status === 'unauthenticated',
            //
            login,
            register,
            logout,
        }),
        [login, logout, register, state.user, status]
    );

    return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
    children: PropTypes.node,
};
