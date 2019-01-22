!function () {
  var view = document.querySelector('#topNavBar');
  var controller = {
    view: null,
    init: function (view) {
      this.view = view;
      this.bindEvents();
    },
    bindEvents: function () {
      var view = this.view;
      window.addEventListener('scroll', () => {
        if (scrollY > 0) {
          this.active();
        } else {
          this.deActive();
        }
      });
    },
    active: function () {
      this.view.classList.add('sticky')
    },
    deActive: function () {
      this.view.classList.remove('sticky')
    }
  };
  controller.init(view);

}.call();