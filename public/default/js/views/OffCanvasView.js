/**
 * Created by Feek on 6/26/16.
 */
define([
	'marionette',
	'tpl!templates/off-canvas.html'
], function (
	Mn,
	tpl
) {
	var OffCanvasView = Mn.ItemView.extend({
		template: tpl,

		templateHelpers: function () {
			return {}
		},
		 /*
		behaviors: {
			Modal: {
				behaviorClass: Modal
			},
		},
		*/

		events: {
		},

		ui: {
		},

		initialize: function( options) {
		}
	});

	return OffCanvasView;
});
