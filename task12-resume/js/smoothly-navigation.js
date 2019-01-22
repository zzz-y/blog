!function () {
  let liTags = document.querySelectorAll('nav > ul > li');
  for (let i = 0; i < liTags.length; i++) {
    liTags[i].onmouseenter = function (e) {
      e.currentTarget.classList.add('active');
    };
    liTags[i].onmouseleave = function (e) {
      e.currentTarget.classList.remove('active');
    };
  }

  function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
  }

  requestAnimationFrame(animate);

  let aTags = document.querySelectorAll('nav > ul > li > a');
  for (let i = 0; i < aTags.length; i++) {
    aTags[i].onclick = function (e) {
      e.preventDefault();
      let top = document.querySelector(e.currentTarget.getAttribute('href')).offsetTop;

      let currentTop = window.scrollY;// 页面已滚动的距离
      let targetTop = top - 80;// 起始位置
      let s = targetTop - currentTop;
      let coords = {y: currentTop};
      let tween = new TWEEN.Tween(coords)
        .to({y: targetTop}, 1000)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(function () {
          window.scrollTo(0, coords.y);
        })
        .start(); // Start the tween immediately.
    };
  }
}.call();
