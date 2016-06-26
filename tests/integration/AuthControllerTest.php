<?php

/**
 * Created by PhpStorm.
 * User: Feek
 * Date: 4/3/16
 * Time: 3:48 PM
 */
class AuthControllerTest extends TestCase
{
	protected $rawPassword;
	protected $user;

	function setUp()
	{
		parent::setUp();

		$this->token = $this->utils->generateTokenForUser(\App\Models\User::find(1));
		$this->authHeader = ['Authorization' => 'Bearer ' . $this->token];

		$faker = \Faker\Factory::create();
		$data = [
			'email' => $faker->email,
			'password' => $faker->password,
			'name' => 'first last',
			'phone_number' => '1231231234'
		];
		$this->rawPassword = $data['password'];
		$this->post('/user', $data, $this->authHeader);
		$this->user = \App\Models\User::whereEmail($data['email'])->first();
	}

	function testUserCanLogin() {
		$this->assertNotNull($this->user, 'user was unable to be made by the user create endpoint');

		$this->post('auth/login', [
			'email' => $this->user->email,
			'password' => $this->rawPassword
		]);

		$this->seeJsonStructure([
			'token'
		]);
	}

	function testIncorrectLoginFails() {
		$this->post('auth/login', [
			'email' => 'test@test.com',
			'password' => 'asdfdasdfea'
		]);

		$this->seeJson([
			'user_not_found'
		]);
	}
}