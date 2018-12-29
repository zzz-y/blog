window.jQuery = function () {

}

window.jQuery.ajax = function (options) {
  let url = options.url;
  let method = options.method;
  let body = options.body;
  let successFn = options.successFn;
  let failFn = options.failFn;
  let headers = options.headers;

  // 声明一个XMLHttpRequest对象
  let request = new XMLHttpRequest();
  // 初始化一个请求, 参数为 方法 路径 是否异步（默认为是）
  for (let key in headers) {
    let value = headers[key];
    request.setRequestHeader(key, value);
  }
  request.open(method, url);
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        successFn.call(undefined, request.responseText);
      } else if (request.status >= 400) {
        failFn.call(undefined, request);
      }
      ;
      // 发送请求
      request.send(body);
    }
  }
}
window.$ = window.jQuery;

myButton.addEventListener('click', (e) => {

});