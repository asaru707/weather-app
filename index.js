const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { default: mongoose } = require('mongoose')
require('dotenv').config()
const resolvers = require('./resolvers')
const typeDefs = require('./scheme')

mongoose
  .connect(process.env.MONGODBURI)
  .then(() => console.log('mongodb connected'))
  .catch(() => console.log('failed to connect mongodb'))

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
