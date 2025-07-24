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
        Schema::create('taches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('titre');
            $table->text('description')->nullable();
            $table->enum('priorite', ['basse', 'moyenne', 'haute'])->default('moyenne');
            $table->date('date_echeance')->nullable();
            $table->boolean('est_complete')->default(false);
            $table->boolean('est_recurrente')->default(false);
            $table->string('repetition')->nullable(); // Ceci est pour la gestion des tâches récurrentes journalières, hebdomadaires, mensuelles, etc.
            $table->unsignedInteger('temps_passe')->nullable(); // Temps passé sur la tâche, en minutes ou secondes selon votre préférence
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('taches');
    }
};
