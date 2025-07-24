<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Tache extends Model
{
    /** @use HasFactory<\Database\Factories\TacheFactory> */
    use HasFactory;
    protected $fillable = [
        'user_id',
        'titre',
        'description',
        'priorite',
        'date_echeance',
        'est_complete',
        'est_recurrente',
        'repetition',
        'temps_passe',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
