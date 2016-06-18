import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    createItem() {
      let item = this.store.createRecord('item', {
        author: 'claudia',
        food: 'broccoli'
      });
      item.save();
    }
  }
});
