!function () {
  let duration = 50;
  $('.actions').on('click', 'button', function (e) {
    let $button = $(e.currentTarget);
    let speed = $button.attr('data-speed');
    $button.addClass('active')
      .siblings('.active').removeClass('active');
    switch (speed) {
      case 'slow':
        duration = 100;
        break;
      case 'normal':
        duration = 50;
        break;
      case 'fast':
        duration = 10;
        break;
    }
  });

  function writeCode(prefix, code, fn) {
    let domCode = document.querySelector('#code');
    let styleTag = document.querySelector('#styleTag');
    let n = 0;
    let id = setTimeout(function run() {
      n += 1;
      domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
      styleTag.innerHTML = prefix + code.substring(0, n);
      domCode.scrollTop = domCode.scrollHeight;
      if (n < code.length) {
        id = setTimeout(run, duration)
      } else {
        fn && fn.call()
      }
    }, duration);
  }

  let code = `
/*
 * 首先准备皮卡丘的皮
 */  

.preview {
    border: 1px solid green;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fee433;
}

.wrapper {
    height: 165px;
    width: 100%;
    position: relative;
}

/* 
 * 我需要一点代码高亮
 */
.token.selector{ color: #690; }

.token.property{ color: #905; }

/* 
 * 接下来，画皮卡丘的鼻子
 */
.nose {
    border-style: solid;
    border-width: 10px 12px;
    border-color: #000 transparent transparent;
    border-radius: 12px;
    position: absolute;
    left: 50%;
    margin-left: -12px;
    top: 28px;
}

/* 
 * 接下来，画皮卡丘的眼睛
 */
.eye {
    background: #2e2e2e;
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid #000;
}

/* 
 * 加个眼珠
 */
.eye::before {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    background: #fff;
    border-radius: 50%;
    border: 2px solid #000;
    position: absolute;
    left: 5px;
    top: -1px;
}

/* 
 * 左眼在左边
 */
.eye.left {
    right: 50%;
    margin-right: 90px;
}

/* 
 * 右眼在右边
 */
.eye.right {
    left: 50%;
    margin-left: 90px;
}

/* 
 * 然后，画皮卡丘的脸
 */
.face {
    background: #fc0d1c;
    position: absolute;
    width: 68px;
    height: 68px;
    border-radius: 50%;
    border: 2px solid #000;
    top: 85px;
}

.face.left {
    right: 50%;
    margin-right: 116px;

}

.face.right {
    left: 50%;
    margin-left: 116px;
}

/* 
 * 上嘴唇
 */
.upperLip {
    top: 44px;
    position: absolute;
    height: 20px;
    width: 64px;
    border-bottom: 2px solid #000;
    background: #fee433;
}

.upperLip.left {
    right: calc(50% - 1px);
    border-left: 2px solid;
    border-bottom-left-radius: 35px 20px;
    transform: rotate(-20deg);
}

.upperLip.right {
    left: calc(50% - 1px);
    border-right: 2px solid;
    border-bottom-right-radius: 35px 20px;
    transform: rotate(20deg);
}

/* 
 * 下嘴唇
 */
.lowerLip-wrapper {
    overflow: hidden;
    left: 50%;
    margin-left: -70px;
    height: 113px;
    width: 140px;
    position: absolute;
    bottom: 0;
}

.lowerLip {
    width: 140px;
    border: 2px solid #000;
    height: 350px;
    position: absolute;
    bottom: 0;
    background: #990513;
    border-bottom-left-radius: 70px 280px;
    border-bottom-right-radius: 70px 280px;
    overflow: hidden;
}

/* 
 * 舌头
 */
.lowerLip::after {
    content: '';
    position: absolute;
    bottom: -30px;
    width: 120px;
    height: 120px;
    left: 50%;
    margin-left: -60px;
    background: #fc4a62;
    border-radius: 50%;
}

/* 
 * 好了，完整的皮卡丘完成
 */`;
  writeCode('', code);
}.call();