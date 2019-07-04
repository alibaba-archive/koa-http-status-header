koa http status
======
[![CircleCI](https://circleci.com/gh/teambition/koa-http-status-header.svg?style=svg)](https://circleci.com/gh/teambition/koa-http-status-header)

Always response with status code 200 but set real http status in `x-http-status` header. 
It helps koa works in some strict environment that does not allow http status other than 200.

## Usage
```js
const Koa = require('koa')
const httpStatusHeader = require('@tng/koa-http-status-header')
const app = new Koa()
app.use(httpStatusHeader())
// ...

```

If response contains error. You will get resp with status code 200 like below.
```
> GET /some-wrong-request HTTP/1.1
> Host: localhost
> User-Agent: curl/7.54.0
> Accept: */*

< HTTP/1.1 200 OK
(notice the line below)
< x-http-status: 400
< Content-Length: 30
< Content-Type: application/json
...
```

## API
<!-- See [docs/api.md](docs/api.md) -->
setHttpStatusHeader(options: StatusHeaderOptions = {}): Koa.Middleware
return `Koa.Middleware` to set response a header represent http status code.

- options: *Object*
  - headerName: *String* (Optional) a specific name for store http status code in response header. Default is `x-http-status`
