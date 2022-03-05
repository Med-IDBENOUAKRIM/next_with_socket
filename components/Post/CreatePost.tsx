import Image from 'next/image'
import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewPost, getPosts } from '../../API/Post'
// import { createNewPost } from '../../API/Post';
import { getToken } from '../../helpers/sessions'
import { AuthState } from '../../redux/reducers/authSlice'
import { fetchPosts } from '../../redux/reducers/postsSlice'

function CreatePost() {
    const { user } = useSelector<AuthState>((state) => state.auth)
    const dispatch = useDispatch()
    const token = getToken()

    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);

    const handleChange = e => {
        const { name, value, files } = e.target;

        if (name === 'media') {
            setMedia(files[0]);
            setMediaPreview(URL.createObjectURL(files[0]))
        }

        setContent(value);
    }

    const handlePost = async (e) => {
        e.preventDefault()
        setLoading(true)
        await createNewPost(content, token)
        let posts = await getPosts(token)
        dispatch(fetchPosts(posts))
        setContent('')
        setLoading(false)
    }

    return (
        <div className="relative h-1/6 border-b-2">
            <div className="mb-5 flex">
                <div className="mr-2">
                    {user ? (
                        <Image
                            src={user.avatar}
                            width={75}
                            height={75}
                            className="rounded-full"
                        />
                    ) : null}
                </div>
                <textarea
                    name='content'
                    onChange={handleChange}
                    className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base
                font-normal
                text-gray-700
                transition
                ease-in-out
                focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none
                "
                    id="exampleFormControlTextarea1"
                    rows={3}
                    value={content}
                    placeholder="Tape something...."
                ></textarea>
            </div>
            <button
                onClick={handlePost}
                className="absolute right-3 rounded-full bg-blue-500 py-1 px-5 text-base text-white hover:bg-blue-700"
                disabled={content === '' || loading}
            >
                {
                    loading ? (
                        <div className="flex justify-center items-center">
                            <div className="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full" role="status">
                            </div>
                        </div>
                    ) : "post"
                }

            </button>
            <label className="absolute left-20 cursor-pointer">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        color="grey"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
                <input type="file" name="img" id="img" hidden />
            </label>
        </div>
    )
}

export default CreatePost
