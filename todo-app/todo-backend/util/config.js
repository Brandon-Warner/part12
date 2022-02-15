const MONGO_URL = process.env.MONGO_URL || undefined
const REDIS_URL = process.env.REDIS_URL || undefined
const REDIS_COUNTER_KEY = 'counter'

module.exports = {
  MONGO_URL,
  REDIS_URL,
  REDIS_COUNTER_KEY
}