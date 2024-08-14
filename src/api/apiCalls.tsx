import axios from 'axios';
import { Environment } from '../environments/environments';
import TokenDTO from '@/models/TokenDTO';
import { Artifika } from 'next/font/google';
import { Whisper } from '@/components/Account-Info/AccountInfo';

export const generateToken = authModel => {
    return axios.post(Environment.baseUrl+"auth/generateToken" ,authModel);
};

export const isExpiredToken = (expireRequest) => {
    return axios.post<Boolean>(Environment.baseUrl+"auth/isExpiredToken",expireRequest);
}

export const createWhisper = (whisperModel, headerToken) => {
    return axios.post(Environment.baseUrl+"whisper/locked/create",whisperModel,{
        headers: {
            Authorization : 'Bearer '+headerToken
        } });
}

export const getWhisper = (urlName) => {
    return axios.get(Environment.baseUrl+"whisper/getUrlName/"+urlName);
}

export const getPageableWhispers = (categoryName,page) => {
    return axios.get(Environment.baseUrl+"whisper/category/"+categoryName,{params: {page , size: 10}});
}

export const getWhispers = () => {
    return axios.get(Environment.baseUrl+"whisper/getWhispers");
}

export const getPendingWhispers = () => {
    return axios.get(Environment.baseUrl+"whisper/getPendingWhispers");
}

export const getUsers = (headerToken) => {
    return axios.get(Environment.baseUrl+"user/getUsers",{headers: {Authorization: "Bearer "+headerToken}});
}

export const deleteUser = (userId, headerToken) => {
    return axios.delete(Environment.baseUrl+"user/delete/"+userId,{headers: {Authorization: "Bearer "+headerToken}});
}

export const updateRole = (updateDTO,headerToken) => {
    return axios.put(Environment.baseUrl+"user/updateRole",{headers: {Authorization: "Bearer "+headerToken}},updateDTO)
}

export const getMods = (headerToken) => {
    return axios.get(Environment.baseUrl+"user/getMods",{headers: {Authorization: "Bearer "+headerToken}});
}

export const getUser = (username) => {
    return axios.get(Environment.baseUrl+"user/username/"+username);
}

export const getUserID = (userId) => {
    return axios.get(Environment.baseUrl+"user/id/"+userId);
}

export const createUser = (userRequest) => {
    return axios.get(Environment.baseUrl+"user/createUser",userRequest);
}

export const deleteWhisper = (whisperId) => {
    return axios.delete(Environment.baseUrl+"whisper/locked/delete/"+whisperId);
}

export const updateWhisper = (updateWhisper) => {
    return axios.get(Environment.baseUrl+"whisper/locked/update",updateWhisper);
}

export const getBestUserPoint = () => {
    return axios.get(Environment.baseUrl+"whisper/getBestUserPoint");
}

export const getUserWhispersCalls = (username) => {
    return axios.get<Whisper[]>(Environment.baseUrl+"whisper/getUserWhispers/"+username);
}

export const getCarouselBig = () => {
    return axios.get<Whisper[]>(Environment.baseUrl+"whisper/carousel/big");
}

export const getCarouselSmall = () => {
    return axios.get<Whisper[]>(Environment.baseUrl+"whisper/carousel/small");
}

export const controlLike = (whisperId , headerToken) => {
    return axios.get(Environment.baseUrl+"whisper/control/like/"+whisperId,{headers: {Authorization: "Bearer "+headerToken}});
}

export const likeWhisper = (whisperId , headerToken) => {
    return axios.get(Environment.baseUrl+"whisper/locked/like/"+whisperId,{headers: {Authorization: "Bearer "+headerToken}});
}


