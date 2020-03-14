let http = require("http")
let url = require("url")
let fs = require("fs")
let mime =require("mime")
let https = http.createServer((req, res) => {
  let { pathname, query } = url.parse(req.url, true)
  let reg=/\.([a-z]+)/i
  let newname= reg.exec(pathname)
  let type= mime.getType(newname[1])
  res.writeHead(200, {
    // "Access-Control-Allow-Origin": "http://localhost:8080",
    // "Access-Control-Allow-Credentials": "true",
    // "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH",
    // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type,Token,Accept, Connection, User-Agent, Cookie",
    // "Access-Control-Max-Age": "3628800", 
    'Content-Type':`${type};charset=UTF8`
  });
  function errs(errs, resd) {
    if (errs) {
      fs.readFile("./error.html", "utf8", (er, re) => {
        if (er) {
          return
        }
        res.end(re)
      })
      return
    }
    res.end(resd)
  }

  let isok = fs.existsSync(`../case/dist${pathname}`)
  if (isok) {
    fs.readFile(`../case/dist${pathname}`, "utf8", (err, resd) => {
      errs(err,resd)
    })
  } else {
    fs.readFile("./error.html", "utf8", (err, resd) => {
      if (err) {
        return
      }
      res.end(resd)
    })

  }

})

https.listen(3500, () => {
  console.log("启动3500服务器");

})

