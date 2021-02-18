import axios from "axios";

import fire from '../fire';

const url = 'http://localhost:3001/posts'
const urlLike = 'http://localhost:3001/posts/like'

const createToken = async () => {

    const user = fire.auth().currentUser;
    const token = user && (await user.getIdToken());

    const payloadHeader = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    };

    return payloadHeader;
}

export const addPost = async (content, email) => {
    const header = await createToken();
    const payload ={
        content,
        email,
        like: []
    }
    try {
        const res = await axios.post(url, payload, header);
        return res.data;
    }catch (e) {
        console.error(e);
    }
    
}

export const getPosts = async () => {
    const header = await createToken();

    try {
        const res = await axios.get(url, header)
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

export const like = async (email, post) => {
    const header = await createToken();
    var alreadyLiked = false;
    var index = 0

    post.like.map((likeEmail, likeIndex) => {
        if(likeEmail === email){
            alreadyLiked = true
            index = likeIndex
        }
    })
    
    alreadyLiked?  removeItemOnce(post.like, email) : post.like.push(email)
    const payload ={
        id: post.id,
        content: post.content,
        email: post.email,
        like: post.like
    }
    try {
        const res = await axios.put(urlLike, payload, header);
        return res.data;
    }catch (e) {
        console.error(e);
    }
}

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
