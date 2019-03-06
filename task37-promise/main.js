window.jQuery = function () {

}

window.jQuery.ajax = function ({url, method, body, successFn, failFn, headers}) {
  return new Promise(function (resolve, reject) {
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
          resolve.call(undefined, request.responseText);
        } else if (request.status >= 400) {
          reject.call(undefined, request);
        }
      }
    }
    // 发送请求
    request.send(body);
  })
}

window.$ = window.jQuery;

myButton.addEventListener('click', (e) => {
  window.jQuery.ajax({
    url: '/xxxx',
    method: 'get',
  }).then((e) => {
      console.log('sss');
    },
    () => {
      console.log('ddd');
    })
});