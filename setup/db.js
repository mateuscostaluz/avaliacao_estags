import Mongoose from 'mongoose'

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env

Mongoose.connect(
  `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
)

Mongoose.connection.on('error', () => console.error('connection error:'))
Mongoose.connection.once('open', () => console.log('database connected'))
