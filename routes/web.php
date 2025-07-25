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
    Route::get('taches', [TacheController::class, 'index'])->name('taches.index');
    Route::get('taches/create', [TacheController::class, 'create'])->name('taches.create');
});


Route::resource('lister-taches', TacheController::class)->only(['index']);
Route::resource('afficher-taches', TacheController::class)->only(['show']);
// Route::resource('taches', TacheController::class)->except(['index', 'show']);


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
