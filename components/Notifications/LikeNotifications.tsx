import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function LikeNotifications({ notification }: any) {
    return (


        <div className="flex items-center my-2 space-x-4 px-3 py-3 bg-gray-100 rounded-lg">
            <Image
                objectFit='cover'
                className='rounded-full'
                src={notification.from_user.avatar}
                width={55}
                height={55}
            />
            <div className='flex items-center space-x-5' >
                <Link href={`/${notification.from_user.username}`} >
                    <a>
                        <h3 className='font-light text-blue-900' >{notification.from_user.username}</h3>
                    </a>
                </Link>
                <div className="flex items-center space-x-2 font-light">
                    liked your
                    <Link href={`/post/${notification.post._id}`} >
                        <a className='flex font-light space-x-5' >
                            <h3 className='font-light pl-5 text-blue-800' >post</h3>
                        </a>
                    </Link>
                    <div className='px-1'>
                        <span className='px-2' >on</span>
                        {
                            format(new Date(notification.date), "dd/MM/yyyy")
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LikeNotifications