import axios from 'axios'
import Cookies from 'js-cookie'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout/Layout'
import { NoPosts } from '../components/Layout/NoData'
import CreatePost from '../components/Post/CreatePost'
import Post from '../components/Post/Post'
import { getToken } from '../helpers/sessions'
import { addMe } from '../redux/reducers/authSlice'
import { fetchPosts, PostsState } from '../redux/reducers/postsSlice'
import { baseUrl } from '../utils/baseUrl';
import { redirectUser } from '../utils/redirect'
import { IPost } from '../types/Post'
import { wrapper } from '../redux/store'
import { getPosts } from '../API/Post'

export default function Home() {
  const me = useSelector(state => state.auth);
  const posts = useSelector<PostsState>((state) => state.posts);
  console.log(me);


  const [show, setShow] = useState(false);


  if (posts.length > 1) return <NoPosts />

  return (
    <div className="">

      <Head>
        <title>Welcome, {me.user?.name.split(' ')[0]}</title>
      </Head>
      <Layout>
        <CreatePost />
        <Post />
      </Layout>
    </div>
  )
}

// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   try {
//     const token = getToken(ctx);

//     const res = await axios.get(`${baseUrl}/post`, { headers: { Authorization: token } })

//     if (!res) return {}
//     return { props: { data: res.data } }
//   } catch (error) {
//     console.log(error);
//   }


// }




export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {

  let token = getToken(ctx);
  console.log(token);
  try {
    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }


    const res = await axios.get(`${baseUrl}/auth`, { headers: { authorization: token } });
    console.log(res.data);

    const { user, userFollowStats } = res.data;

    let pageProps = { user, userFollowStats }
    store.dispatch(addMe(pageProps))

    const posts = await getPosts(token)
    store.dispatch(fetchPosts(posts))

    return {
      props: {
        pageProps
      }
    }

  } catch (error) {
    console.log(error);
  }
});