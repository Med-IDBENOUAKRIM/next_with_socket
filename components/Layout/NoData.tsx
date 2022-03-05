import Link from "next/link"

export function NoPosts() {
    return (
        <div className='flex items-center flex-col text-center justify-center h-screen font-mono' >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 m-5" color="red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            No posts yet, make sure you have follow someone or create your own post.
            <div className="bg-green-500 p-3 rounded m-3" >
                <Link href='/' >
                    <a>Back to Home</a>
                </Link>
            </div>
        </div>
    )
}


export function NoProfile() {
    return (
        <div className='flex items-center flex-col text-center justify-center h-screen font-mono' >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 m-5" color="red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Ops! this profile doesn't exist.
            <div className="bg-green-500 p-3 rounded m-3" >
                <Link href='/' >
                    <a>Back to Home</a>
                </Link>
            </div>
        </div>
    )
}

export function NoNotifications() {
    return (
        <div className='flex items-center flex-col text-center justify-center h-4/5 font-mono' >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 m-5" color="red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            You have not yet notifications.

        </div>
    )
}
