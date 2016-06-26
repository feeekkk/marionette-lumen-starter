<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\ServiceProvider;
use App\Http\Repositories\UserRepository;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
	    /*
	    |--------------------------------------------------------------------------
	    | validators
	    |--------------------------------------------------------------------------
	    |
	    | validators to be utilized throughout our app
	    |
	    */

	    /*
	    |--------------------------------------------------------------------------
	    | singleton bindings
	    |--------------------------------------------------------------------------
	    |
	    | because we like laravel facades :-)
	    |
	    */

	    $this->app->singleton('filesystem', function ($app) {
		    return $app->loadComponent('filesystems', 'Illuminate\Filesystem\FilesystemServiceProvider', 'filesystem');
	    });

	    $this->app->singleton('mailer', function ($app) {
		    $app->configure('services');
		    return $app->loadComponent('mail', 'Illuminate\Mail\MailServiceProvider', 'mailer');
	    });

	    /*
        |--------------------------------------------------------------------------
        | repository bindings
        |--------------------------------------------------------------------------
        |
        | yup.
        |
        */

		$this->app->bind('App\Http\Repositories\Interfaces\UserInterface', function($app)
		{
			return new UserRepository(new User());
		});
	}
}
