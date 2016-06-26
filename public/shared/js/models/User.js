define([
	'backbone',
	'backboneRelational',
	'shared/js/models/UserProfile',
	'shared/js/models/Role'
], function (
	Backbone,
	BackboneRelational,
	UserProfile,
	Role
) {
	var User = Backbone.RelationalModel.extend({
		urlRoot: '/api/user',

		relations: [
			{
				type: Backbone.HasOne,
				key: 'profile',
				relatedModel: UserProfile,
				includeInJSON: false
			},
			{
				type: Backbone.HasMany,
				key: 'roles',
				relatedModel: Role,
				includeInJSON: false
			}
		],

		parse: function(response, xhr) {
			return response.user;
		},

		defaults: {
			email: null
		},

		initialize: function(options) { },

		validate: function(attrs, options) {
			var errors = [];
			var defaultMessage = "This field is required";

			if (!attrs.email) {
				errors.push({
					attribute: 'email',
					message: 'please enter a valid email address'
				})
			}

			return errors.length > 0 ? errors : null;
		},

		isAdmin: function() {
			var roles = this.get('roles');
			if (roles && roles.find({	name : 'administrator'	})) {
				return true;
			}
			return false;
		}
	});

	return User;
});
