import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../helpers/sessions'
import { AuthState } from '../../redux/reducers/authSlice';
import { v4 as uuid } from 'uuid';
import { showComments } from '../../redux/reducers/postsSlice';
import { createNewComment } from '../../API/Post';

function CommentInput({ post }) {

    const { user } = useSelector<AuthState>((state) => state.auth)

    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    const token = getToken()

    return (
        <form className="flex items-center" onSubmit={async e => {
            e.preventDefault()
            createNewComment(content, getToken(), post._id);
            dispatch(showComments({ postId: post._id, content, user: user, id: uuid(), date: Date.now() }))
            setContent('')
        }} >
            <input
                type="text"
                className="form-control block w-full py-3 px-5 mb-1 border-t-2 rounded-sm text-base font-light focus:border-blue-600"
                name="comment"
                id="comment"
                placeholder="write a comment..."
                value={content}
                onChange={e => setContent(e.target.value)}
            />
        </form>
    )
}

export default CommentInput