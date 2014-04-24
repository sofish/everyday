/*!
 * Secretary - 用于任务安排的自然语言识别
 * Author: Sofish Lin - https://github.com/sofish
 * Lisence under MIT
 */
(function () {

  var regs = {
    reminder: /^(提醒|todo|task|reminder|(?:remind\s+(?:me)*))/,

    // 时间配置
    due: {
      // time: 1:40p(a)m / 16:00 | 上午 6 点(时) 3 刻(分)
      time: /((\d+[:]\d+?([ap]m)?)|([上下]午\s*\d\s*([点时]|[:]\d+)?(\s*(\d+|[一二三])\s*[刻分])?))/,

      // month-day-year : April 4, 2003 | 2014-03-01
      date: /(([a-zA-Z]{3,}\s+\d+(\s*[,]?\s*\d{4})?)|(?:\d{4}(?:[-/.]?\d{1,2}){2}))/g
    }
  };

  // type detect
  function is(str) {
    var ret = {}

    reg.type = regs.reminder.test(str) ? 'reminder' : 'event'
    reg.title = str.replace(regs.reminder, '').trim();

    return ret;
  }

  // extract time from a string
  function due(str) {
    var ret = {};

    str = str.replace(regs.due.time, function(match) {
      ret.time = match;
      return match = '';
    })

    str = str.replace(regs.due.date, function(match) {
      if(ret.deadline) ret.start_date = ret.deadline;
      ret.deadline = match;
      return match = '';
    })

    ret.title = str.trim();

    return ret;
  }

  // format
  function format() {

  }
})();
