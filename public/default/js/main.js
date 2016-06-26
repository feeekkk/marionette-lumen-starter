var basePath = '../../vendor/';
require.config({
	paths: {
		'jquery': 				basePath + 'jquery/dist/jquery',
		'underscore': 			basePath + 'underscore/underscore',
		'backbone': 			basePath + 'backbone/backbone',
		'backbone.wreqr': 		basePath + 'backbone.wreqr/lib/backbone.wreqr.min',
		'backboneRelational':	basePath + 'backbone-relational/backbone-relational',
		'marionette': 			basePath + 'marionette/lib/backbone.marionette',
		'foundation' : 			basePath + 'foundation-sites/js/foundation.core',
		'foundationMediaQuery':	basePath + 'foundation-sites/js/foundation.util.mediaQuery',
		'foundationEqualizer' : basePath + 'foundation-sites/js/foundation.equalizer',
		'foundationOffCanvas': 	basePath + 'foundation-sites/js/foundation.offcanvas',
		'foundationTooltip':	basePath + 'foundation-sites/js/foundation.tooltip',
		'foundationTriggers':	basePath + 'foundation-sites/js/foundation.util.triggers',
		'foundationMotion':		basePath + 'foundation-sites/js/foundation.util.motion',
		'foundationTimerAndImageLoader': basePath + 'foundation-sites/js/foundation.util.timerAndImageLoader',
		'modernizr' : 			basePath + 'modernizr/modernizr',
		'text': 				basePath + 'requirejs-text/text',
		'tpl': 					basePath + 'requirejs-tpl/tpl',
		'behaviors':			basePath + 'UsefulMarionetteViewBehaviors',
		'shared':				'../../shared',
		'nprogress':			basePath + 'nprogress/nprogress'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			exports: 'Backbone',
			deps: ['jquery', 'underscore']
		},
		backboneRelational: {
			exports: 'BackboneRelational',
			deps: ['backbone'],
		},
		marionette: {
			deps: ['backbone'],
			exports: 'Marionette'
		},
		foundation: {
			deps: ['jquery', 'modernizr'],
			exports: 'Foundation'
		},
		foundationMediaQuery: {
			deps: ['foundation']
		},
		foundationMotion: {
			deps: ['foundation']
		},
		foundationTriggers: {
			deps: ['foundation']
		},
		foundationTimerAndImageLoader: {
			deps: ['foundation']
		},
		foundationEqualizer: {
			deps: ['foundationMediaQuery', 'foundationTimerAndImageLoader']
		},
		foundationOffCanvas: {
			deps: ['foundationMediaQuery', 'foundationTriggers', 'foundationMotion']
		},
		foundationTooltip: {
			deps: ['foundationMediaQuery']
		}
	},
	deps: ['jquery', 'underscore']
});

require([
	'App',
	'backbone',
	'shared/js/views/RootView',
	'controllers/Controller',
	'util/Router',
	'shared/js/models/User',
	'shared/js/models/Session',
	'foundation',
	'foundationOffCanvas'
], function (
	app,
	Backbone,
	RootView,
	Controller,
	Router,
	User,
	Session
) {
	$(document).foundation();

	// add animatecss function to jquery
	$.fn.extend({
		animateCss: function (animationName, callback, removeAnimateClass) {
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			$(this).addClass('animated ' + animationName).one(animationEnd, function() {
				if (removeAnimateClass) {
					$(this).removeClass('animated ' + animationName);
				}

				if (callback) {
					callback();
				}
			});
		}
	});

	app.on('start', function() {
		app.rootView = new RootView();
		app.session = new Session();
		app.user = User.findOrCreate({});
		app.rootView.render();

		var controller = new Controller({
			rootView: app.rootView
		});

		app.router = new Router({
			controller: controller
		});
	});

	app.start();
	Backbone.history.start({
		pushState: true
	});
});