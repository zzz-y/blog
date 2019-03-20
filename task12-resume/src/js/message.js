!function () {
  var view = View('section.message');
  var model = Model({resourceName: 'Message'});
  var controller = Controller({
    messageList: null,
    messageForm: null,
    init: function (view, model) {
      this.messageList = this.view.querySelector('#messageList');
      this.messageForm = this.view.querySelector('#postMessageForm');
      this.loadMessages();
      this.bindEvents();
    },
    loadMessages: function () {
      this.model.fetch().then((messages) => {
        // 成功获得实例
        let array = messages.map(d => d.attributes);
        array.forEach((item) => {
          let li = document.createElement('li');
          li.innerText = `${item.name}：${item.content}`;
          this.messageList.append(li);
        })
      });
    },
    bindEvents: function () {
      let messageForm = this.messageForm;
      messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let content = messageForm.querySelector('input[name=content]').value.trim();
        let name = messageForm.querySelector('input[name=name]').value.trim();
        if (content.length > 0 && name.length > 0) {
          this.model.save({content, name}).then(function (object) {
            let li = document.createElement('li');
            li.innerText = `${object.attributes.name}：${object.attributes.content}`;
            let messageList = document.querySelector('#messageList');
            messageList.append(li);
            messageForm.querySelector('input[name=content]').value = '';
          });
        } else {
          this.view.querySelector('#errorMessage').style.display = 'block';
          setTimeout(() => {
            this.view.querySelector('#errorMessage').style.display = 'none';
          }, 3000)
        }
      });
    },
  });
  controller.init(view, model);
}();