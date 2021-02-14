import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql``
const resolvers = {}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(`🦄 Server started at ${url}`))