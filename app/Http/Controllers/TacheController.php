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
     * Affiche la liste de toutes les tâches avec l'utilisateur associé.
     * Retourne la vue Inertia pour l'index des tâches.
     */
    public function index()
    {
        // Récupère toutes les tâches avec la relation user, triées par date de création décroissante
        $taches = Tache::with(relations: 'user')->latest()->get();
        // Retourne la vue Inertia avec la liste des tâches
        return Inertia::render('taches/Index', [
            'taches' => $taches,
        ]);
    }

    /**
     * Affiche le formulaire de création d'une nouvelle tâche.
     * Retourne la vue Inertia pour la création de tâche.
     */
    public function create()
    {
        return Inertia::render('taches/Create');
    }

    /**
     * Enregistre une nouvelle tâche en base de données.
     * Associe la tâche à l'utilisateur connecté.
     * Redirige vers l'index avec un message de succès.
     */
    public function store(StoreTacheRequest $request)
    {
        $validated = $request->validated();
        // Ajoute l'id de l'utilisateur connecté à la tâche
        $validated['user_id'] = auth()->id();

        // Crée la tâche en base de données
        Tache::create($validated);

        // Redirige vers l'index avec un message de succès
        return redirect()->route('taches.index')->with('success', 'Tâche créée avec succès.');
    }

    /**
     * Affiche le détail d'une tâche spécifique.
     * Si la tâche n'existe pas, redirige vers l'index avec un message d'erreur.
     * Retourne la vue Inertia pour l'affichage de la tâche.
     */
    public function show(Tache $tache)
    {
        if (!$tache){
            return redirect()->route('taches.index')->with('error', 'Tâche non trouvée.');
        }
        // Récupère la tâche avec la relation user
        $tache_user = Tache::with('user')->find($tache->id);
        return Inertia::render('taches/Show', [
            'tache' => $tache_user,
        ]);
    }

    /**
     * Affiche le formulaire d'édition d'une tâche existante.
     * Retourne la vue Inertia pour l'édition de la tâche.
     */
    public function edit(Tache $tache)
    {
        return Inertia::render('taches/Edit', [
            'tache' => $tache,
        ]);     
    }

    /**
     * Met à jour une tâche existante en base de données.
     * Redirige vers l'index avec un message de succès.
     */
    public function update(UpdateTacheRequest $request, Tache $tache)
    {
        $validated = $request->validated();
        $tache->update($validated);
        return redirect()->route('taches.index', $tache)->with('success', 'Tâche mise à jour avec succès.');
    }

    /**
     * Supprime une tâche de la base de données.
     * Redirige vers l'index avec un message de succès.
     */
    public function destroy(Tache $tache)
    {
        $tache->delete();
        return redirect()->route('taches.index')->with('success', 'Tâche supprimée.');
    }
}
