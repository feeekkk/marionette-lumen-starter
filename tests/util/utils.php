<?php
/**
 * Created by PhpStorm.
 * User: Feek
 * Date: 5/16/16
 * Time: 11:31 AM
 */

use App\Models\User;

class Utils extends TestCase {
	public function __construct() {
		parent::setUp();
	}

	public function generateTokenForUser(User $user) {
		return \Tymon\JWTAuth\Facades\JWTAuth::fromUser($user);
	}
}