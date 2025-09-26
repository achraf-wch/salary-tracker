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
        Schema::create('cat_goals', function (Blueprint $table) {
             $table->id('id_cat_goal');
              $table->foreignId('id_client')->constrained('clients','id_client');
             $table->foreignId('id_category')->constrained('categories','id_category');
            $table->float('cat_custom');
            $table->float('cat_save');
           
        
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cat_goals');
    }
};
