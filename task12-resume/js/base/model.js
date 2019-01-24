window.Model = function (options) {
  let { resourceName } = options;
  return {
    init:function () {
      var APP_ID = '47YYIHNtAo7sbN6Nloc3677S-gzGzoHsz';
      var APP_KEY = 'tqGlq1HMFa3McVgwdrgSk91c';

      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      });
    },
    fetch:function () {
      var query = new AV.Query(resourceName);
      return query.find();
    },
    save:function (object) {
      var Message = AV.Object.extend(resourceName);
      var message = new Message();
      return message.save(object);
    }
  }
};