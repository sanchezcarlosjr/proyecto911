import {AuthProvider} from 'react-admin';

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
    checkError: error => Promise.reject(/* ... */),
    checkAuth: async params => {
        try {
            if (localStorage.getItem('token') === null) {
                return Promise.reject();
            }
            await fetch(`/api/sessions/${localStorage.getItem('token')}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            return Promise.resolve();
        } catch (e) {
            return Promise.reject();
        }
    },
    logout: () => {
        localStorage.clear();
        return Promise.resolve();
    },
    // authorization
    getPermissions: () => Promise.resolve(/* ... */),
};
