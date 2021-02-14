import { ApolloServer, gql } from 'apollo-server'

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

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    hello: String
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
    users: () => users,
    getUserByEmail: (_: unknown, args: User) => {
      return users.find(user => user.email === args.email)
    }
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