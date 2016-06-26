/**
 * Created by Feek on 3/16/16.
 */
define([
	'marionette',
	'shared/js/views/LoginView',
	'shared/js/views/HeaderView',
	'views/StatView',
	'App'
], function (
	Marionette,
	LoginView,
	HeaderView,
	StatView,
	app
) {
	var Controller = Marionette.Object.extend({
		initialize: function(options) {
			this.rootView = options.rootView;
		},

		showLogin: function() {
			this._showHeader();
			this.rootView.getRegion('main').show(new LoginView({
				model: app.user,
				loginSuccessCallback: function(response) {
					if (app.user.isAdmin()) {
						app.router.navigate('admin/dashboard', {trigger: true});
					} else {
						alert('it seems as if you are not an admin. If this is incorrect, please let someone know.');
					}
				}
			}));
		},

		showStatView: function() {
			this._showHeader();
			if (this.authorize()) {
				this.rootView.getRegion('main').show(new StatView());
			}
		},

		/**
		 * If the user is not logged in, redirect to login
		 * @return boolean whether or not authorized
		 */
		authorize: function() {
			if (!app.session.get('token')) {
				app.router.navigate('admin/login', {trigger: true});
				return false;
			}
			return true;
		},

		_showHeader: function() {
			app.rootView.getRegion('header').show(new HeaderView());
		}
	});

	return Controller;
});
