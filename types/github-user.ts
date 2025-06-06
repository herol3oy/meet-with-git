import { Repository } from './repository'
import { TotalCount } from './total-count'

export interface GithubUser {
  id: string
  login: string
  name: string
  avatarUrl: string
  url: string
  websiteUrl: string | null
  bio: string | null
  company: string | null
  location: string | null
  isHireable: boolean
  createdAt: string
  updatedAt: string
  followers: TotalCount
  following: TotalCount
  repositories: {
    nodes: Repository[]
  }
}
