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
        Schema::create('progress', function (Blueprint $table) {
            $table->id('id_progress');
            $table->foreignId('id_client')->constrained('clients','id_client');
            $table->foreignId('id_goal')->constrained('goals','id_goal');
            $table->foreignId('id_date')->constrained('dates','id_date');
             $table->foreignId('id_cat_goal')->constrained('cat_goals','id_cat_goal');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('progress');
    }
};
