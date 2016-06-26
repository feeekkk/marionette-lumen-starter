<?php

namespace App\Http\Repositories;

use App\Models\User;
use App\Http\Repositories\Interfaces\UserInterface;
use Illuminate\Support\Facades\Hash;

/**
 * Created by PhpStorm.
 * User: Feek
 * Date: 1/24/16
 * Time: 11:55 PM
 */
class UserRepository extends BaseRepository implements UserInterface
{

	public function __construct(User $user)
	{
		$this->model = $user;
	}

	/**
	 * returns user with profile and roles preloaded
	 * @param $id
	 * @return User
	 */
	public function getUserById($id)
	{
		return $this->model = User::with(['profile', 'roles'])->findOrFail($id);
	}

	/**
	 * @param $data
	 * @return static
	 */
	public function create($data) {
		$rawPassword = $data['password'];
		$hashed = Hash::make($rawPassword);
		$data['password'] = $hashed;

		$this->model = User::create($data);

		return $this->model;
	}
}