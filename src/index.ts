import { ApolloServer, gql } from 'apollo-server'

// Toda request é do tipo POST
// Toda requst bate no MESMO endpoint ('/graphql')

// Query -> Obter Informações (GET)
// Mutation -> Manipular dados
// Scalar Types -> String, Int, Boolean, Float e ID

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello World'
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(`🦄 Server started at ${url}`))