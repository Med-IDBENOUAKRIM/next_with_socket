import axios from 'axios';
import React from 'react'
import { getPosts } from '../../API/Post';
import Layout from '../../components/Layout/Layout';
import CommentInput from '../../components/Post/CommentInput';
import Post from '../../components/Post/Post'
import PostComment from '../../components/Post/PostComment';
import PostInfo from '../../components/Post/PostInfo';
import { getToken } from '../../helpers/sessions';
import { addMe } from '../../redux/reducers/authSlice';
import { fetchPosts } from '../../redux/reducers/postsSlice';
import { wrapper } from '../../redux/store';
import { baseUrl } from '../../utils/baseUrl';

function PostPage({ post }) {
    console.log(post);

    return (
        <Layout>
            <div className="relative mt-5 rounded-md border">

                <PostInfo post={post} />
                <CommentInput post={post} />
                <PostComment post={post} />
            </div>
        </Layout>
    )
}


export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {

    let token = getToken(ctx);
    const { postId } = ctx.query;


    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const res = await axios.get(`${baseUrl}/post/${postId}`, { headers: { Authorization: token } });
    const me = await axios.get(`${baseUrl}/auth`, { headers: { Authorization: token } });

    const { user, userFollowStats } = me.data;

    let pageProps = { user, userFollowStats }
    store.dispatch(addMe(pageProps))

    const posts = await getPosts(token)
    store.dispatch(fetchPosts(posts))

    return {
        props: {
            post: res.data
        }
    };
});

export default PostPage