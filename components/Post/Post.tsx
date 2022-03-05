import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, getAllLikes, likePost, unLikePost } from '../../API/Post'
import { getToken } from '../../helpers/sessions'
import { AuthState } from '../../redux/reducers/authSlice'
import {
    deleteOnePost,
    PostsState,
    likeOnePost,
} from '../../redux/reducers/postsSlice'
import { Post } from '../../types/Post'
import Like from '../Common/Like'
import CommentInput from './CommentInput'
import PostComment from './PostComment'
import PostInfo from './PostInfo'

function Post() {
    let { posts } = useSelector<PostsState>((state) => state.posts)
    return (
        <>
            {posts.map((post: any) => (
                <div key={post._id} className="relative mt-5 rounded-md border">
                    <PostInfo post={post} />
                    <CommentInput post={post} />
                    <PostComment post={post} />
                </div>
            ))
            }
        </>
    )
}

export default Post
