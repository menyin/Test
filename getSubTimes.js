/**
 * Created by Administrator on 2017/2/24.
 */


/**
 *��ȡ����ʱ���ֵ�����졢ʱ���֡��룩
 * @param {string|date} date1 ����
 * @param {string|date} date2 ������
 * @param {number} date2 ��ʱ������
 * @param {function} callback �ص�����ʱ�����������sub
 * @returns {object} ���磺{day: 1, hour: 2, min: 3, second: 4}
 * @description  ���������Ϊʱ���ַ��������
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
 *��ȡ����ʱ���ֵ���졢ʱ���֡���
 * @param {string|date} date1 ����
 * @param {string|date} date2 ������
 * @returns {object} ���磺{day: 1, hour: 2, min: 3, second: 4}
 * @description  ���������Ϊʱ���ַ��������
 *
 */
function getSubTimes(date1, date2) {
    date1 = typeof date1 == 'object' ? date1 : new Date(date1.replace(/-/g, "/"));
    date2 = typeof date2 == 'object' ? date2 : new Date(date2.replace(/-/g, "/"));
//            date1 =new Date(date1.replace(/-/g, "/"));
//            date2 = new Date(date2.replace(/-/g, "/"));
    if (!date1.getTime || !date2.getTime) {
        return alert("�����д���");
    }
    var s1 = date1.getTime(), s2 = date2.getTime();
    var total = (s2 - s1) / 1000;
    var day = parseInt(total / (24 * 60 * 60));//������������
    var afterDay = total - day * 24 * 60 * 60;//ȡ�����������ʣ�������
    var hour = parseInt(afterDay / (60 * 60));//��������Сʱ��
    var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60;//ȡ�����Сʱ����ʣ�������
    var min = parseInt(afterHour / 60);//����������
    var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;//ȡ������ֺ�ʣ�������
//            alert(day + "��" + hour + "Сʱ" + min + "��" + afterMin + "��");
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