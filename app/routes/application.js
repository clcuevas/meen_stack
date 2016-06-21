import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  actions: {
    error(err, transition) {
      // If the user is not authorized, direct them
      // to the signin view
      if (err && (err.errors[0].status === '401')) {
        this.transitionTo('signin');
      }
    }
  }
});
