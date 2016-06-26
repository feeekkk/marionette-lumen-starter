<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('users', function(Blueprint $table) {
		   $table->increments('id');
		   $table->string('email')->unique();
		   $table->string('password');
		   $table->timestamps();
	   });

	    Schema::create('user_profiles', function(Blueprint $table) {
		    $table->string('first_name');
		    $table->string('last_name');
		    $table->string('phone_number');
		    $table->date('date_of_birth');
		    $table->integer('user_id')->unsigned();
		    $table->timestamps();

		    $table->foreign('user_id')
			    ->references('id')->on('users')
			    ->onDelete('cascade');
	    });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users');
	    Schema::drop('user_profiles');
    }
}
