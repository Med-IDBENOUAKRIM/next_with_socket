import axios from 'axios'
import { baseUrl } from '../utils/baseUrl'
import cookies from 'js-cookie'
import router from 'next/router'

interface RegisterUser {
  name: String
  username: String
  email: String
  password: String
}

interface LoginUser {
  email: String
  password: String
}

export const signUp = async (
  { name, username, email, password }: RegisterUser,
  setLoading: Function,
  setErrorMsg: Function
) => {
  try {
    const res = await axios.post(`${baseUrl}/auth/signup`, {
      name,
      username,
      email,
      password,
    });
    router.push('/login')
  } catch (error) {
    console.log(error)
    setErrorMsg(true)
  }
  setLoading(false)
}

export const login = async ({ email, password }: LoginUser, setLoading: Function) => {
  setLoading(true)

  try {
    const res = await axios.post(`${baseUrl}/auth/signin`, { email, password })
    cookies.set('token', res.data.token)
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}
