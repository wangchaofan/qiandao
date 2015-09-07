'use strict';
var Calendar = function (options) {
    this.options = {
        id: 'calendar',
        dom: ''
    };
    var _self = this;
    this.constructor = this;
    $.extend(_self.options, options);
    this.dom = $(this.options.dom);
    if(this.dom.length <=0) {
        throw  error('Calendar', 'dom is not exist');
    }
    this.date = new Date();
    this.init();
};
Calendar.prototype = {
    init: function () {
        var _self = this;
        _self.showNow();
        _self.showAllDay(new Date());
        _self.initEvent();
    },
    initEvent: function () {
        var _self = this;
        _self.dom.on('click', ('.btn-next-month, .btn-pre-month'), function () {
            if($(this).hasClass('btn-next-month')) {
                _self.nextMonth();
            } else {
                _self.preMonth();
            }
        });
    },
    showNow: function (year, month) {
        var _self = this;
        var newDd = new Date();
        var year  = year || (newDd.getFullYear()),
            month = month || (newDd.getMonth() + 1);
            // dd = newDd.getDate();
        if(month < 10) {
            month = '0' + month;
        }
        // if(dd < 10) {
        //     dd = '0' + dd;
        // }
        _self.dom.find('.date-now').text(year + '-' + month + '月');
    },
    showAllDay: function (date) {
        var _self     = this;
        var arr31     = { 1 : true, 3 : true, 5 : true, 7 : true, 8 : true, 10 : true, 12 : true };
        var days      = 31;
        var isRunYear = false;
        var year      = date.getFullYear(),
            month     = date.getMonth() + 1,
            dd        = date.getDate();
        var firstDate = date.setDate(1);
        var firstDay  = date.getDay();
        //判断是否为闰年
        if((year % 4 == 0 && year % 100!=0) || year % 400 === 0) {
            isRunYear = true;
        }
        //判断当月天数
        if(!(month in arr31)) {
            if(month === 2) {
                isRunYear ?  days = 29 :  days = 28;
            } else {
                days = 30;
            }
        }
        var daysHtml = '';
        //显示日期
        for(var i = 0; i < firstDay; i++) {
            daysHtml += '<div class="day-box"></div>';
        }
        if(month < 10) {
            month = '0' + month;
        }
        var thisDayStr ='';
        for(var i = 1; i <= days; i++) {
            if(i<10) {
                thisDayStr = year + '-' + month + '-0'+i;
            } else {
                thisDayStr = year + '-' + month + '-'+ i;
            }
            daysHtml += '<div class="day-box hasdate" date="'+ thisDayStr +'">' +
                            '<span class="date-num">'+i+'</span>' +
                            '<span class="sign-mark"></span>' +
                        '</div>';
        }
        for(var i = 0; i < ((7 - (days + firstDay) % 7) % 7); i++) {
            daysHtml += '<div class="day-box"></div>';
        }
        _self.dom.find('.days').html(daysHtml);
        _self.loadData();
    },
    preMonth: function () {
        var _self   = this;
        var newDate = _self.date;
        if(newDate.getMonth() === 0) {
            _self.date.setFullYear(newDate.getFullYear() - 1, 11, newDate.getDate());
            
        } else {
            _self.date.setFullYear(newDate.getFullYear(),newDate.getMonth() - 1,newDate.getDate());
        }
        _self.showNow(_self.date.getFullYear(), _self.date.getMonth() + 1);
        _self.showAllDay(_self.date);
    },
    nextMonth: function () {
        var _self   = this;
        var newDate = _self.date;
        if(newDate.getMonth() === 12) {
            _self.date.setFullYear(newDate.getFullYear()+1, 0, newDate.getDate());
        } else {
            _self.date.setFullYear(newDate.getFullYear(),newDate.getMonth() + 1,newDate.getDate());
        }
        _self.showNow(_self.date.getFullYear(), _self.date.getMonth() + 1);
        _self.showAllDay(this.date);
    },
    // 加载日历数据
    loadData: function () {
        var dom = this.dom;
        var cityBox;
        var testData = [
            {
                date: "2015-08-01",
                signed: false
            }, {
                date: "2015-08-02",
                signed: true
            }, {
                date: "2015-08-03",
                signed: false
            }, {
                date: "2015-08-04",
                signed: true,
                activities: ['双倍积分']
            }, {
                date: "2015-08-05",
                signed: true
            }, {
                date: "2015-08-06",
                signed: true,
                activities: ['双倍积分', '招聘会']
            }, {
                date: "2015-08-07",
                signed: true
            }, {
                date: "2015-08-08",
                signed: true
            }, {
                date: "2015-08-26",
                signed: null,
                activities: ['双倍积分', '招聘会']
            }
        ];
        for(var i = 0; i < testData.length; i++) {
            cityBox = dom.find(".day-box[date='"+testData[i].date+"']");
            if(testData[i].signed === true) {
                cityBox.addClass('signed');
            } else if(testData[i].signed === false) {
                cityBox.addClass('no-signed').append('<span class="tag-3">未签到</span>');
            }
            if(testData[i].activities) {
                for(var j = 1; j <= testData[i].activities.length; j++) {
                    cityBox.append('<span class="tag-'+j+'">'+testData[i].activities[j-1]+'</span>');
                }
            }
        }
    }
};

