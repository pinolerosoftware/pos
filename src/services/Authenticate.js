import axios from 'axios';
const tokenKey = 'token';
const userIdKey = 'userId';

const signIn = (data) => {    
    const { token, userId } = data;
    if(!token || !userId) return;
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
}

const isAuth = () => {
    let token = localStorage.getItem(tokenKey);
    let userId = localStorage.getItem(userIdKey);
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
    return token && userId;
}

export default {
    signIn,
    isAuth
}