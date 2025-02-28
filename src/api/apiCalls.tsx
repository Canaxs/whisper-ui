import axios from 'axios';
import { Environment } from '../environments/environments';
import TokenDTO from '@/models/TokenDTO';
import { Artifika } from 'next/font/google';
import { Whisper } from '@/components/Account-Info/AccountInfo';


// Auth Api

export const generateToken = authModel => {
    return axios.post(Environment.baseUrl+"auth/generateToken" ,authModel);
};

export const isExpiredToken = (expireRequest) => {
    return axios.post<Boolean>(Environment.baseUrl+"auth/isExpiredToken",expireRequest);
}

// Whisper Api

export const createWhisper = (formData, headerToken) => {
    return axios.post(Environment.baseUrl+"whisper/locked/create",formData,{
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

// User Api

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
    return axios.post(Environment.baseUrl+"user/createUser",userRequest);
}

// Whisper Api

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

// Whisper Like Api

export const controlLike = (whisperId , headerToken) => {
    return axios.get(Environment.baseUrl+"whisper/control/like/"+whisperId,{headers: {Authorization: "Bearer "+headerToken}});
}

export const likeWhisper = (whisperId , headerToken) => {
    return axios.get(Environment.baseUrl+"whisper/locked/like/"+whisperId,{headers: {Authorization: "Bearer "+headerToken}});
}

export const controlDisLike = (whisperId , headerToken) => {
    return axios.get(Environment.baseUrl+"whisper/control/dislike/"+whisperId,{headers: {Authorization: "Bearer "+headerToken}});
}

export const dislikeWhisper = (whisperId , headerToken) => {
    return axios.get(Environment.baseUrl+"whisper/locked/dislike/"+whisperId,{headers: {Authorization: "Bearer "+headerToken}});
}

export const unLikeWhisper = (whisperId , headerToken) => {
    return axios.get(Environment.baseUrl+"whisper/locked/unlike/"+whisperId,{headers: {Authorization: "Bearer "+headerToken}});
}

export const unDislikeWhisper = (whisperId , headerToken) => {
    return axios.get(Environment.baseUrl+"whisper/locked/undislike/"+whisperId,{headers: {Authorization: "Bearer "+headerToken}});
}

// Whisper 3 Api

export const updateIsActive = (whisperId , headerToken) => {
    return axios.get(Environment.baseUrl+"whisper/updateActive/"+whisperId,{headers: {Authorization: "Bearer "+headerToken}});
}

export const updateIsDelete = (whisperId , headerToken) => {
    return axios.get(Environment.baseUrl+"whisper/updateDelete/"+whisperId,{headers: {Authorization: "Bearer "+headerToken}});
}

export const createComment = (whisperComment , headerToken) => {
    return axios.post(Environment.baseUrl+"whisper/locked/comment/create",whisperComment,{headers: {Authorization: "Bearer "+headerToken}})
}

export const getWhispersFilter = (whisperFilter , page) => {
    return axios.post(Environment.baseUrl+"whisper/getWhispersFilter",whisperFilter,{params: {page , size: 10}})
}

// Dispute Api

export const getDispute = (disputeId) => {
    return axios.get(Environment.baseUrl+"dispute/getDispute/"+disputeId);
}

export const createDispute = (createDisputeRequest, headerToken) => {
    return axios.post(Environment.baseUrl+"dispute/create",createDisputeRequest,{headers: {Authorization: "Bearer "+headerToken}});
}

export const getAllDispute = (page) => {
    return axios.post(Environment.baseUrl+"dispute/getAll",{params: {page , size: 10}});
} 

export const createDisputeComment = (disputeCommentDTO ,headerToken) => {
    return axios.post(Environment.baseUrl+"dispute/createComment",disputeCommentDTO,{headers: {Authorization: "Bearer "+headerToken}})
}

// dispute Like

export const controlLikeDispute = (disputeId , headerToken) => {
    return axios.get(Environment.baseUrl+"dispute/control/like/"+disputeId,{headers: {Authorization: "Bearer "+headerToken}});
}

export const likeDispute = (disputeId , headerToken) => {
    return axios.get(Environment.baseUrl+"dispute/like/"+disputeId,{headers: {Authorization: "Bearer "+headerToken}});
}

export const controlDisLikeDispute = (disputeId , headerToken) => {
    return axios.get(Environment.baseUrl+"dispute/control/dislike/"+disputeId,{headers: {Authorization: "Bearer "+headerToken}});
}

export const dislikeDispute = (disputeId , headerToken) => {
    return axios.get(Environment.baseUrl+"dispute/dislike/"+disputeId,{headers: {Authorization: "Bearer "+headerToken}});
}

export const unLikeDispute = (disputeId , headerToken) => {
    return axios.get(Environment.baseUrl+"dispute/unlike/"+disputeId,{headers: {Authorization: "Bearer "+headerToken}});
}

export const unDislikeDispute = (disputeId , headerToken) => {
    return axios.get(Environment.baseUrl+"dispute/undislike/"+disputeId,{headers: {Authorization: "Bearer "+headerToken}});
}

// Dispute Tag

export const getMostUsedTags = () => {
    return axios.get(Environment.baseUrl+"dispute/getMostUsedTags");
}

export const getDisputeTag = (disputeTag) => {
    return axios.get(Environment.baseUrl+"dispute/getDisputeTag/"+disputeTag);
}

//UserPlan

export const updatePlan = (updatePlanReq,headerToken) => {
    return axios.post(Environment.baseUrl+"user/updatePlan",updatePlanReq,{headers: {Authorization: "Bearer "+headerToken}});
}

// Subscribe

export const getSubscribe = (headerToken) => {
    return axios.get(Environment.baseUrl+"user/getSubscribe",{headers: {Authorization: "Bearer "+headerToken}});
}

export const writeLimitDrop = (headerToken) => {
    return axios.get(Environment.baseUrl+"user/writeLimitDrop",{headers: {Authorization: "Bearer "+headerToken}});
}

//Badges

export const createBadge = (badgeData,headerToken) => {
    return axios.post(Environment.baseUrl+"user/createBadge",badgeData,{headers: {Authorization: "Bearer "+headerToken}});
}

export const addBadge = (userBadgeAddRequest,headerToken) => {
    return axios.post(Environment.baseUrl+"user/addBadge",userBadgeAddRequest,{headers: {Authorization: "Bearer "+headerToken}});
}

export const deleteBadge = (userBadgeAddRequest,headerToken) => {
    return axios.post(Environment.baseUrl+"user/deleteBadge",userBadgeAddRequest,{headers: {Authorization: "Bearer "+headerToken}});
}

export const allBadges = (headerToken) => {
    return axios.get(Environment.baseUrl+"user/allBadges",{headers: {Authorization: "Bearer "+headerToken}});
}

export const getUserBadges = (username) => {
    return axios.get(Environment.baseUrl+"user/getUserBadges/"+username);
}

//Notification 

export const getUserNotifications = (headerToken) => {
    return axios.get(Environment.baseUrl+"notify/getUserNotifications",{headers: {Authorization: "Bearer "+headerToken}});
}

export const readUpdate = (notificationId,headerToken) => {
    return axios.get(Environment.baseUrl+"notify/readUpdate/"+notificationId,{headers: {Authorization: "Bearer "+headerToken}});
}

export const activeUpdate = (notificationId,headerToken) => {
    return axios.get(Environment.baseUrl+"notify/activeUpdate/"+notificationId,{headers: {Authorization: "Bearer "+headerToken}});
}

