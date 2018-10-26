// 初始化数据
var keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];
var hash = {
  q: 'www.qq.com',
  w: 'weibo.com',
  e: 'ele.me',
  r: 'www.ruanyifeng.com',
  t: 'www.tianya.cn',
  y: 'youtube.com',
  u: 'uc.cn',
  i: 'iqiyi.com',
  o: 'opera.com',
  /*p: undefined,*/
  a: 'www.acfun.cn',
  s: 'www.sogou.com',
  d: 'www.dangdang.com',
  /*f: undefined,
  g: undefined,
  h: undefined,*/
  j: 'www.jd.com',
  k: 'www.kfc.com.cn',
  /*l: undefined,*/
  z: 'zhihu.com',
  /*x: undefined,
  c: undefined,*/
  v: 'www.vip.com',
  b: 'bilibili.com',
  /*n: undefined,*/
  m: 'www.mcdonalds.com.cn'
};
// 取出 localStorage 中的 zz 对应的hash
var hashInLocalStorage = JSON.parse(localStorage.getItem('zz') || 'null');
if (hashInLocalStorage) {
  hash = hashInLocalStorage;
}

// 生成键盘
for (var i = 0; i < keys.length; i++) {
  var div = tag('div');
  main.appendChild(div);

  for (var j = 0; j < keys[i].length; j++) {
    var span = tag('span', {textContent: keys[i][j], className: 'text'});

    var btn = tag('button', {textContent: '编辑', id: keys[i][j]});
    btn.onclick = function (e) {
      var key = e.target.id;
      var img2 = e.target.previousSibling;
      hash[key] = prompt('给我一个网址');
      img2.src = 'http://' + hash[key] + '/favicon.ico';
      img2.onerror = function (e) {
        e.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
      };
      localStorage.setItem('zz', JSON.stringify(hash));
    };

    var img = createImg(hash[keys[i][j]]);

    var kbd = tag('kbd');
    kbd.appendChild(span);
    kbd.appendChild(img);
    kbd.appendChild(btn);

    div.appendChild(kbd);
  }
}

// 监听键盘
document.onkeypress = function (d) {
  var key = d.key;
  var website = hash[key];
  window.open('http://' + website);
};

function tag(name, attributes) {
  var element = document.createElement(name);
  for (var key in attributes) {
    element[key] = attributes[key];
  }
  return element;
}

function createImg(domain) {
  var img = tag('img');
  if (domain) {
    img.src = 'http://' + domain + '/favicon.ico'
  } else {
    img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
  }
  img.onerror = function (e) {
    e.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
  };
  return img;
}