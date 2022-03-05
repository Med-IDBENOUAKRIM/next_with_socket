import { User } from "./User"

export type Post = {
  _id?: string
  owner: string
  content: string
  photoUrl: string
  likes: [
    {
      user: User
    }
  ]
  comments: [
    {
      _id: string
      owner: string
      content: string
      date: Date
    }
  ]
}

export type NewPost = {
  owner: string
  content: string
  photoUrl: string
}

export interface IPosts {
  posts: Post[],
}

export interface IPost {
  post: Post,
}