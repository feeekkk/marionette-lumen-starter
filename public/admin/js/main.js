/**
 * Created by Feek on 3/16/16.
 */
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
	'shared/js/models/User',
	'shared/js/models/Session',
	'util/Router',
	'foundation',
	'foundationMediaQuery'
], function (
	app,
	Backbone,
	RootView,
	Controller,
	User,
	Session,
	Router
) {
	$(document).foundation();

	app.on('start', function() {
		app.rootView = new RootView();
		app.session = new Session();
		app.user = User.findOrCreate({}, { useStorage: true });

		var controller = new Controller({
			rootView: app.rootView
		});

		app.rootView.render();
		app.router = new Router({ controller: controller });

		// subscribe to error codes
		$.ajaxSetup({
			statusCode: {
				401 : function() {
					app.router.navigate('admin/login', { trigger: true });
				},
				403 : function() {
					app.router.navigate('admin/login', { trigger: true });
				}
			}
		});
	});

	app.start();

	Backbone.history.start({
		pushState: true
	});
	
});
