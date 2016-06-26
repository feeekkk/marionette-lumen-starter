/**
 * Created by Feek on 6/26/16.
 */
define([
	'marionette',
	'views/OffCanvasView',
	'views/GreetingModalView',
	'shared/js/views/HeaderView',
	'behaviors/FoundationOffCanvas',
	'tpl!templates/home.html',
	'App'
], function (
	Mn,
	OffCanvasView,
	GreetingModalView,
	HeaderView,
	FoundationOffCanvas,
	tpl,
	app
) {
	var HomeView = Mn.ItemView.extend({
		template: tpl,

		templateHelpers: function () {
			return {
				name: app.user.get('profile').getFullName()
			}
		},

		behaviors: {
			FoundationOffCanvas: {
				behaviorClass: FoundationOffCanvas
			},
		},

		events: {
			'click @ui.openModal' : 'openModal',
			'click @ui.openOffCanvas' : 'openOffCanvas'
		},

		ui: {
			openModal : '.open-modal',
			openOffCanvas : '.open-canvas'
		},

		initialize: function( options) {
		},

		onShow: function() {
			app.rootView.getRegion('header').show(new HeaderView());
			app.rootView.getRegion('offCanvas').show(new OffCanvasView());
		},

		openModal: function(evt) {
			app.rootView.getRegion('modalRegion').show(new GreetingModalView());
		},

		openOffCanvas: function(evt) {
			this.triggerMethod('openOffCanvas', evt);
		}
	});

	return HomeView;
});
