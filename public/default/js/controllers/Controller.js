/**
 * Created by Feek on 3/16/16.
 */
define([
	'marionette',
	'shared/js/views/LoginView',
	'views/HomeView',
	'App'
], function (
	Marionette,
	LoginView,
	HomeView,
	app
) {
	var Controller = Marionette.Object.extend({
		initialize: function(options) {
			this.rootView = options.rootView;
		},

		showLogin: function() {
			this.rootView.getRegion('main').show(new LoginView({
				model: app.user,
				loginSuccessCallback: function(response) {
					if (app.user.isAdmin()) {
						app.router.navigate('/home', {trigger: true});
					} else {
						alert('it seems as if you are not an admin. If this is incorrect, please let someone know.');
					}
				}
			}));
		},

		showHome: function() {
			this.authorize();
			this.rootView.getRegion('main').show(new HomeView());
		},

		/**
		 * If the user is not logged in, redirect to login
		 * @return boolean whether or not authorized
		 */
		authorize: function() {
			if (!app.session.get('token')) {
				app.router.navigate('/login', {trigger: true});
				return false;
			}
			return true;
		}
	});

	return Controller;
});
