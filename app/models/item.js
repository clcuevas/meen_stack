import DS from 'ember-data';

export default DS.Model.extend({
  author: DS.attr('string'),
  food: DS.attr('string')
});
