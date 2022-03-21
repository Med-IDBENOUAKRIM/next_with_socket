import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import axios from 'axios';
import { baseUrl } from '../utils/baseUrl';
import { getToken } from '../helpers/sessions';
import { NoProfile } from '../components/Layout/NoData';
import Layout from '../components/Layout/Layout';
import PostComment from '../components/Post/PostComment';
import ProfileHeader from '../components/Profile/ProfileHeader';
import Image from 'next/image';
import Post from '../components/Post/Post';
import { wrapper } from '../redux/store';
import { fetchPost } from '../redux/reducers/postSlice';
import { useSelector } from 'react-redux';
import { fetchMyPosts } from '../redux/reducers/postsSlice';
import { addMe } from '../redux/reducers/authSlice';
import CircularProgress from '../components/Common/CircularProgress';

function Profile({ data, error }) {
    const router = useRouter();
    const { username } = router.query;

    const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    if (error) {
        return <NoProfile />
    }

    if (loading) {
        return <CircularProgress />
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/profile/posts/${username}`, { headers: { Authorization: getToken() } })
                setMyPosts(res.data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [username])

    return (
        <Layout>
            <div className='rounded-xl p-5 flex space-x-5 border-2 shadow-md' >
                <Image
                    src={data.profile.owner.avatar}
                    width={125}
                    height={125}
                    className='rounded'
                />
                <div className='flex-col' >
                    <p>{data.profile.owner.name}</p>
                    <div className='flex items-center'>
                        <p className='font-mono font-light m-5'> followers:  {data.followersLength}</p>
                        <span className='font-mono font-light m-5'>|</span>
                        <p className='font-mono font-light m-5'> following: {data.followingLength}</p>
                    </div>
                </div>
            </div>
            <Post posts={myPosts} />
        </Layout>
    )
}



export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    let token = getToken(context);
    try {

        const { username } = context.query;

        const res = await axios.get(`${baseUrl}/profile/${username}`, { headers: { Authorization: token } });

        const me = await axios.get(`${baseUrl}/auth`, { headers: { authorization: token } });

        const { user, userFollowStats } = me.data;

        let pageProps = { user, userFollowStats }
        store.dispatch(addMe(pageProps))

        return {
            props: {
                data: res.data
            }
        }
    } catch (error) {
        return {
            props: {
                error
            }
        }
    }
});

export default Profile