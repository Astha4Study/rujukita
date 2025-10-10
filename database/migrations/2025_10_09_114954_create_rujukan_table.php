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
        Schema::create('rujukan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pasien_id')->constrained('pasien')->onDelete('cascade');
            $table->foreignId('fasilitas_asal')->nullable()->constrained('fasilitas')->onDelete('set null');
            $table->foreignId('fasilitas_tujuan_id')->nullable()->constrained('fasilitas')->onDelete('set null');
            $table->foreignId('dibuat_oleh')->nullable()->constrained('users')->onDelete('set null');
            $table->date('tanggal_rujukan')->nullable();
            $table->text('alasan_rujukan')->nullable();
            $table->enum('status', ['Menunggu', 'Diterima', 'Ditolak', 'Selesai'])->default('Menunggu');
            $table->text('catatan_tujuan')->nullable();
            $table->timestamps();

            $table->index(['fasilitas_tujuan_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rujukan');
    }
};
