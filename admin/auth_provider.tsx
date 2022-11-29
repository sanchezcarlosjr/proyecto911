import {AuthProvider, fetchUtils} from 'react-admin';

export const authProvider: AuthProvider = {
    login: async params => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: params.username, password: params.password})
            }).then((response) => response.json());
            localStorage.setItem('token', response.token);
            return Promise.resolve();
        }
        catch (e) {
            return Promise.reject();
        }
    },
    checkError: error =>  {
        if (error.status === 401 || error.status === 403) {
            localStorage.clear();
            return Promise.reject('ra.auth.auth_check_error');
        }
        return Promise.resolve();
    },
    checkAuth: async params => {
        if (localStorage.getItem('token') === null) {
            return Promise.reject({status: 401});
        }
        try {
            const sessions = await fetch(`/api/sessions/${localStorage.getItem('token')}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (sessions.status === 401) {
                return Promise.reject({status: 401});
            }
            return Promise.resolve();
        } catch (e) {
            return Promise.reject({status: 401});
        }
    },
    logout: () => {
        localStorage.clear();
        return Promise.resolve();
    },
    // authorization
    getPermissions: () => Promise.resolve(/* ... */),
};
