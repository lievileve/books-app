<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Author>
 */
class AuthorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
public function definition()
    {
        $authors = [
            'J.R.R. Tolkien',
            'George R.R. Martin',
            'Ursula K. Le Guin',
            'Brandon Sanderson',
            'Robin Hobb'
        ];

        return [
            'name' => $this->faker->unique()->randomElement($authors),
            
        ];
    }
}
