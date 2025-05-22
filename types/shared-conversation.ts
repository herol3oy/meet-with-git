import { GithubUser } from './github-user'
import { Location } from './location'

export interface SharedConversation {
  id: string
  users: GithubUser[]
  location: Location
  conversation: string
  created_at: string
}
