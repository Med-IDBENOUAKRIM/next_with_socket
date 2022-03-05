import Cookies from 'js-cookie'
import { GetServerSidePropsContext } from 'next'

export const getToken = (ctx?: GetServerSidePropsContext) => {
  let token

  if (ctx && ctx.req) {
    token = ctx?.req?.headers?.cookie
    token = token?.split('=')[1]
  } else {
    token = typeof window !== 'undefined' && Cookies.get('token')
  }

  if (!token) {
    return false;
  }

  return token
}
