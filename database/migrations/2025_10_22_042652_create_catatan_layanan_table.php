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
        Schema::create('catatan_layanan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pasien_id')->constrained('pasien')->onDelete('cascade');
            $table->foreignId('klinik_id')->constrained('klinik')->onDelete('cascade');
            $table->foreignId('dokter_id')->nullable()->constrained('dokter')->onDelete('set null');
            $table->foreignId('antrian_id')->nullable()->constrained('antrian')->onDelete('set null');

            $table->date('tanggal_kunjungan')->nullable();
            $table->text('keluhan')->nullable();
            $table->text('tindakan')->nullable();
            $table->text('catatan_lain')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catatan_layanan');
    }
};
