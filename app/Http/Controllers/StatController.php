<?php
/**
 * Created by PhpStorm.
 * User: Feek
 * Date: 6/26/16
 * Time: 10:09 PM
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StatController extends Controller
{
	public function getStats(Request $request) {
		return response()->json([
			'total_users' => 140,
			'users_today' => 12
		]);
	}
}