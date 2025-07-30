<?php

namespace App\Http\Controllers;

use App\Models\Tache;
use App\Http\Requests\StoreTacheRequest;
use App\Http\Requests\UpdateTacheRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Laravel\Pail\ValueObjects\Origin\Console;

class TacheController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $taches = Tache::with('user')->latest()->get();
        return Inertia::render('taches/Index', [
            'taches' => $taches,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
        return Inertia::render('taches/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTacheRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id(); // Ajoute l'id de l'utilisateur connecté

        Tache::create($validated);

        return redirect()->route('taches.index')->with('success', 'Tâche créée avec succès.');
    }
    /**
     * Display the specified resource.
     */
    public function show(Tache $tache)
    {
        
        if (!$tache){
            return redirect()->route('taches.index')->with('error', 'Tâche non trouvée.');
        }
      
        return Inertia::render('taches/Show', [
            'tache' => $tache,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tache $tache)
    {
        return Inertia::render('taches/Edit', [
            'tache' => $tache,
        ]);     
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTacheRequest $request, Tache $tache)
    {
        $validated = $request->validated();
        $tache->update($validated);
        return redirect()->route('taches.index', $tache)->with('success', 'Tâche mise à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tache $tache)
    {
        $tache->delete();
        return redirect()->route('taches.index')->with('success', 'Tâche supprimée.');
    
    }
}
