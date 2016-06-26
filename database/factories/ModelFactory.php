<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\Models\User::class, function(Faker\Generator $faker) {
	return [
		'email' => $faker->email(),
		'password' => $faker->password()
	];
});

$factory->define(App\Models\UserProfile::class, function(Faker\Generator $faker) {
	$max = new DateTime('today');

	return [
		'first_name' => $faker->firstName,
		'last_name' => $faker->lastName,
		'phone_number' => substr(str_replace(['(', ')', '.', '-', 'x', '+'], '', $faker->phoneNumber), 0, 10), // hacky because of faker's randomness in phone number generation
		'date_of_birth' => $faker->date('Y-m-d', $max)
	];
});