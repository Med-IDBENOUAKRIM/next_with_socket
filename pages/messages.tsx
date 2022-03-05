import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import io from "socket.io-client";
import { baseUrl } from '../utils/baseUrl';
import { useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';
import { getToken } from '../helpers/sessions';
import axios from 'axios';
import ChatInput from '../components/Chat/ChatInput';
import Home from '../Icons/Home';
import avatar from '../img/avatar.png'
import SideChat from '../components/Chat/SideChat';
import { useRouter } from 'next/router';
import { AuthState } from '../redux/reducers/authSlice';

function Messages() {
    const { user } = useSelector<AuthState>(state => state.auth)
    const router = useRouter()
    const socket = useRef();
    const [connectedUsers, setConnectedUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const open_chat_id = useRef("");

    useEffect(() => {
        if (!socket.current) {
            socket.current = io("http://localhost:8500")
        }

        if (socket.current) {
            socket.current.emit('be_online', { user_id: user._id });

            socket.current.on('connect_users', ({ users }) => {
                users.length > 0 && setConnectedUsers(users);
            })
        }

    }, [])


    useEffect(() => {

        const getMessages = () => {
            socket.current.emit('$loading_messages$', ({ user_id: user._id, messageWith: router.query.message }));

            socket.current.on('$messages_loaded$', ({ chat }) => {
                console.log(chat === null && 'walo mzl');

            })
        }
        if (socket.current) {
            getMessages()
        }

    }, [router.query.message])


    useEffect(() => {
        if (socket.current) {
            socket.current.on('%_new_msg_sent%', ({ new_msg }) => {
                if (new_msg.receiver === open_chat_id.current) {
                    setMessages(new_msg)
                }

            })
        }
    }, [])

    const hanldeSendNewMsg = (text) => {
        if (socket.current) {
            socket.current.emit('$sending_new_messages$', ({ user_id: user._id, receiver_id: open_chat_id.current, text }))
        }
    }

    return (
        <div style={{ height: "43.78rem" }} className="flex mt-20 border-2 relative container mx-auto  ">
            <Link href='/'>
                <a className='flex bg-slate-500 p-2 rounded-lg text-white fixed top-5 bg' >
                    <Home />
                    BACK HOME
                </a>
            </Link>
            <div className="flex-[0.25] border-r-2 overflow-scroll overflow-x-hidden scrollbar-hide">
                <SideChat />
            </div>
            <div className='flex-[0.75] bg-slate-100 relative' >
                <div className='flex items-center space-x-3 py-2 px-4  bg-slate-300' >
                    <Image
                        src={avatar}
                        width={50}
                        height={50}
                    />
                    <div className='py-0'>
                        <p>username</p>
                        <span className='font-light text-sm'>username</span>
                    </div>
                </div>
                <div style={{ height: "36rem" }} className='overflow-scroll overflow-x-hidden scrollbar-hide w-ful relative'>
                    {
                        messages.map(message => (
                            <div key={message}>
                                {/* <div style={{ height: "36rem" }} className='overflow-scroll overflow-x-hidden scrollbar-hide'> */}
                                {
                                    user._id === message.owner ? (
                                        <p className='px-5 py-1 my-3 text-white bg-gray-600 w-fit rounded-l-xl mr-1 mt-14 absolute right-1' >{message.msg}</p>
                                    ) : (
                                        <>
                                            <div className='py-0.5' />
                                            <p className='px-5 py-1 my-3 bg-sky-400 w-fit rounded-r-xl ml-1' >{message}</p>
                                        </>

                                    )
                                }
                                {/* </div> */}
                            </div>
                        ))
                    }
                </div>
                <ChatInput hanldeSendNewMsg={hanldeSendNewMsg} />
            </div>
        </div>
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

export default Messages
