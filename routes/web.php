<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TacheController;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::resource('taches', TacheController::class)->only('index');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
