myButton.addEventListener('click', (e) => {
  // 声明一个XMLHttpRequest对象
  let request = new XMLHttpRequest();
  // 初始化一个请求, 参数为 方法 路径 是否异步（默认为是）
  request.open('GET', '/xxx')
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >=200 && request.status <300) {
        console.log(request.responseText);
      } else if(request.status >= 400) {
        console.log('请求失败')
      }
    }
  };
  // 发送请求
  request.send();
});