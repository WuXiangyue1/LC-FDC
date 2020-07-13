// 云函数入口文件
const cloud = require('wx-server-sdk')
//先init => db
cloud.init({
  env: "lc-123",
  traceUser: true,
})
const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
    //查找已经添加的楼盘地址
  if (event.type === 'adress') {
    return  db.collection('hourseList').field({
      address: true,
      
      }).get().then(res => {
        return res;
    
      })
  }

  if (event.type === 'community') {
    return db.collection('hourseList').field({
      name: true

    }).get().then(res => {
      return res;

    })
  }


 
  
}