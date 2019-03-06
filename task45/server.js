var http = require('http');
var fs = require('fs');
var url = require('url');
var port = process.argv[2];

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？');
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true);
  var path = request.url;
  var query = '';
  if (path.indexOf('?') >= 0) {
    query = path.substring(path.indexOf('?'))
  }
  var pathNoQuery = parsedUrl.pathname;
  var queryObject = parsedUrl.query;
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/



  console.log('HTTP 路径为\n' + path);
  if (path === '/') {
    let string = fs.readFileSync('./index.html', 'utf8');
    let cookies = request.headers.cookie.split('; ');
    let hash = {};
    for (let i = 0; i < cookies.length; i++) {
      let parts = cookies[i].split('=');
      hash[parts[0]] = parts[1];
    }
    let email = hash.sign_in_email;
    let users = fs.readFileSync('./db/users', 'utf8');
    users = JSON.parse(users);
    let foundUser;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        foundUser = users[i];
        break
      }
    }
    if (foundUser) {
      string = string.replace('__password__', foundUser.password)
    } else {
      string = string.replace('__password__', '不知道')
    }
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.write(string);
    response.end()
  } else if (path === '/sign_up' && method === 'GET') {
    let string = fs.readFileSync('./sign_up.html', 'utf8');
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.write(string);
    response.end()
  } else if (path === '/sign_up' && method === 'POST') {
    readBody(request).then((body) => {
      let strings = body.split('&');
      let hash = {};
      strings.forEach((string) => {
        let parts = string.split('=');
        hash[parts[0]] = decodeURIComponent(parts[1]);
      });
      let {email, password, password_confirmation} = hash;
      if (email.indexOf('@') === -1) {
        response.statusCode = 400;
        response.setHeader('Content-Type', 'application/json; charset=utf-8');
        response.write(`{
          "errors": {
            "email": "invalid"
          }
        }`)
      } else if (password !== password_confirmation) {
        response.statusCode = 400;
        response.write('password not match')
      } else {
        let users = fs.readFileSync('./db/users', 'utf-8');
        try {
          users = JSON.parse(users);
        } catch (e) {
          users = [];
        }
        let inUse = false;
        for (let i = 0; i < users.length; i++) {
          let user = users[i];
          if (user.email === email) {
            inUse = true;
            break;
          }
        }
        if (inUse) {
          response.statusCode = 400;
          response.write('email in use');
        } else {
          users.push({email: email, password: password});
          var usersString = JSON.stringify(users);
          fs.writeFileSync('./db/users', usersString);
          response.statusCode = 200
        }
      }
      response.end()
    });


  } else if (path === '/sign_in' && method === 'POST') {
    readBody(request).then((body) => {
      let strings = body.split('&'); // ['email=1', 'password=2', 'password_confirmation=3']
      let hash = {};
      strings.forEach((string) => {
        let parts = string.split('=');// ['email', '1']
        hash[parts[0]] = decodeURIComponent(parts[1]) // hash['email'] = '1'
      });
      let {email, password} = hash;
      var users = fs.readFileSync('./db/users', 'utf8');
      try {
        users = JSON.parse(users) // []
      } catch (exception) {
        users = []
      }
      let found;
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
          found = true;
          break
        }
      }
      if (found) {
        response.setHeader('Set-Cookie', `sign_in_email=${email}`);
        response.statusCode = 200
      } else {
        response.statusCode = 401
      }
      response.end()
    })
  } else if (path === '/sign_in' && method === 'GET') {
    let string = fs.readFileSync('./sign_in.html', 'utf8');
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html;charset=utf-8');
    response.write(string);
    response.end()
  } else if (path === '/main.js') {
    let string = fs.readFileSync('./main.js', 'utf8');
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/javascript; charset=utf-8');
    response.write(string);
    response.end()
  } else if (path === '/xxx') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/json; charset=utf-8');
    response.write(`
    {
      "student": {
        "name": "张三",
        "age": "20",
        "school": "饥人谷"
      }
    }
    `);
    response.end()
  } else {
    response.statusCode = 404;
    response.end()
  }


  /******** 代码结束，下面不要看 ************/
});

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      resolve(body)
    });
  })
}

server.listen(port);
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port);


