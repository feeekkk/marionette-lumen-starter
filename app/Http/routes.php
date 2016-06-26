<?php

$app->get('/', function () use ($app) {
    return 'sup pluto';
});

$app->group(['prefix' => 'user', 'namespace' => 'App\Http\Controllers'], function($app) {
	$app->post('', 'UserController@create');
	$app->put('{id}', 'UserController@update');
	$app->get('', ['middleware' => 'jwt-auth', 'uses' => 'UserController@getFromToken']);
});

// todo: admin middleware asserting user has role before doing request.
$app->group(['prefix' => 'admin', 'middleware' => 'jwt-auth', 'namespace' => 'App\Http\Controllers'], function($app) {
	$app->get('stats', 'StatController@getStats');
});

$app->group(['prefix' => 'auth', 'namespace' => 'App\Http\Controllers'], function($app) {
	$app->post('login', 'AuthController@login');
});

$app->get('/environment', function() use ($app) {
	return $app->environment();
});

$app->get('/stripe/key', function() use ($app) {
	return response()->json([
		'key' => env('STRIPE_KEY')
	]);
});

if ($app->environment() !== 'production') {
	$app->group(['prefix' => 'logs', 'namespace' => '\Rap2hpoutre\LaravelLogViewer'], function ($app) {
		$app->get('', 'LogViewerController@index');
	});
}
