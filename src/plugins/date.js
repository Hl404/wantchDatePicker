
// 月份对应天数
export const monthDay = [31, 30, 28, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const chineseMonth = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];


// 获取某年月份
export function getMonths (year) {
    let now = new Date(),
        nowYear = now.getFullYear(),
        data = [],
        end = year === nowYear ? now.getMonth() + 1 : 12;

    for (let i=1; i<=end; i++) {
        data.push(i);
    }

    return data;
}


// 获取某个月对应天数
export function getDayByMonth (year, month) {
   if(year == undefined || month == undefined){
   		alert('---call error----');
   }
   let dateVal =  new Date(year, month, 0);
   let lastDay = dateVal.getDate();   
   let data = [];
   for(let i=1;i<=lastDay;i++){
   		data.push(i);
   } 
   return data;
}


// 是否是闰年
export function isRunYear (year) {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}


// 获取当前年份时间
export function getDateLimitOfYear (year) {
    return [`${year}-01-01`, `${year}-12-31`];
}


// 获取月份对应时间区间
export function getDateLimitOfMonth (year, month) {
    let days = getDayByMonth(year, month).length;

    return [`${year}-${fill(month)}-01`, `${year}-${fill(month)}-${days}`];
}


// 获取周对应时间区间
export function getDateLimitOfWeek (year, week) {
    let now = new Date(),
        nowYear = now.getFullYear(),
        paramDate = new Date(`${year}/12/31`),
        endTime = year === nowYear ? now.getTime() : paramDate.getTime();

    return [];
}

// 获取某年对应周
export function getWeeks (year) {
    let data = [],
        now = new Date(),
        nowYear = now.getFullYear(),
        paramDate = new Date(`${year}/12/31`),
        endTime = year === nowYear ? now.getTime() : paramDate.getTime(),
        startTime = new Date(`${year}/1/1`).getTime();

    // 一天时间换算成毫秒
    let dayTime = 24 * 60 * 60 * 1000;
    for (let time = startTime, num = 1; time <= endTime; time += 7*dayTime, num++) {
        // let start = getYmd(time);
        data.unshift({
            num,
            startDate: getMonthDay(time),
            endDate: getMonthDay(time + 6*dayTime),
            date: [getYmd(time), getYmd(time + 6*dayTime)]
        });
    }

    return data;
}


// 传入date time获取年月日
export function getYmd (time) {
    let d = new Date(time);
    return `${d.getFullYear()}-${fill(d.getMonth() + 1)}-${fill(d.getDate())}`;
}

export function getMonthDay (time) {
    let d = new Date(time);
    return `${fill(d.getMonth() + 1)}月${fill(d.getDate())}日`;
}


// 填充
export function fill (n) {
    return n < 10 ? '0' + n : n;
}
