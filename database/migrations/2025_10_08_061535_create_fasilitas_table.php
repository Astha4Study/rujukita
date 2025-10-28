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
        Schema::create('fasilitas', function (Blueprint $table) {
            $table->id();
            $table->string('nama_fasilitas');
            $table->enum('jenis_fasilitas', ['Rumah Sakit Umum', 'Klinik', 'Puskesmas', 'Dokter Mandiri']);
            $table->string('alamat');
            $table->string('kota');
            $table->string('provinsi');
            $table->string('no_telepon');
            $table->string('email')->nullable();
            $table->integer('kapasitas_total')->default(0);
            $table->integer('kapasitas_tersedia')->default(0);
            $table->enum('spesialisasi', [
                'Umum',
                'Anak',
                'Kandungan',
                'Bedah',
                'Gigi',
                'Mata',
                'Jantung',
                'Kulit',
                'Saraf',
                'Lainnya',
            ]);
            $table->text('deskripsi')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->string('gambar')->nullable();
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fasilitas');
    }
};
