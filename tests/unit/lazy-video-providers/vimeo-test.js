import Ember from 'ember';
import LazyVideoProviders from 'ember-lazy-video/services/lazy-video-providers';
import { module, test } from 'qunit';

var service;
var run = Ember.run;

module('Lazy Video Providers  Vimeo', {
  beforeEach: function() {
    service = LazyVideoProviders.create({
      vimeo: 'VIMEO'
    });
  },

  afterEach: function() {
    run(service, 'destroy');
    service = null;
  }
});

test('_getProvider from Vimeo based on `url`', function(assert) {
  var provider,
  expectedProvider;

  expectedProvider = 'VIMEO';

  provider = service._getProvider('https://vimeo.com/51771300');
  assert.equal(provider, expectedProvider);

  provider = service._getProvider('http://vimeo.com/51771300?pg=embed&sec=');
  assert.equal(provider, expectedProvider);

  assert.throws(function() {
    service._getProvider(null, 'something invalid');
  });
});

test('_getVideoId from Vimeo based on `url`', function(assert) {
  var videoId, expectedVideoId;

  expectedVideoId = '51771300';

  videoId = service._getVideoId('http://vimeo.com/51771300?pg=embed&sec=');
  assert.equal(videoId, expectedVideoId);

  videoId = service._getVideoId('https://vimeo.com/51771300');
  assert.equal(videoId, expectedVideoId);

  assert.throws(function() {
    service._getProvider(null, 'something invalid');
  });
});
