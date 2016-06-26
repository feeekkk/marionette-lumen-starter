/**
 * Created by Feek on 6/26/16.
 */
define([
	'marionette',
	'tpl!../../js/templates/header.html'
], function (
	Mn,
	tpl
) {
	var HeaderView = Mn.ItemView.extend({
		template: tpl,
		className: 'top-bar',

		templateHelpers: function () {
			return {}
		},

		events: {
		},

		ui: {
		},

		initialize: function( options) {
		}
	});

	return HeaderView;
});
