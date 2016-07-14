import Ember from 'ember';

const { $, Controller } = Ember;

export default Controller.extend({
  loginFailed: false,

  actions: {
    signIn() {
      let email = this.get('email');
      let password = this.get('password');
      let transition = () => this.transitionToRoute('/');

      $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/signIn',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        email: email,
        password: password,
        beforeSend: function (xhr) {
          xhr.setRequestHeader ("Authorization", "Basic " + btoa(email + ":" + password));
        }
      }).then((data) => {
        window.location.href = '/';
        return data;
      });
    }
  }
});
