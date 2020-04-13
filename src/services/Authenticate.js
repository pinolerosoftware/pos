import axios from 'axios';
const tokenKey = 'token';
const userIdKey = 'userId';
const companyIdKey = 'companyId';

const signIn = (data) => {    
    const { token, userId, companyId } = data;
    if(!token || !userId || !companyId) return;
    localStorage.setItem(tokenKey, token);
    localStorage.setItem(userIdKey, userId);
    localStorage.setItem(companyIdKey, companyId);
}

const isAuth = () => {
    let token = localStorage.getItem(tokenKey);
    let userId = localStorage.getItem(userIdKey);
    let companyId = localStorage.getItem(companyIdKey);
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
    return token && userId && companyId;
}

const getCompanyId = () => {
    const companyId = localStorage.getItem(companyIdKey);
    return companyId;
}

const getUserId = () => {
    const userId = localStorage.getItem(userIdKey);
    return userId;
}

export default {
    signIn,
    isAuth,
    getCompanyId,
    getUserId
}