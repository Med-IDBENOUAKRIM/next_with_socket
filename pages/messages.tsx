import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import io from 'socket.io-client'
import { baseUrl } from '../utils/baseUrl'
import { useSelector } from 'react-redux'
import { GetServerSideProps } from 'next'
import { getToken } from '../helpers/sessions'
import axios from 'axios'
import ChatInput from '../components/Chat/ChatInput'
import Home from '../Icons/Home'
import avatar from '../img/avatar.png'
import SideChat from '../components/Chat/SideChat'
import { useRouter } from 'next/router'
import { addMe, AuthState } from '../redux/reducers/authSlice'
import { wrapper } from '../redux/store'
import { newMsgNoti, scrollToNewMsg } from '../utils/Sound'

export default function Messages({ data }) {
    const { user } = useSelector<AuthState>((state) => state.auth)
    const router = useRouter()
    const socket = useRef()
    const [connectedUsers, setConnectedUsers] = useState([])
    const [chats, setChats] = useState(data)
    const [messages, setMessages] = useState([])
    const [name, setName] = useState('')
    const open_chat_id = useRef('');

    const divRef = useRef();


    console.log(chats)


    useEffect(() => {
        if (!socket.current) {
            socket.current = io('http://localhost:8500')
        }

        if (socket.current) {
            socket.current.emit('be_online', { user_id: user._id })

            socket.current.on('connect_users', ({ users }) => {
                users.length > 0 && setConnectedUsers(users)
            })
        }
    }, [])

    useEffect(() => {
        const getMessages = () => {
            socket.current.emit('$loading_messages$', {
                user_id: user._id,
                messageWith: router.query.message,
            })

            socket.current.on('$messages_loaded$', ({ chat }) => {
                setMessages(chat.messages)
                open_chat_id.current = chat.messageWith._id;

                divRef.current && scrollToNewMsg(divRef);
            })
        }

        if (chats) {
            const target = chats.find(item => item.messageWith === router.query.message);
            setName(target?.name)
        }

        if (socket.current && router.query.message) {
            getMessages()
        }
    }, [router.query.message])

    useEffect(() => {
        if (socket.current) {
            socket.current.on('%_new_msg_sent%', (new_msg) => {
                // let { new_msg } = new_msg;
                if (new_msg.receiver === open_chat_id.current) {
                    setMessages(last => [...last, new_msg]);
                }
            })

            socket.current.on('$new_messages_received$', (new_msg) => {




                if (new_msg.sender === open_chat_id.current) {
                    setMessages(last => [...last, new_msg]);
                }

                let sender = chats.find(chat => chat.messageWith === new_msg.sender);

                newMsgNoti(sender.name);
            })
        }
    }, [])

    useEffect(() => {
        messages.length > 0 && scrollToNewMsg(divRef);
    }, [messages])

    const hanldeSendNewMsg = (text: string) => {
        if (socket.current) {
            socket.current.emit('$sending_new_messages$', {
                user_id: user._id,
                receiver_id: open_chat_id.current,
                text,
            })
        }
    }

    return (
        <div
            style={{ height: '43.78rem' }}
            className="container relative mx-auto mt-20 flex border-2 "
        >
            <Link href="/">
                <a className="bg fixed top-5 flex rounded-lg bg-slate-500 p-2 text-white">
                    <Home />
                    BACK HOME
                </a>
            </Link>
            <div className="flex-[0.25] overflow-scroll overflow-x-hidden border-r-2 scrollbar-hide">
                <SideChat chats={chats} connectedUsers={connectedUsers} />
            </div>
            <div className="relative flex-[0.75] bg-slate-100">
                {
                    name && (
                        <div className="flex items-center space-x-3 bg-slate-300 py-2  px-4">
                            <Image src={avatar} width={50} height={50} />
                            <div className="py-0">
                                <p>{name}</p>
                                <span className="text-sm font-light">username</span>
                            </div>
                        </div>
                    )
                }
                <div
                    style={{ height: '36rem' }}
                    className="w-ful relative overflow-scroll overflow-x-hidden scrollbar-hide"
                >
                    {messages.map((message) => (
                        <div key={message} ref={divRef}  >
                            {user._id === message?.sender && (
                                <div className="py-3 mb-8">
                                    <p className="pb-3 mr-1 absolute right-1  w-fit rounded-l-xl bg-gray-600 px-5 py-2 text-white">
                                        {message?.msg}
                                    </p>
                                </div>
                            )}
                            {user._id === message?.receiver && (
                                <div className="py-3 mb-0">
                                    <p className="py-2 ml-1 w-fit rounded-r-xl bg-sky-400 px-5">
                                        {message?.msg}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {name && <ChatInput hanldeSendNewMsg={hanldeSendNewMsg} />}
            </div>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (ctx) => {
        let token = getToken(ctx)
        console.log(token)
        try {
            if (!token) {
                return {
                    redirect: {
                        destination: '/login',
                        permanent: false,
                    },
                }
            }

            const res = await axios.get(`${baseUrl}/auth`, {
                headers: { authorization: token },
            })

            const { user, userFollowStats } = res.data

            let pageProps = { user, userFollowStats }
            store.dispatch(addMe(pageProps))

            const chat = await axios.get(`${baseUrl}/chats`, {
                headers: { authorization: token },
            })

            return {
                props: {
                    data: chat.data,
                },
            }
        } catch (error) {
            console.log(error)
        }
    }
)
