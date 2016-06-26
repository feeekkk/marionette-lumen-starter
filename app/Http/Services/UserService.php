<?php

namespace App\Http\Services;

use App\Http\Repositories\Interfaces\OrderInterface;
use App\Http\Repositories\Interfaces\UserInterface;

/**
 * Created by PhpStorm.
 * User: Feek
 * Date: 1/25/16
 * Time: 12:03 AM
 */
class UserService extends BaseService
{

	/**
	 * UserService constructor.
	 * Loads our $userRepo with the actual Repo associated with our userInterface
	 * @param userInterface $userRepo
	 */
	public function __construct(UserInterface $userRepo)
	{
		$this->repo = $userRepo;
	}

	/**
	 * @param $id
	 * @return mixed
	 */
	public function getUser($id) {
		return $this->repo->getUserById($id);
	}

	/**
	 * @param $data
	 * @return mixed
	 */
	public function create($data) {
		return $this->repo->create($data);
	}

	/**
	 * @param $data
	 * @return mixed
	 */
	public function update($data) {
		$user = $this->getUser($data['id']);
		return $this->repo->update($user, $data);
	}
}