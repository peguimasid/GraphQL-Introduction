import { ApolloServer, gql } from 'apollo-server'
import axios from 'axios'

interface User {
  _id: string
  name: string
  email: string
  active: boolean
}

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
  }

  type Github {
    login: String
    id: Int
    node_id: String
    avatar_url: String
    gravatar_id: String
    url: String
    html_url: String
    followers_url: String
    following_url: String
    gists_url: String
    starred_url: String
    subscriptions_url: String
    organizations_url: String
    repos_url: String
    events_url: String
    received_events_url: String
    type: String
    site_admin: Boolean
    name: String
    company: String
    blog: String
    location: String
    email: String
    hireable: String
    bio: String
    twitter_username: String
    public_repos: Int
    public_gists: Int
    followers: Int
    following: Int
    created_at: String
    updated_at: String
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    hello: String
    getGithubUser(user: String!): Github
    users: [User!]!
    getUserByEmail(email: String!): User!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`

const users = [
  { _id: String(Math.random()), name: 'Guilhermo 1', email: 'guilhermomasid@gmail.com', active: true },
  { _id: String(Math.random()), name: 'Guilhermo 2', email: 'guilhermomasid@daktus.co', active: false },
]

const resolvers = {
  Query: {
    hello: () => 'Hello World',
    getGithubUser: async (_: unknown, args: any) => await (await axios.get(`https://api.github.com/users/${args.user}`)).data,
    users: () => users,
    getUserByEmail: (_: unknown, args: User) =>  users.find(user => user.email === args.email)
  },
  Mutation: {
    createUser: (_: unknown, args: User) => {
      const newUser = {
        _id: String(Math.random()),
        name: args.name,
        email: args.email,
        active: true
      }

      users.push(newUser)

      return newUser
    } 
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(`🦄 Server started at ${url}`))