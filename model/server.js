let http = require("http"), url = require("url"), list = require("./list"),logins=require("./logins")
let server = http.createServer((req, res) => {
    //以下是请求头配置项
    res.writeHead(200, {
        //允许跨域请求的接口，默认只能填写有一个地址，可以设置一个白名单，
        //把白名单每一项放到一个数组，取到请求服务器的地址，去循环判断，有就取出来，使用模板字符串以变量形式传入
        "Access-Control-Allow-Origin": "http://localhost:8080",
        //跨域请求是否允许携带cookies
        "Access-Control-Allow-Credentials": "true",
        //允许的请求方式，客串多个
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH",
        //允许请求头包含的字段，User-Agent显示浏览器信息，可以分辨是使用什么设备访问的网站（手机安卓，ios，电脑）
        //Connection表示是否缓存路由；Content-Type表示返回给前端文件的数据类型
        //Origin表示允许跨域请求的地址；Referer表示请求服务器的地址；Host表示当前服务器地址
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type,Token,Accept, Connection, User-Agent, Cookie",
        //在设置的3628800毫秒不允许发送OPTIONS测试请求
        "Access-Control-Max-Age": "3628800",
        //设置返回给前端的数据类型
        'Content-Type': 'application/json;charset=UTF8'
    });//地址解析
    let { pathname, query } = url.parse(req.url, true)
    //列表页接口数据
    if (pathname == "/hotlist" && req.method == "GET") {
        list.gethotlist(res, query)
    }
    //购物车页面列表接口
    if (pathname == "/shoplist" && req.method == "GET") {
        list.getshoplist(res)
    }
    //购物车页面购物车数量添加接口
    if (pathname == "/addshoplist" && req.method == "POST") {
        list.getaddshoplist(req, res)
    }
    //购物车页面购物车数量减少接口
    if (pathname == "/cutshoplist" && req.method == "POST") {
        list.getacutshoplist(req, res)
    }
    //购物车页面删除接口
    if (pathname == "/delshoplist" && req.method == "POST") {
        list.getdelshoplist(req, res)
    }
    //获取全选状态接口
    if (pathname == "/boxcheckall" && req.method == "POST") {
        list.getboxcheckall(req, res)
    }
    //获取列表选中状态接口，更改状态数据
    if (pathname == "/boxcheck" && req.method == "POST") {
        list.getboxcheck(req, res)
    }
    //获取详情页数据接口
    if (pathname == "/details" && req.method == "GET") {
        list.getdetailpage(res,query)
    }
    //----------------------------------login接口区域----------------------------------------
    // 获取登录接口
    if (pathname == "/login" && req.method == "POST") {
        logins.getlogin(req, res)
    }
    //获取验证token接口
    if (pathname == "/logintoken" && req.method == "POST") {
        logins.getviltoken(req, res)
    }

});
server.listen(7000, () => {
    console.log("启动了7000服务");

})


