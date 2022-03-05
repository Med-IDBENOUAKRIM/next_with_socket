import axios from 'axios'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../components/Layout/Layout'
import { NoNotifications } from '../components/Layout/NoData'
import CommentNotifications from '../components/Notifications/CommentNotifications'
import FollowerNotifications from '../components/Notifications/FollowerNotifications'
import LikeNotifications from '../components/Notifications/LikeNotifications'
import { getToken } from '../helpers/sessions'
import { addMe, AuthState } from '../redux/reducers/authSlice'
import { wrapper } from '../redux/store'
import { baseUrl } from '../utils/baseUrl'
import { redirectUser } from '../utils/redirect'

export default function Notifications({ notifications, error }) {
    const { user, userFollowStats } = useSelector<AuthState>(
        (state) => state.auth
    )

    useEffect(() => {
        const notificationToRead = async () => {
            try {
                await axios.put(`${baseUrl}/notifications`, null, {
                    headers: { Authorization: getToken() },
                })
            } catch (error) {
                console.log(error)
                console.log('user')
            }
        }
        notificationToRead()
    }, [])

    console.log(notifications)
    // console.log(userFollowStats);

    return (
        <Layout>
            <h1 className="m-5 text-center font-normal">Notifications : </h1>
            <div className="h-5/6 overflow-scroll overflow-x-hidden border p-3 shadow-2xl scrollbar-hide">
                {notifications.length > 0 ? (
                    notifications.map((notification, i) => (
                        <div key={i} >
                            {notification.type === 'newLike' &&
                                notification.post !== null && (
                                    <LikeNotifications notification={notification} />
                                )}
                            {notification.type === 'newComment' &&
                                notification.post !== null && (
                                    <CommentNotifications
                                        user={user}
                                        notification={notification}
                                    />
                                )}
                            {notification.type === 'newFollower' &&
                                notification.post !== null && (
                                    <FollowerNotifications notification={notification} />
                                )}
                        </div>
                    ))
                ) : (
                    <NoNotifications />
                )}
            </div>
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
    try {
        let token = getToken(ctx)
        if (!token) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            }
        } else {
            const res = await axios.get(`${baseUrl}/notifications`, {
                headers: { Authorization: token },
            })

            const me = await axios.get(`${baseUrl}/auth`, {
                headers: { Authorization: token },
            })

            const { user, userFollowStats } = me.data

            let pageProps = { user, userFollowStats }
            store.dispatch(addMe(pageProps))

            return {
                props: {
                    notifications: res.data,
                },
            }
        }
    } catch (error) {
        return { error: true }
    }
}
)
