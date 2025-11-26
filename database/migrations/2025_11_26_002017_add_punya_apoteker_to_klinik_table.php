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
        Schema::table('klinik', function (Blueprint $table) {
            $table->boolean('punya_apoteker')->default(false)->after('kapasitas_tersedia');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('klinik', function (Blueprint $table) {
            $table->dropColumn('punya_apoteker');
        });
    }
};
