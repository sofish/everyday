/*!
 * Secretary - 用于任务安排的自然语言识别
 * Author: Sofish Lin - https://github.com/sofish 
 * Lisence under MIT
 */
(function() {
   
  var regs = {
    reminder: /^(提醒|todo|task|reminder|(?:remind\s+(?:me)*))/,
    
    due: [
        // time: 1:40p(a)m 23m(min/minutes)/16:00 | 上午 6 点(时) 3 刻(分)
        /(\d+(?:[:]\d+)?(?:[ap]m)?(?:\s*\d+(?:m|min|mins|minute|minutes))?)|([上下]午\s*\d\s*(?:[点时]|[:]\d+)?(?:(?:\d+|[一二三])\s*[刻分])?)/,
        // month-day-year : April 4, 2003 
       /[a-zA-Z]\s*\d+(?:(?:\s*[,]\s*)|\s+\d{4})?/
  };

  // type detect
  function is(str) {
    return str.test(reminder) ? 'reminder' : 'event';
  }

  // extract time from a string
  function due() {
  }

})();
