import {Middleware} from 'koa'

interface StatusHeaderOptions {
  headerName?: string
}

export function setHttpStatusHeader(options: StatusHeaderOptions = {}): Middleware {
  return async function setHttpStatusHeaderMiddleware(ctx, next) {
    try {
      await next()
    } catch (e) {
      ctx.status = e.status || 500
      ctx.body = ctx.body || e.message
    }
    ctx.set(options.headerName || 'x-http-status', ctx.status.toString())
    if (ctx.status >= 400) {
      ctx.status = 200
    }
  }
}

export default setHttpStatusHeader