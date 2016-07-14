import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'api',
  host: 'http://localhost:8080',
  headers: Ember.computed(function() {
    return {
      'API_KEY': '1234'
    };
  })
});
