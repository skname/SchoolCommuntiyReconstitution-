// 充值一个对象中的某些属性
export function handleReset(obj = {}, attr = [], init = '') {
  let len = attr.length;
  for (let i = 0; i < len; i++) {
    obj[attr[i]] = init
  }
}

// 从一个数组重过滤另一个数组
export function filterFromOther(arr = [], filters = []) {
  filters.forEach(item => {
    const index = arr.indexOf(item);
    if (index != -1) {
      arr.splice(index, 1);
    }
  })
  return arr;
}