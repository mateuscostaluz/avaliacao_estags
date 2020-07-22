import './setup/db'

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const Routes = require('./src/routes')

const app = new Koa()

const router = new Router()

Routes(router)

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000, console.log('server initialized'))
