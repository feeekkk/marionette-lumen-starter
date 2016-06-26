<?php
/**
 * Created by PhpStorm.
 * User: Feek
 * Date: 12/26/15
 * Time: 7:01 PM
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\UserService;

class UserController extends Controller
{

	public function getFromToken(Request $request, UserService $userService) {
		$user = $request->user();
		$user = $userService->getUser($user->id);
		return compact('user');
	}

	/**
	 * @param Request $request
	 * @param UserService $service
	 * @return mixed
	 */
	public function create(Request $request, UserService $service) {
		$this->validate($request, [
			'email' => 'required|email',
			'first_name' => 'required|alpha',
			'last_name' => 'required|alpha',
			'phone_number' => 'required|digits:10',
			'date_of_birth' => 'required|date|isTwentyOne',
			'password' => 'required'
		]);

		$user = $service->create($request->input());

		return response()->json([
			'success' => true,
			'user' => $user
		]);
	}

	/**
	 * @param Request $request
	 * @param UserService $service
	 * @return mixed
	 */
	public function update(Request $request, UserService $service) {
		$this->validate($request, [
			'email' => 'email',
			'first_name' => 'alpha',
			'last_name' => 'alpha',
			'phone_number' => 'digits:10',
			'date_of_birth' => 'required|date'
		]);

		$user = $service->update($request->input());
		return response() ->json([
			'success' => true,
			'user' => $user
		]);
	}
}