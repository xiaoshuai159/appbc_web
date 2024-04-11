export function getNowTime() {
  let now = new Date();
  let year = now.getFullYear(); // 得到年份
  let month = now.getMonth(); // 得到月份
  let date = now.getDate(); // 得到日期
  // let date2 = now.getDate()     // 得到日期
  month = month + 1;
  month = month.toString().padStart(2, "0");
  let date2 = date - 7; // 得到前一周日期
  console.log(typeof date2);
  if(date2 === 0){ date2 = 1}
  date2 = date2.toString().padStart(2, "0");
  date = date.toString().padStart(2, "0");
  let nowDate = "";
  let beforeDate = "";
  nowDate = `${year}-${month}-${date}`; // 当前时间
  // 正确代码
  beforeDate = `${year}-${month}-${date2}`; // 前一周
  // 测试代码
  // beforeDate = '2023-01-27'
  return { beforeDate: beforeDate, nowDate: nowDate };
}
