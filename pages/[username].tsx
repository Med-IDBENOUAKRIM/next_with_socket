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

function Profile({ data, error }) {
    const router = useRouter();
    const { username } = router.query;

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log(posts);

    if (error) {
        return <NoProfile />
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/profile/posts/${username}`, { headers: { Authorization: getToken() } })
                setPosts(res.data);
                console.log(res.data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    return (
        <Layout>
            <p>wqit</p>
            {/* <ProfileHeader />
            <h1 className='font-light' >Profile: {username}</h1>
            {
                posts.map(post => (
                    <div key={post._id}>
                        <Image src={post.owner.avatar} width={50} height={50} className='rounded-full' />
                        <h2>{post.owner.name} : {post.content}</h2>
                    </div>
                    // <PostComment post={post} />
                ))
            } */}
        </Layout>
    )
}


// export const getServerSideProps: GetServerSideProps = async (context) => {
//     try {
//         let token = getToken(context);
//         const { username } = context.query;

//         const res = await axios.get(`${baseUrl}/profile/${username}`, { headers: { Authorization: token } });
//         console.log(res.data);

//         return {
//             props: {
//                 data: res.data
//             }
//         }
//     } catch (error) {
//         return {
//             props: {
//                 error
//             }
//         }
//     }
// }

export default Profile