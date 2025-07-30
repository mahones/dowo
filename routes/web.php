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
    Route::post('creer-taches', [TacheController::class, 'store'])->name('taches.store');
    Route::get('taches/{tache}', [TacheController::class, 'show'])->name('taches.show');
    Route::put('taches/{tache}', [TacheController::class, 'update'])->name('taches.update');
    Route::get('taches/{tache}/edit', [TacheController::class, 'edit'])->name('taches.edit');
    Route::delete('ville/{tache}', [TacheController::class, 'destroy'])->name('taches.destroy');

});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
