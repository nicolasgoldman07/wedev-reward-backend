import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'

import passportInit from './passportJwt'

import schema from './schema'
import models from './models'
import resolvers from './schema/resolvers'

require('dotenv').config()

const port = process.env.PORT || 3001

const app = express()

const server = new ApolloServer({
  ...schema,
  resolvers,
  context: async ({ req, res }) => ({ models, user: req.user || null }),
  instrospection: true,
  playground: true,
  tracing: true,
})

app.use(passportInit)

server.applyMiddleware({ app })

const httpServer = createServer(app)

server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port }, () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  console.log(
    `Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`,
  )
})
