const Koa = require('koa')
const staticCache = require('koa-static-cache')
const Router = require('koa-router')
const path = require('path')

const minimist = require('minimist')
const args = minimist(process.argv.slice(2))
const env = args.env || 'dev'
const config = require(`../config/${env}.env.js`)

const app = new Koa()

app.config = config
app.router = new Router()

app.use(async (ctx, next)=>{
  await next()
  if (ctx.fresh) {
    ctx.status = 304;
    ctx.body = null;
  }
  if(ctx.status == 404){
    // await config.notfound.call(ctx, ctx)
    // await ctx.render('404')
  }
})
app.use(async (ctx, next)=>{
  try{
    await next()
  } catch(e) {
    app.emit('error', e)
    // await config.onerror.call(ctx, e, ctx)
  }
})

app.use(staticCache({
  dir: path.join(__dirname, '../dist'),
  // maxAge: 1000 * 60 * 60 * 24 * 365,
  prefix: '/',
  dynamic: true,
  buffer: process.env.NODE_ENV !== 'development',
  gzip: true
}))


// 定义Router
require('./router')(app)
app.use(app.router.routes())
app.use(app.router.allowedMethods())

app.on('error', async (e, ctx) => {
  console.log(e.stack);
})

app.listen(config.port, '0.0.0.0', (error, status) => {
  if (error) {
    console.log(error)
  }
  console.log(`server is running at http://localhost:${config.port}.`)
})
