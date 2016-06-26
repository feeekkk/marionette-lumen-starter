<?php
/**
 * Created by PhpStorm.
 * User: Feek
 * Date: 1/26/16
 * Time: 8:12 PM
 */

namespace App\Exceptions;


class InvalidPermissionException extends APIException
{
	public function __construct($message = 'You do not have permission to access this resource.', $code = 403)
	{
		$this->code = $code;
		$this->message = $message;
	}
}