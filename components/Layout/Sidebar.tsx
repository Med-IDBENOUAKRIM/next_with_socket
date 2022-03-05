// import Image from 'next/image';
import axios from 'axios'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { List, Icon } from 'semantic-ui-react'
import { AuthState } from '../../redux/reducers/authSlice'
import { baseUrl } from '../../utils/baseUrl'
import Post from '../Post/Post'
import Search from '../Search'

function Sidebar() {
  const { user } = useSelector<AuthState>((state) => state.auth)

  console.log(user);


  const [results, setResults] = useState([]);
  const [text, setText] = useState(true);

  const handleChange = async (e: any) => {
    e.preventDefault();
    if (e.target.value === '' || e.target.value.trim().length === 0) {
      setText(true);
      return;
    } else {
      setText(false);
      const res = await axios.get(`${baseUrl}/search/${e.target.value}`)
      setResults(res.data)
    }

  }

  const lougOut = () => {
    Cookies.remove('token');
    Router.push('/login');
  }

  return (
    <div className="relative min-h-screen md:flex">
      <div className=" bg-gray-800 text-gray-100 md:hidden test">
        {/*  */}
        {/* {
          user.username.length > 0 ? (
            <div className="flex items-center space-x-2 px-4 text-white">
              <span>Hi,</span>
              <h2 className="ml-2 text-xl">{user.username} </h2>
            </div>
          ) : null
        } */}

        <div className="p-5 md:block">
          <div className='flex border-2 px-5 py-2 rounded-3xl' >
            <input className='outline-none text-black ' type="text" placeholder='Search...' onChange={handleChange} />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <Search text={text} results={results} />
        </div>
        {/* <div className="p-5 md:block">
          <div className='flex items-center justify-between bg-gray-600 px-5 rounded-xl' >
            <input className='outline-none' type="text" placeholder='Search...' onChange={handleChange} />
            <Search text={text} results={results} />



            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div> */}
        {/*  */}
        <button className="mobile-menu-button p-4 focus:bg-gray-700 focus:outline-none">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div className="h-screen sidebar -translate-x-full bg-gray-600 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform  md:relative md:translate-x-0 transition duration-200 ease-in-out">
        {
          user?.username !== '' ? (
            <div className="px-10 text-white">
              <span>Hi, Good Evening</span>
              <h2 className="ml-2 text-xl">{user?.username} </h2>
            </div>
          ) : null
        }
        <nav>
          <Link href="/">
            <a className="flex rounded py-2.5 px-4 text-xl transition duration-200 hover:bg-gray-700 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-7 h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </a>
          </Link>

          <Link href={`/${user?.username}`}>
            <a className="flex rounded py-2.5 px-3 text-xl transition duration-200 hover:bg-gray-700 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-0.5 h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p className='ml-8' >Profile</p>
            </a>
          </Link>

          <Link href="/messages">
            <a className="flex rounded py-2.5 px-4 text-xl transition duration-200 hover:bg-gray-700 hover:text-white">
              <div className="mr-7 flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="static h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                {/* {readMsg && <div className="h-2 w-2 rounded-full bg-red-600" />} */}
              </div>
              Messages
            </a>
          </Link>
          <Link href="/notifications">
            <a className="flex rounded py-2.5 px-4 text-xl transition duration-200 hover:bg-gray-700 hover:text-white">
              <div className="mr-7 flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {user?.unreadNotification && <div className="h-2 w-2 rounded-full bg-red-600" />}
              </div>
              Notifications
            </a>
          </Link>
          {/* <Link href={`/${me.user.username}`}>
            <a className="flex rounded py-2.5 px-4 text-xl transition duration-200 hover:bg-gray-700 hover:text-white">
              <div className="mr-6 flex">
                <Image
                  className="rounded-full"
                  src="https://pbs.twimg.com/profile_images/1176237957851881472/CHOXLj9b_200x200.jpg"
                  width={30}
                  height={25}
                />
              </div>
              My Profile
            </a>
          </Link> */}

          <div onClick={() => lougOut()} className="flex cursor-pointer rounded py-2.5 px-4 text-xl transition duration-200 hover:bg-gray-700 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 mr-6 h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <h3>LogOut</h3>
          </div>
        </nav>
      </div>

      {/* <!-- content --> */}


    </div>
  )
}

export default Sidebar
