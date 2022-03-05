import axios from "axios";
import { getToken } from "../helpers/sessions";
import { baseUrl } from "../utils/baseUrl";


export const createNewPost = async (content: string, token: string | false | undefined) => {
    try {
        const res = await axios.post(`${baseUrl}/post/new`, { content }, { headers: { authorization: token } })
        console.log(res.data);
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = async (postId: string, token: string | false | undefined) => {
    try {
        console.log(token);
        const res = await axios.delete(`${baseUrl}/post/${postId}`, { headers: { authorization: token } });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = async (postId: string, token: string | false | undefined, liked: boolean = true) => {
    try {
        const res = await axios.put(`${baseUrl}/post/like/${postId}`, null, { headers: { authorization: token } });
    } catch (error) {
        console.log(error)
    }
}


export const unLikePost = async (postId: string, token: string | false | undefined, liked: boolean = true) => {
    try {
        const res = await axios.put(`${baseUrl}/post/unlike/${postId}`, null, { headers: { authorization: token } });
    } catch (error) {
        console.log(error)
    }
}

export const getPosts = async (token: string | false) => {
    const res = await axios.get(`${baseUrl}/post`, { headers: { authorization: token } })
    return res.data
}

export const getAllLikes = async (postId: string, token: string) => {
    const res = await axios.get(`${baseUrl}/post/likes/621a9b1e0ea36c1226c01f60`)
    console.log(res.data);

}

export const createNewComment = async (content: string, token: string | false | undefined, postId: string) => {
    try {
        const res = await axios.post(`${baseUrl}/post/new/comment/${postId}`, { content }, { headers: { authorization: token } })
        console.log(res.data);
    } catch (error) {
        console.log(error)
    }
}

export const deleteOneComment = async (postId: string, token: string | false | undefined, commentId: string) => {
    try {
        const res = await axios.delete(`${baseUrl}/post/${postId}/${commentId}`, { headers: { authorization: token } })
        console.log(res.data);
    } catch (error) {
        console.log(error)
    }
}