import React from 'react'

function ProfileHeader() {
    return (
        <>
            <ul className="nav nav-tabs mb-4 flex list-none flex-col flex-wrap border-b-0 pl-0 md:flex-row">
                <li className="nav-item">
                    <a
                        href="#tabs-home"
                        className="
      nav-link
      active
      my-2
      block
      border-x-0
      border-t-0
      border-b-2 border-transparent px-6 py-3
      text-xs
      font-medium
      uppercase
      leading-tight hover:border-transparent
      hover:bg-gray-100
      focus:border-transparent
    "
                    >
                        Home
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        href="#tabs-profile"
                        className="
      nav-link
      my-2
      block
      border-x-0
      border-t-0
      border-b-2
      border-transparent px-6 py-3 text-xs
      font-medium
      uppercase
      leading-tight
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    "
                    >
                        Profile
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        href="#tabs-messages"
                        className="
      nav-link
      my-2
      block
      border-x-0
      border-t-0
      border-b-2
      border-transparent px-6 py-3 text-xs
      font-medium
      uppercase
      leading-tight
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    "
                    >
                        Messages
                    </a>
                </li>

            </ul>

        </>
    )
}

export default ProfileHeader
