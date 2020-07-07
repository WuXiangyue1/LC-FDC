// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env:"lc-123",
  traceUser: true,
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  var dbName = event.dbName; // 集合名称
  console.log(dbName);
  var fieldName = event.fieldName ? event.fieldName : '_id';
  var order = event.order ? event.order : 'desc';
  var filter = event.filter ? event.filter : null; // 筛选条件，默认为空 格式{_id：'wxsd14545'}
  var pageIndex = event.pageIndex ? event.pageIndex : 1;//当前页数，默认第一页
  var pageSize = event.pageSize ? event.pageSize : 5; //每页取多少条记录，默认5条
  const countResult = await db.collection(dbName).where(filter).count() //获取集合中的总记录数
  console.log(countResult);
  const total = countResult.total // 得到总记录数
  console.log(total);
  const totalPage = Math.ceil(total / pageSize) //计算需要多少页
  var hasMore;//提示前端是否还有数据
  if(pageIndex > totalPage || pageIndex == totalPage){ //如果没有数据了，则返回false
    hasMore = false;
  }else{
    hasMore = true;
  }
  
  //最后查询数据并返回给前端
  return db.collection(dbName).where(filter)
        .skip((pageIndex-1) * pageSize).limit(pageSize).orderBy(fieldName,order)
        .get().then(res => {
         res.hasMore = hasMore;
         return res;
    })
  
}