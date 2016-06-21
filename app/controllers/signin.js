import Ember from 'ember';

const { $, Controller } = Ember;

export default Controller.extend({
  loginFailed: false,

  actions: {
    signIn() {
      let username = this.get('username');
      let password = this.get('password');

      $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/signin',
        dataType: 'json',
        async: true,
        beforeSend: function (xhr) {
          xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
        },
        success: function (data) {
          console.log(data);
          // Navigate to the 'index' route when a login
          // has been successful
          // transition();
          window.location.href = '/';
        }
      });
    }
  }
});
