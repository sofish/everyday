/*!
 * Secretary - 用于任务安排的自然语言识别
 * Author: Sofish Lin - https://github.com/sofish
 * Lisence under MIT
 */
(function () {

  var regs = {
    reminder: /^(提醒(?:我)?|todo|task|reminder|(?:remind\s+(?:me)*))/,

    // 时间配置
    due: {
      // time: 1:40p(a)m / 16:00 | 上午 6 点(时) 3 刻(分)
      time: /((\d+[:]\d+([ap]m)?)|([上下]午\s*\d\s*([点时]|[:]\d+)?(\s*(\d+|[一二三])\s*[刻分])?))/,

      // month-day-year : April 4, 2003 | 2014-03-01
      date: /(([a-zA-Z]{3,}\s+\d+(\s*[,]?\s*\d{4})?)|(?:\d{4}(?:[-/.]?\d{1,2}){2}))/g,

      weekday: /([本下]?周[一二三四五六日])/

    }
  };

  function merge(dest, src) {
    for(var p in src) {
      var prop = src[p];
      if(Object.prototype.toString.call(prop).match(/(Object|Array)/)) {
        dest[p] = prop.slice ? [] : {};
        copy(dest[p], prop);
        continue;
      }
      console.log(dest, p)
      dest[p] = prop;
    }
    return dest;
  }

  // type detect
  function is(str) {
    var ret = {};

    ret.type = regs.reminder.test(str) ? 'reminder' : 'event';
    ret.title = str.replace(regs.reminder, '').trim();

    return ret;
  }

  // extract time from a string
  function due(str) {
    var ret = {};

    str = str.replace(regs.due.time, function(match) {
      ret.time = match;
      return match = '';
    });

    str = str.replace(regs.due.weekday, function(match) {
      ret.time = ret.time || '';
      ret.time = match + ret.time;
      return match = '';
    })

    str = str.replace(regs.due.date, function(match) {
      if (ret.deadline) ret.start_date = ret.deadline;
      ret.deadline = match;
      return match = '';
    });

    ret.title = str.trim();

    return ret;
  }

  // parse
  function parse(str) {
    var ret1 = is(str)
      , ret2 = due(ret1.title);

    return merge(ret1, ret2);
  }

  window.secretary = parse;
})();
