import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { baseUrl } from '../utils/baseUrl';

function Search({ results, text }: any) {
    const data = useSelector((state) => state.auth)

    return (
        <div className={`${!text && results.length !== 0 ? 'border-2 h-auto rounded-xl mt-1' : ''}`}>
            {
                !text && results.length > 0 && results.map(res => (
                    <Fragment key={res._id} >
                        <Link href={`/${res.username}`}>
                            <a className="flex items-center space-x-6 py-2 px-3 hover:bg-gray-100" >

                                <Image
                                    src={res.avatar}
                                    alt={`${res.username}`}
                                    className="rounded-full"
                                    objectFit='cover'
                                    width={50}
                                    height={50}
                                />
                                <span>
                                    {res?.name}
                                </span>
                            </a>
                        </Link>
                        <hr />
                    </Fragment>
                ))
            }
        </div>
    )
}

export default Search