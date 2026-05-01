<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('businesses', function (Blueprint $table) {
            $table->uuid()->primary();

            $table->string('name');
            $table->string('pan_no')->nullable()->unique();
            $table->string('phone_no', 10)->unique();
            $table->string('password');

            $table->boolean('status')->default('true');

            $table->boolean('is_phone_verified')->default(false);
            $table->datetime('phone_verified_at')->nullable();

            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('businesses');
    }
};
