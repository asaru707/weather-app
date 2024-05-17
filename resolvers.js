const { default: axios } = require('axios')
const { GraphQLError } = require('graphql')

const resolvers = {
  Query: {
    currentWeather: async (root, args) => {
      const location = args.location
      if (!location) {
        throw new GraphQLError('location is required')
      }
      try {
        const res = await axios(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHERAPPID}&units=metric`
        )

        const temp = res.data.main.temp
        const desc = res.data.weather[0].description
        const icon = res.data.weather[0].icon
        const dt = res.data.dt

        return { temp, desc, dt, icon: `http://openweathermap.org/img/w/${icon}.png` }
      } catch (error) {
        if (error.response) {
          if (error.response.data.cod === '404') {
            throw new GraphQLError('location not found')
          }
          if (error.response.data.cod === 401) {
            throw new GraphQLError('invalid API key')
          }
        }
        throw new GraphQLError('failed fetching current weather')
      }
    },
    historicalWeather: async (root, args) => {
      const from = new Date(args.from)
      const to = new Date(args.to)

      const location = args.location && args.location.toLowerCase()

      const locations = ['delhi', 'moscow', 'paris', 'new york', 'sydney', 'riyad']
      if (!locations.includes(location)) {
        throw new GraphQLError(`${location} data not available`)
      }

      if (isNaN(from) || isNaN(to)) {
        throw new GraphQLError('invalid From date or To date')
      }
      const dateDiff = to - from
      if (dateDiff < 0) {
        throw new GraphQLError('From date must be earlier than To date')
      }

      const numberOfDays = dateDiff / (1000 * 60 * 60 * 24)
      if (numberOfDays > 30) {
        throw new GraphQLError('maximum date range should be 30 days')
      }

      const fromUnixTime = Math.floor(from.getTime() / 1000)
      const toUnixTime = Math.floor(to.getTime() / 1000)

      try {
        const res = await axios(
          `https://history.openweathermap.org/data/2.5/history/city?q=${location}&type=hour&start=${fromUnixTime}&end=${toUnixTime}&appid=${process.env.OPENWEATHERAPPID}`
        )

        return res.data.map((weather) => ({
          temp: weather.main.temp,
          desc: weather.weather[0].description,
          dt: weather.dt,
          icon: `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`,
        }))
      } catch (error) {
        if (error.response) {
          if (error.response.data.cod === '404') {
            throw new GraphQLError('location not found')
          }
          if (error.response.data.cod === 401) {
            throw new GraphQLError('invalid API key')
          }
        }
        throw new GraphQLError('failed fetching historical weather')
      }
    },
  },
}

module.exports = resolvers
