import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import avatar from '../../img/avatar.png'

function SideChat() {
    return (
        <>
            <form className="flex w-1/5 items-center space-x-1 pl-3 pb-1.5 bg-slate-100 z-10 fixed">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    className="flex-1 form-control m-0 block w-full rounded py-2 bg-slate-100 focus:border-blue-700 focus:outline-none px-4 border-solid border-gray-500"
                    placeholder="Search..."
                />
            </form>
            <div className='mt-14 flex flex-col' >
                {
                    [1, 2, 3, 4, 5, 6].map(item => (
                        <Link href={`?message=${item}`}>
                            <a key={item} className='flex space-x-3 px-3 py-3 cursor-pointer hover:bg-slate-200 border-b-2 relative'>
                                <Image
                                    src={avatar}
                                    width={65}
                                    height={45}
                                />
                                <div>
                                    <div className='py-2 flex items-center space-x-2'>
                                        <p>username</p>
                                        <div className='w-2 h-2 rounded-full bg-green-500' />
                                    </div>
                                    <span className='font-light text-sm'>username</span>
                                </div>

                                <span
                                    className="absolute right-5 cursor-pointer text-sm text-red-700"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="right-0 h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                            </a>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}

export default SideChat