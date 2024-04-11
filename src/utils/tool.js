// 数组去重
export function arrayFilter(arr) {
  var newArr = arr.filter(function (item, index) {
    return arr.indexOf(item) === index
  })
  return newArr
}
// 数组对比  去除相同的元素
export function arrayDifferece(arr1, arr2) {
  for(let i in arr1){
    for(let j in arr2){
      if(arr2[j].note === arr1[i]){
        arr1.splice(i, 1)
      }
    }
  }
  return arr1
}

// 字符串首字母大写 其余小写
export function titleCase(str) {
  return str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase()
}

// 判断两个数组 值相等
export function scalarArrayEquals(array1,array2) {
  return array1.length==array2.length && array1.every(function(v,i) { return v === array2[i]});
}