define([
	'backbone'
], function (Backbone) {
	var stats = Backbone.Model.extend({
		urlRoot: '/api/admin/stats',

		defaults: {
			'total_users' : null,
			'users_today' : null
		}
	});

	return stats;
});
