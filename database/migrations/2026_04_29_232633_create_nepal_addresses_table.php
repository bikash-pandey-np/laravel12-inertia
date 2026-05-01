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
        // 1. Provinces (e.g., Bagmati)
        Schema::create('provinces', function (Blueprint $table) {
            $table->id();
            $table->string('name_en');
            $table->string('name_np')->nullable();

            $table->timestamps();
        });

        // 2. Districts (e.g., Kathmandu)
        Schema::create('districts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('province_id')->constrained();
            $table->string('name_en');
            $table->string('name_np')->nullable();
            $table->timestamps();
        });

        // 3. Local Bodies (e.g., Kathmandu Metropolitan City)
        Schema::create('local_bodies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('district_id')->constrained();
            $table->string('name_en');
            $table->string('name_np')->nullable();
            $table->integer('ward_count');
            $table->enum('type', [
                'Metropolitan',
                'Sub-Metropolitan',
                'Municipality',
                'Rural-Municipality'
            ]);
            $table->timestamps();
        });

        // 4. Cities/Hubs (Specific market areas like Kalanki, Koteshwor)
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('local_body_id')->constrained();
            $table->string('name_en');
            $table->string('name_np')->nullable();
            $table->timestamps();
        });

        // 5. Addresses (Polymorphic table for Agents and Stops)
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('city_id')->constrained();
            $table->integer('ward_no');
            $table->string('tole_en');
            $table->string('tole_np')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
        Schema::dropIfExists('cities');
        Schema::dropIfExists('local_bodies');
        Schema::dropIfExists('districts');
        Schema::dropIfExists('provinces');
    }
};
