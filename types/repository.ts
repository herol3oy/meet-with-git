import { PrimaryLanguage } from './primary-language'

export interface Repository {
  id: string
  name: string
  description: string | null
  stargazerCount: number
  primaryLanguage: PrimaryLanguage | null
}
