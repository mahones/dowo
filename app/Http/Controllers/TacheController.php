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
        return Inertia::render('Taches/Index', [
            'taches' => $taches,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Taches/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTacheRequest $request)
    {
        $validated = $request->validated([
            'titre' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priorite' => 'required|in:basse,moyenne,haute',
            'date_echeance' => 'nullable|date',
            'est_complete' => 'boolean',
            'est_recurrente' => 'boolean',
            'repetition' => 'nullable|string',
            'temps_passe' => 'nullable|integer',
        ]);

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
        return Inertia::render('Taches/Show', [
            'tache' => $tache,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tache $tache)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTacheRequest $request, Tache $tache)
    {
        $validated = $request->validated([
            'titre' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'priorite' => 'sometimes|in:basse,moyenne,haute',
            'date_echeance' => 'sometimes|date',
            'est_complete' => 'sometimes|boolean',
            'est_recurrente' => 'sometimes|boolean',
            'repetition' => 'sometimes|nullable|string',
            'temps_passe' => 'sometimes|nullable|integer',
        ]);

        $tache->update($validated);
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
