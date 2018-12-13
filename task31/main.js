let n;
init();

let size = $('.images > .img').length;
let timer = setTimeInterval();

document.addEventListener('visibilitychange', (e) => {
  if (document.hidden) {
    window.clearInterval(timer);
  } else {
    timer = setTimeInterval();
  }
})

function setTimeInterval() {
  return setInterval(() => {
    makeLeave(getImg(n))
      .one('transitionend', (e) => {
        makeEnter($(e.currentTarget));
      });
    makeCurrent(getImg(n + 1));
    n += 1;
  }, 3000);
}

function getImg(n) {
  return $(`.images > .img:nth-child(${x(n)})`);
}

function x(n) {
  if (n > size) {
    n = n % size
    if (n % size === 0) {
      n = size
    }
  }
  return n
}

function init() {
  n = 1;
  $(`.images > .img:nth-child(${n})`).addClass('current')
    .siblings().addClass('enter');
}

function makeCurrent($node) {
  return $node.removeClass('leave enter').addClass('current');
}

function makeLeave($node) {
  return $node.removeClass('current enter').addClass('leave');
}

function makeEnter($node) {
  return $node.removeClass('current leave').addClass('enter');
}