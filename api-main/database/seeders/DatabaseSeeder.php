<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

\app\Models\User::factory(1)->create(
    [
        'name' => 'Luke Skywalker',
        'email' => 'luke@jedi.com',
        'password'=>'1234',
        'email_verified_at' => null,
    ]
);
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            MenuSeeder::class,
            CitasSeeder::class,
        ]);
    }
   
}
