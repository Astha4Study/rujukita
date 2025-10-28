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
        Schema::create('antrian', function (Blueprint $table) {
            $table->id();
            $table->integer('nomor_antrian')->default(1);
            $table->foreignId('pasien_id')->constrained('pasien')->onDelete('cascade');
            $table->foreignId('dokter_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('fasilitas_id')->constrained('fasilitas')->onDelete('cascade');
            $table->foreignId('rekam_medis_id')->nullable()->constrained('rekam_medis')->onDelete('set null');
            $table->enum('spesialis', ['Umum', 'Anak', 'Kandungan', 'Bedah', 'Gigi', 'Mata', 'Jantung', 'Kulit', 'Saraf', 'Lainnya']);
            $table->text('keluhan')->nullable();
            $table->enum('status', ['Menunggu', 'Sedang Diperiksa', 'Selesai'])->default('Menunggu');
            $table->date('tanggal_kunjungan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('antrian');
    }
};
