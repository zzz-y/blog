!function () {
  var view = document.querySelector('section.message');
  var model = {
    // 获取数据
    fetch: function () {
      var query = new AV.Query('Message');
      return query.find();
    },
    // 保存数据
    save:function (content, name) {
      // 创建 TestObject 表
      var Message = AV.Object.extend('Message');
      // 在表中创建一行数据
      var message = new Message();
      // 数据内容是 words: 'Hello World!' 保存
      // 若保存成功，则运行 alert
      return message.save({
        content: content,
        name: name
      });
    },
    init: function () {
      var APP_ID = '47YYIHNtAo7sbN6Nloc3677S-gzGzoHsz';
      var APP_KEY = 'tqGlq1HMFa3McVgwdrgSk91c';

      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      });
    },
  };
  var controller = {
    view: null,
    model: null,
    messageList: null,
    messageForm: null,
    init: function (view, model) {
      this.view = view;
      this.model = model;
      this.messageList = this.view.querySelector('#messageList');
      this.messageForm = this.view.querySelector('#postMessageForm');
      this.model.init();
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
        if(content.length>0&&name.length>0){
          this.model.save(content, name).then(function (object) {
            let li = document.createElement('li');
            li.innerText = `${object.attributes.name}：${object.attributes.content}`;
            let messageList = document.querySelector('#messageList');
            messageList.append(li);
            messageForm.querySelector('input[name=content]').value = '';
          });
        } else {
          this.view.querySelector('#errorMessage').style.display = 'block';
          setTimeout(()=>{
            this.view.querySelector('#errorMessage').style.display = 'none';
          }, 3000)
        }
      });
    },
  };
  controller.init(view, model);
}();