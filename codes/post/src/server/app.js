var http = require('http')
  , url = require('url')
  , fs = require('fs')
  , formidable = require('formidable')
  , mime = require('mime')
  , layout = fs.readFileSync(__dirname + '/view/layout')

// 发送数据
function send(res, options) {
  res.writeHead(options.code, options.header);
  res.write(options.data);
  res.end();
}

// 生成页面
function render(name, message, code) {
  var html, pathname = __dirname + '/view/' + name;

  html = fs.existsSync(pathname) ? fs.readFileSync(pathname).toString() : '';
  html = html.replace('{{message}}', message || '').replace();
  html = layout.replace('{{body}}', html);

  send(this, {
    code: code || 200,
    data: html,
    header: {
      'Content-Type': 'text/html',
      'Content-Length': html.length
    }
  })
}

// 静态文件
function statics(pathname) {

  // 没找到文件，或者他是一个文件夹
  if(fs.existsSync(pathname) || !fs.statSync(pathname).isFile()) return send(this, { code: 404, data: ''});

  var type = mime.lookup(pathname) || 'text/plain';

  send(this, {
    code: 200,
    data: fs.readFileSync(pathname),
    header: {
      'Content-Type': type,
      'Expires': 365 * 24 * 3600 + (new Date).getTime()
    }
  });
}

// 配置路由
http.createServer(function(req, res) {

  var urlobj = url.parse(req.url)
    , pathname = urlobj.pathname;

  // 首页
  if(pathname === '/') {
    render.call(res, 'index');

  // 静态文件处理
  } else if (pathname.match(/^\/static\/.+/)) {
    statics(pathname);

  // 其他所有请求都直接 404
  } else {
    render.call(res, 'nofound', 'The document is not exist!', 404);
  }

}).listen(7676);