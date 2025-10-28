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
        Schema::create('dokter', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('fasilitas_id')->constrained('fasilitas')->onDelete('cascade');
            $table->enum('spesialis', ['Umum', 'Anak', 'Kandungan', 'Bedah', 'Gigi', 'Mata', 'Jantung', 'Kulit', 'Saraf', 'Lainnya']);
            $table->enum('status', ['available', 'tidak tersedia'])->default('available');
            $table->integer('antrian_saat_ini')->default(0);
            $table->integer('max_antrian_per_hari')->default(7);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokter');
    }
};
