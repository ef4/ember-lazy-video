import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';
import makeSubject from '../../helpers/make-subject';

var resolve = Ember.RSVP.resolve;
var run = Ember.run;

moduleForComponent('lazy-video', 'LazyVideoComponent', {
  unit: true,
  subject: makeSubject({
    providers: {
      getThumbnailUrl: function() {
        return resolve('http://example.com');
      }
    }
  })
});

test('it renders with correct style attribute', function(assert) {
  assert.expect(1);

  var component = this.subject({
    url: 'https://www.youtube.com/watch?v=gvdf5n-zI14'
  });

  run(function() {
    component.append();
  });

  var componentStyle = component.$().attr('style');
  assert.ok(/url\(http:\/\/example\.com\)/.test(componentStyle));
});
