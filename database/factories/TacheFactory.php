<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tache>
 */
class TacheFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            
            'user_id' => '1',
            'titre' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'priorite' => $this->faker->randomElement(['basse', 'moyenne', 'haute']),
            'date_echeance' => $this->faker->dateTimeBetween('now', '+1 month'),
            'est_complete' => $this->faker->boolean(),
            'est_recurrente' => $this->faker->boolean(),
            'repetition' => $this->faker->randomElement(['journalière', 'hebdomadaire', 'mensuelle', null]),
            'temps_passe' => $this->faker->numberBetween(0, 120), // Temps passé en minutes
        ];
    }
}
