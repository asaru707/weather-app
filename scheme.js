const typeDefs = `
  type Weather {
    temp: String!
    desc: String!
    icon: String!
    dt: Int!
  }

  type Query {
    currentWeather(location: String!): Weather!
    historicalWeather(from: String, to: String, location: String!): [Weather]!
  }
`

module.exports = typeDefs
