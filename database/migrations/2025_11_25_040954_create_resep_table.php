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
        Schema::create('resep', function (Blueprint $table) {
            $table->id();
            $table->foreignId('catatan_layanan_id')->constrained('catatan_layanan')->onDelete('cascade');
            $table->foreignId('apoteker_id')->nullable()->constrained('users')->onDelete('set null'); // apoteker
            $table->enum('status', ['pending', 'diproses', 'selesai'])->default('pending');
            $table->decimal('total_harga', 12, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resep');
    }
};
