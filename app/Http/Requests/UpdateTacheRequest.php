<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTacheRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Autorise tous les utilisateurs connectés à mettre à jour une tâche
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'titre' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priorite' => 'required|in:basse,moyenne,haute',
            'date_echeance' => 'nullable|date',
            'est_complete' => 'boolean',
            'est_recurrente' => 'boolean',
            'repetition' => 'nullable|string',
            'temps_passe' => 'nullable|integer',
        ];
    }
}
