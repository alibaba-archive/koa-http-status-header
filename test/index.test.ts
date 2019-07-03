import 'mocha'
import * as assert from 'assert'
import * as http from 'http'
import * as Koa from 'koa'
import setHttpStatusHeader from '../src'

describe('test 400', () => {
  let httpServer: http.Server
  before(async () => {
    const app = new Koa()
    app.use(setHttpStatusHeader())
    app.use(async (ctx) => {
      ctx.throw(400, 'message')
    })
    httpServer = app.listen(3000)
  })

  after(async () => {
    httpServer.close()
  })

  it('test 400', async () => {
    const resp: http.IncomingMessage = await new Promise(resolve => http.request('http://localhost:3000', resolve).end())
    assert.equal(resp.statusCode, 200)
    assert.equal(resp.headers['x-http-status'], 400)
  })
})

describe('test 200', () => {
  let httpServer: http.Server
  before(async () => {
    const app = new Koa()
    app.use(setHttpStatusHeader())
    app.use(async (ctx) => {
      ctx.body = 'result'
    })
    httpServer = app.listen(3000)
  })

  after(async () => {
    httpServer.close()
  })

  it('test 200', async () => {
    const resp: http.IncomingMessage = await new Promise(resolve => http.request('http://localhost:3000', resolve).end())
    assert.equal(resp.statusCode, 200)
    assert.equal(resp.headers['x-http-status'], 200)
  })
})
