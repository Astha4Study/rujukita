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
        Schema::create('klinik', function (Blueprint $table) {
            $table->id();
            $table->string('nama_klinik');
            $table->enum('jenis_klinik', [
                'Umum',
                'Gigi',
                'THT',
                'Kulit',
                'Kandungan',
                'Anak',
                'Bedah',
                'Mata',
                'Saraf',
            ]);
            $table->string('alamat');
            $table->string('kota');
            $table->string('provinsi');
            $table->string('no_telepon');
            $table->string('email')->nullable();
            $table->text('deskripsi');
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->string('gambar')->nullable();
            $table->float('rating')->default(0);
            $table->integer('kapasitas_total')->default(0);
            $table->integer('kapasitas_tersedia')->default(0);

            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('klinik');
    }
};
