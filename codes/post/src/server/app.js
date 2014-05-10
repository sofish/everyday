var http = require('http')
  , url = require('url')
  , fs = require('fs')
  , formidable = require('formidable')
  , mime = require('mime')
  , path = require('path')
  , crypto = require('crypto')
  , layout = fs.readFileSync(path.resolve(__dirname, '../view/layout')).toString()

function URLSafeBase64(str) {
  return URLSafe(new Buffer(str).toString('base64'));
}

function URLSafe(str) {
  return str.replace(/\//g, '_').replace(/\+/g, '-');
}

// 生成七牛的上传验证
function qiniu() {
  var ak = '3iMlsbiNRlBMWSxnqDCJHZhvCjpUWP6NSduGtOUi'
    , sk = 'y06cdj5GSIa-AABznra2vp8X0D6lUs-h9cJeBV9F';

  // NOTE: 七牛并不是因为文件内容来管理文件，而是根据文件名来管理，这点很奇怪
  // REF: http://developer.qiniu.com/docs/v6/api/reference/security/put-policy.html
  var key = {
      scope: 'block',
      deadline: 1451491222
    };

  // URL Safe Base64
  var policy = URLSafeBase64(JSON.stringify(key));

  // 创建 hmac_sha1 并 decode
  var sign = URLSafe(crypto.createHmac('sha1', sk).update(policy).digest('base64'));

  // 七牛上传凭证形式
  return ak + ':' + sign + ':' + policy;
}

// 发送数据
function send(res, options) {
  res.writeHead(options.code, options.header);
  res.write(options.data);
  res.end();
}

// 生成页面
function render(name, options) {
  var html, pathname = path.resolve(__dirname,  '../view/' + name);

  options = options || {};
  html = fs.existsSync(pathname) ? fs.readFileSync(pathname).toString() : '';
  html = html.replace('{{message}}', options.message || '');
  html = layout.replace('{{body}}', html);

  send(this, {
    code: options.code || 200,
    data: html,
    header: {'Content-Type': 'text/html'}
  })
}

// 静态文件
function statics(pathname) {

  var pathname = path.resolve(__dirname, '..' + pathname);

  // 没找到文件，或者他是一个文件夹
  if(!(fs.existsSync(pathname) || fs.statSync(pathname).isFile())) return send(this, { code: 404, data: ''});

  var type = mime.lookup(pathname) || 'text/plain';

  send(this, {
    code: 200,
    data: fs.readFileSync(pathname).toString(),
    header: { 'Content-Type': type }
  });
}

// 配置路由
http.createServer(function(req, res) {

  var urlobj = url.parse(req.url)
    , pathname = urlobj.pathname;

  // 首页
  if(pathname === '/') {
    render.call(res, 'index', { message: qiniu() });
  // 静态文件处理
  } else if (pathname.match(/^\/public\/.+/)) {
    statics.call(res, pathname);

  // 其他所有请求都直接 404
  } else {
    render.call(res, 'nofound', {
      message: 'The document is not exist!',
      code: 404
    });
  }

}).listen(7676);

console.log('The app is running');