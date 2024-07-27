import axios from 'axios';
import { Environment } from '../environments/environments';
import TokenDTO from '@/models/TokenDTO';

export const generateToken = authModel => {
    return axios.post(Environment.baseUrl+"auth/generateToken" ,authModel);
};

export const isExpiredToken = (headerToken) => {
    return axios.get(Environment.baseUrl+"auth/isExpiredToken",{headers: {Authorization: headerToken}});
}

export const createWhisper = (whisperModel, headerToken) => {
    return axios.post(Environment.baseUrl+"whisper/locked/create",{headers: {Authorization: headerToken}},whisperModel);
}

export const getWhisper = (urlName) => {
    return axios.get(Environment.baseUrl+"whisper/getUrlName/"+urlName);
}

export const getPageableWhispers = (categoryName,page) => {
    return axios.get(Environment.baseUrl+"whisper/category/"+categoryName,{params: {page , size: 2}});
}

export const getWhispers = () => {
    return axios.get(Environment.baseUrl+"whisper/getWhispers");
}

export const getPendingWhispers = () => {
    return axios.get(Environment.baseUrl+"whisper/getPendingWhispers");
}

export const getUsers = () => {
    return axios.get(Environment.baseUrl+"user/getUsers");
}
