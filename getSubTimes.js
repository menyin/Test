/**
 * Created by Administrator on 2017/2/24.
 */


/**
 *获取两个时间差值对象（天、时、分、秒）
 * @param {string|date} date1 减数
 * @param {string|date} date2 被减数
 * @param {number} date2 定时毫秒数
 * @param {function} callback 回调，带时间间隔对象参数sub
 * @returns {object} 形如：{day: 1, hour: 2, min: 3, second: 4}
 * @description  输入参数可为时间字符串或对象
 * @example  interva('2013-04-02 19:22:50', '2013-04-02 19:22:24',1000,function(sub){console.log(sub)});
 */
 function interval(date1,date2,times,callback) {
    var timer = setInterval(function () {
        var iSub=getSubTimes(date1, date2);
        if (iSub.day==0&&iSub.hour==0&&iSub.min==0&&iSub.second==0) {
            clearInterval(timer);
        }
        if (callback) {
            var hourtime = {hour:iSub.day*24+iSub.hour,min:iSub.min};
            callback(hourtime);
        }
    },times);
};

/**
 *获取两个时间差值的天、时、分、秒
 * @param {string|date} date1 减数
 * @param {string|date} date2 被减数
 * @returns {object} 形如：{day: 1, hour: 2, min: 3, second: 4}
 * @description  输入参数可为时间字符串或对象
 *
 */
function getSubTimes(date1, date2) {
    date1 = typeof date1 == 'object' ? date1 : new Date(date1.replace(/-/g, "/"));
    date2 = typeof date2 == 'object' ? date2 : new Date(date2.replace(/-/g, "/"));
//            date1 =new Date(date1.replace(/-/g, "/"));
//            date2 = new Date(date2.replace(/-/g, "/"));
    if (!date1.getTime || !date2.getTime) {
        return alert("数据有错误！");
    }
    var s1 = date1.getTime(), s2 = date2.getTime();
    var total = (s2 - s1) / 1000;
    var day = parseInt(total / (24 * 60 * 60));//计算整数天数
    var afterDay = total - day * 24 * 60 * 60;//取得算出天数后剩余的秒数
    var hour = parseInt(afterDay / (60 * 60));//计算整数小时数
    var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60;//取得算出小时数后剩余的秒数
    var min = parseInt(afterHour / 60);//计算整数分
    var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;//取得算出分后剩余的秒数
//            alert(day + "天" + hour + "小时" + min + "分" + afterMin + "秒");
    return {day: day, hour: hour, min: min, second: afterMin};
}


//function Interval() {
//}
//Interval.prototype.start= function interval(date1,date2,times,callback) {
//    var _this=this;
//    _this.timer = setInterval(function () {
//        var iSub=getSubTimes(date1, date2);
//        if (iSub.day==0&&iSub.day==0&&iSub.day==0&&iSub.day==0) {
//            clearInterval(_this.timer);
//        }
//        if (callback) {
//            callback.apply(iSub,_this);
//        }
//    },times);
//};
//Interval.prototype.clear= function () {
//    clearInterval(this.timer);
//};