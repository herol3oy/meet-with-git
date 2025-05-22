export const SEARCH_USERS_QUERY = `
query SearchUsers($query: String!) {
  search(query: $query, type: USER, first: 10) {
    nodes {
      ... on User {
        id
        login
        name
        avatarUrl
        url
        websiteUrl
        bio
        company
        location
        isHireable
        createdAt
        updatedAt
        followers {
          totalCount
        }
        following {
          totalCount
        }
        repositories(
          first: 10
          orderBy: { field: UPDATED_AT, direction: DESC }
        ) {
          nodes {
            id
            name
            description
            stargazerCount
            primaryLanguage {
              id
              name
            }
          }
        }
      }
    }
  }
}
`
