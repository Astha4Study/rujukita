<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('catatan_layanan', function (Blueprint $table) {
            $table->foreignId('resep_id')->nullable()->after('antrian_id')->constrained('resep')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('catatan_layanan', function (Blueprint $table) {
            $table->dropForeign(['resep_id']);
            $table->dropColumn('resep_id');
        });
    }
};
