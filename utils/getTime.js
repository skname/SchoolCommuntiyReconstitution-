export function transformTime(timestamp) {
  if (typeof timestamp != 'number') {
    return timestamp;
  }
  var time = new Date(timestamp);
  var M = time.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加
  var d = time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
  var h = time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
  var m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
  var s = time.getSeconds(); // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
  return M + '月' + d + '日 ' + h + ':' + m + ':' + s;
}