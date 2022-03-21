import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
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
import Layout from '../Layout/Layout'
import CommentInput from './CommentInput'
import PostComment from './PostComment'

function PostInfo({ post }) {
    const { user } = useSelector<AuthState>((state) => state.auth)
    console.log(post);

    const dispatch = useDispatch()



    return (

        <>
            <div className="flex border-b-2 py-2 pl-5">
                <Image
                    src={post.owner.avatar}
                    width={50}
                    height={50}
                    className="rounded-full" />
                <div className="flex flex-col space-x-2 px-3">
                    <span className="text-base text-sky-500 ">
                        <Link href={`/${post.owner.username}`} >
                            {post.owner.name}
                        </Link>
                    </span>
                    <span className="text-xs text-gray-500 ">{format(new Date(post.createdAt), 'MM/dd/yyyy')}</span>
                </div>
                {user?._id === post.owner._id ? (
                    <span
                        onClick={() => {
                            deletePost(post._id, getToken())
                            dispatch(deleteOnePost(post))
                        }}
                        className="absolute right-5 cursor-pointer text-sm text-red-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>
                ) : null}
            </div>
            <div className="mx-5 py-7 pr-2">
                <p className="h-auto text-base font-light">{post.content}</p>
            </div>
            <div className="flex justify-around border-t-2">
                <Like post={post} />
                <span className="flex items-center space-x-3 py-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span className="text-sm">
                        {post.comments.length === 1
                            ? `${post.comments.length} comment`
                            : `${post.comments.length} comments`}
                    </span>
                </span>
            </div>
        </>


    )
}

export default PostInfo
