let $buttons = $('#buttonWrapper > button');
let $slides = $('#slides');
let $images = $slides.children('.img');
let current = 0;
let timer = setTimeInterval();

makeFakeSlides();
$slides.css({transform: 'translateX(-400px)'});
bindEvents();

document.addEventListener('visibilitychange', (e) => {
  if (document.hidden) {
    window.clearInterval(timer);
  } else {
    timer = setTimeInterval();
  }
})

function setTimeInterval() {
  return setInterval(() => {
    goToSlide(current + 1);
  }, 3000);
}

$('#previous').on('click', () => {
  goToSlide(x(current - 1));
});
$('#next').on('click', () => {
  goToSlide(x(current + 1));
});

$('.container').on('mouseenter', () => {
  window.clearInterval(timer);
})
$('.container').on('mouseleave', () => {
  timer = setTimeInterval();
})

function x(n) {
  if (n > $buttons.length - 1) {
    n = 0;
  } else if (n < 0) {
    n = $buttons.length - 1;
  }
  console.log(n);
  return n
}

function makeFakeSlides() {
  let $firstCopy = $images.eq(0).clone(true);
  let $lastCopy = $images.eq($images.length - 1).clone(true);

  $slides.append($firstCopy);
  $slides.prepend($lastCopy);
}

function bindEvents() {
  $('#buttonWrapper').on('click', 'button', (e) => {
    let $button = $(e.currentTarget);
    let index = $button.index();
    goToSlide(index);
  })
}

function goToSlide(index) {
  if (index > $buttons.length - 1) {
    index = 0;
  } else if (index < 0) {
    index = $buttons.length - 1;
  }
  if (current === $buttons.length - 1 && index === 0) {
    $slides.css({transform: `translateX(-${($buttons.length + 1) * 400}px)`})
      .one('transitionend', () => {
        $slides.hide().offset();
        $slides.css({transform: `translateX(-${(index + 1) * 400}px)`}).show();
      });
  } else if (index === $buttons.length - 1 && current === 0) {
    $slides.css({transform: 'translateX(0px)'})
      .one('transitionend', () => {
        $slides.hide().offset();
        $slides.css({transform: `translateX(-${(index + 1) * 400}px)`}).show();
      });
  } else {
    $slides.css({transform: `translateX(-${(index + 1) * 400}px)`});
  }
  current = index;
}