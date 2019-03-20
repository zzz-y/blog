!function () {
  setTimeout(function () {
    siteWelcome.classList.remove('active');
    findClosestAndRemoveOffset();
  }, 1000);

  let specialTags = document.querySelectorAll('[data-x]');
  for (let i = 0; i < specialTags.length; i++) {
    specialTags[i].classList.add('offset');
  }

  findClosestAndRemoveOffset();
  window.addEventListener('scroll', () => {
    findClosestAndRemoveOffset();
  });

  function findClosestAndRemoveOffset() {
    let minIndex = 0;
    for (let i = 0; i < specialTags.length; i++) {
      if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
        minIndex = i;
      }
    }
    specialTags[minIndex].classList.remove('offset');
    let li = document.querySelector('a[href="#' + specialTags[minIndex].id + '"]').parentNode;
    let brother = li.parentNode.children;
    for (let i = 0; i < brother.length; i++) {
      brother[i].classList.remove('highlight');
    }
    li.classList.add('highlight');

  }

}.call();