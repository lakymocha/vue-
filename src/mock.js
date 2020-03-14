//引入mockjs
import Mock from 'mockjs'
//使用mockjs模拟数据
var Random = Mock.mock('/userlist',{
    "banner|5":[{
        'id':'@id',
        'name':'@cname',
        'age':'@integer(15,25)'
    }
        
    ]
})

export default Random