import Image from 'next/image'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AuthState } from '../../redux/reducers/authSlice'
import { format } from 'date-fns'
import { deleteOneComment } from '../../API/Post'
import { getToken } from '../../helpers/sessions'
import { deleteComment } from '../../redux/reducers/postsSlice'
import Link from 'next/link'


function PostComment({ post }) {
    const [showComment, setShowComment] = useState(false)
    const { user } = useSelector<AuthState>((state) => state.auth)
    const dispatch = useDispatch()

    return (
        <>
            {
                post.comments.map((item, index) => (
                    <div key={index} className="w-100 bg-slate-200 mx-1 rounded pt-3 px-6 relative">
                        <div className="flex items-center space-x-3 px-3 pb-0 ">
                            <Image
                                src={post.user ? user.avatar : post.owner.avatar}
                                width={35}
                                height={35}
                                className="rounded-full"
                            />
                            <span className="text-base text-sky-500 ">

                                <Link href={`/${item.owner.username}`}  >

                                    {item.owner.name}

                                </Link>

                            </span>
                            <span className="text-sm font-light text-gray-500 ">
                                {format(new Date(item.date), 'MM/dd/yyyy')}</span>


                            {user._id === item.owner._id ? (
                                <span
                                    onClick={() => {
                                        deleteOneComment(post._id, getToken(), item._id);
                                        dispatch(deleteComment({ postId: post._id, commentId: item._id }))
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
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </span>
                            ) : null}



                        </div>
                        <p className="h-auto w-fit pl-16 pb-1 mb-1 text-base font-light">
                            {item.content}
                        </p>
                    </div>
                ))
            }
        </>
    )
}

export default PostComment