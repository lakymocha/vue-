//登录接口口管理
let fs = require('fs'), qs = require("qs");
//公共的报错方法
let listenerr = (res) => {
    res.writeHead(500, { 'Content-Type': 'application/json;charset=UTF8' });
    let errs = {
        error: '服务器读取出错',
        code: 500
    }
    res.end(JSON.stringify(errs))
}

// 获取验证登陆的账户密码是否正确，需要补充用户数据
exports.getlogin = (req, res) => {
    let pos = ``;
    req.on("data", (d) => {
        pos += d
    })
    req.on("end", () => {
        let { username, pass } = qs.parse(pos)
        fs.readFile("mock/userlist.json", "utf8", (err, resd) => {
            if (err) {
                listenerr(res); return
            }
            let data = JSON.parse(resd).userlist;
            let s = data.find((ele) => {
                return ele.name == username && ele.pass == pass
            })

            if (s) {
                let obj = {
                    IsSuccess: true,
                    token: "2889cbcc7c3cd02a7f259dd8e3f7a3fec5",
                    ErrorMsg: "登录成功",
                }
                res.end(JSON.stringify(obj))
            } else {
                let noneobj = {
                    IsSuccess: false,
                    ErrorMsg: '账号或密码错误'
                }
                res.end(JSON.stringify(noneobj))

            }
        })
    })
}
// 获取验证token的接口
exports.getviltoken = (req, res) => {
    let pos = ``;
    req.on("data", (d) => {
        pos += d
    })
    req.on("end", () => {
        let { token } = qs.parse(pos)
        let {key}=qs.parse(req.headers.cookie)
        if (token) {
            fs.readFile('mock/userlist.json', "utf8", (err, resd) => {
                if (err) {
                    listenerr(res); return
                }
                let data = JSON.parse(resd).userlist
                let s = data.find((ele) => {
                    return ele.name == key
                })

                let obj = {
                    Response: null,
                    IsSuccess: true,
                    ErrorMsg: "登录成功",
                    userdata: s.userdata
                }
                res.end(JSON.stringify(obj))

            })

        }
    })
}