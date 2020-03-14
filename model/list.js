//列表接口管理
let fs = require("fs"), qs = require("qs")
//公共的错误信息
let listenerr = (res) => {
    res.writeHead(500, { 'Content-Type': 'application/json;charset=UTF8' });
    let errs = {
        error: '服务器读取出错',
        code: 500
    }
    res.end(JSON.stringify(errs))
}
//请求成功返回的条件
let okobj = {
    Response: null,
    IsSuccess: true,
    ErrorMsg: "数量修改成功"
}
//获取商品列表
exports.gethotlist = (res, query) => {
    let { page, crr } = query
    fs.readFile("mock/hotlist.json", "utf8", (err, resd) => {
        if (err) {
            listenerr(res); return
        }
        let json = JSON.parse(resd)
        let data = json.hotlist.slice((page - 1) * crr, page * crr)
        let obj = {
            hotlist: data,
            total: 3
        }
        res.end(JSON.stringify(obj))
    })
}
//获取购物车列表
exports.getshoplist = (res) => {
    fs.readFile("mock/shoplist.json", "utf8", (err, resd) => {
        if (err) {
            listenerr(res); return
        }
        let data = JSON.parse(resd).shoplist
        let objs = {
            shoplist: data
        }

        res.end(JSON.stringify(objs))

    })
};
//获取添加购物车接口
exports.getaddshoplist = (req, res) => {
    let pos = ``
    req.on("data", (d) => {
        pos += d
    });
    req.on("end", () => {
        let { id } = qs.parse(pos)
        fs.readFile("mock/shoplist.json", "utf8", (err, resd) => {
            if (err) {
                listenerr(res); return

            } else {
                let data = JSON.parse(resd).shoplist
                let s = data.find((ele) => {
                    return ele.bookId == id
                });
                let obj = {
                    shoplist: data
                }
                if (s) {
                    s.bookNum = s.bookNum - 0 + 1
                    fs.writeFile("mock/shoplist.json", JSON.stringify(obj), (err) => {
                        if (err) {
                            listenerr(res);
                        } else {
                            res.end(JSON.stringify(okobj))
                        }
                    })
                } else {
                    fs.readFile("mock/hotlist.json", "utf8", (err, resd) => {
                        if (err) {
                            return
                        }
                        let datas = JSON.parse(resd).hotlist;
                        let d = datas.find((ele) => {
                            return ele.bookId == id
                        });
                        obj.shoplist = [...data,d]
                        fs.writeFile("mock/shoplist.json", JSON.stringify(obj), (err) => {
                            if (err) {
                                listenerr(res);
                            } else {

                                res.end(JSON.stringify(okobj))
                            }
                        })
                    })
                }
            }


        })

    })
}
//获取减少购物车接口
exports.getacutshoplist = (req, res) => {
    let pos = ``
    req.on("data", (d) => {
        pos += d
    });
    req.on("end", () => {
        let { id } = qs.parse(pos)
        fs.readFile("mock/shoplist.json", "utf8", (err, resd) => {
            if (err) {
                listenerr(res); return
            }
            let data = JSON.parse(resd).shoplist
            let a = data.find((ele) => {
                return ele.bookId == id
            })
            let obj = {
                shoplist: data
            }

            if (a.bookNum >= 1) {//当选中项的数量大于等于1时减一
                a.bookNum = a.bookNum - 1
            }
            if (a.bookNum < 1) { //当数量小于1的时候删除这条数据
                let d = data.filter((els) => {
                    return els.bookId != id
                })
                obj.shoplist = [...d]
                fs.writeFile("mock/shoplist.json", JSON.stringify(obj), (err) => {
                    if (err) {
                        listenerr(res); return
                    }
                    res.end(JSON.stringify(okobj))

                })
            } else if (a.bookNum >= 1) { //当数量大于或者等于1重新写入此条数据
                fs.writeFile("mock/shoplist.json", JSON.stringify(obj), (err) => {
                    if (err) {
                        listenerr(res); return
                    }
                    res.end(JSON.stringify(okobj))

                })
            }



        })

    })
}
//获取购物车删除接口
exports.getdelshoplist = (req, res) => {
    pos = ``;
    req.on("data", (d) => {
        pos += d
    })
    req.on("end", () => {
        let { id } = qs.parse(pos)
        fs.readFile("mock/shoplist.json","utf8",(err,resd)=>{
            if(err){
                listenerr(res);return
            }
            let data=JSON.parse(resd).shoplist;
            let s=data.filter((ele)=>{
                return ele.bookId!=id;
            })
            let obj={
                shoplist:[...s]
            }
            fs.writeFile("mock/shoplist.json",JSON.stringify(obj),(err)=>{
                if(err){
                    listenerr(res);return
                }
                res.end(JSON.stringify(okobj));
            })
        })
    })
}
//获取全选状态接口更改其他多选框选中状态
exports.getboxcheckall = (req,res) => {
    pos=``;
    req.on("data",(d)=>{
        pos+=d
    });
    req.on("end",()=>{
        let {newval}=qs.parse(pos);
        let val=newval=="true"?true:false
            fs.readFile("mock/shoplist.json","utf8",(err,resd)=>{
                if(err){
                    listenerr(res);return
                }
                let data=JSON.parse(resd).shoplist;
                data.forEach(ele=> {
                    return ele.isSed=val
                });
                let obj={
                    shoplist:data
                }
                fs.writeFile("mock/shoplist.json",JSON.stringify(obj),(err)=>{
                    if(err){
                        listenerr(res);return
                    }
                    res.end(JSON.stringify(okobj))
                })
                
            })
    });
}
//列表的多选项的状态影响全选的状态
exports.getboxcheck=(req,res)=>{
    pos=``;
    req.on("data",(d)=>{
        pos+=d;
    });
    req.on("end",()=>{
        let {id}=qs.parse(pos);
        fs.readFile("mock/shoplist.json","utf8",(err,resd)=>{
            if(err){
                listenerr(res);return
            }
            let data=JSON.parse(resd).shoplist;
            let s=data.find((ele)=>{
                return ele.bookId==id
            })
            let obj={
                shoplist:data
            }
            s.isSed=!s.isSed;
            fs.writeFile("mock/shoplist.json",JSON.stringify(obj),(err)=>{
                if(err){
                    listenerr(res);return
                }
                res.end(JSON.stringify(okobj))
            })
        })
        
    })
}
//获取详情页数据
exports.getdetailpage = (res, query) => {
    let {id}=query;
    fs.readFile("mock/hotlist.json","utf8",(err,resd)=>{
        if(err){
            listenerr(res);return
        }
        let data=JSON.parse(resd).hotlist;
        let d = data.filter((els) => {
            return els.bookId == id
        })
        let obj={
            details:d
        }
        res.end(JSON.stringify(obj))
        
        fs.writeFile("mock/details.json",JSON.stringify(obj),(err)=>{
            if(err){
                listenerr(res);return
            }
        })
    })
    
}