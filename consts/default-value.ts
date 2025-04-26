import { GithubUser } from '@/types/github-user'

export const defaultValue: GithubUser = {
  id: '1024025',
  login: 'torvalds',
  name: 'Linus Torvalds',
  avatarUrl: 'https://avatars.githubusercontent.com/u/1024025?v=4',
  url: 'https://github.com/torvalds',
  websiteUrl: null,
  bio: null,
  company: 'Linux Foundation',
  location: 'Portland, OR',
  isHireable: false,
  createdAt: '2011-09-03T15:26:22Z',
  updatedAt: '2025-03-17T21:49:16Z',
  followers: {
    totalCount: 232823,
  },
  following: {
    totalCount: 0,
  },
  repositories: {
    nodes: [],
  },
}
