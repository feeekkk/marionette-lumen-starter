/**
 * Created by Feek on 6/26/16.
 */
define([
	'marionette',
	'behaviors/Modal',
	'tpl!templates/greeting-modal.html'
], function (
	Mn,
	Modal,
	tpl
) {
	var GreetingModalView = Mn.ItemView.extend({
		template: tpl,

		templateHelpers: function () {
			return {}
		},

		behaviors: {
			Modal: {
				behaviorClass: Modal
			},
		},

		events: {
		},

		ui: {
		},

		initialize: function( options) {
		}
	});

	return GreetingModalView;
});
