import { useForm } from '@inertiajs/react';
import React from 'react';
// PageProps n'existe pas, on utilise directement les props typés

type Tache = {
    id: number;
    titre: string;
    description?: string;
    priorite: string;
    date_echeance?: string;
};

interface EditProps {
    tache: Tache;
}

const Edit: React.FC<EditProps> = ({ tache }) => {
    const { data, setData, put, processing, errors } = useForm({
        titre: tache.titre,
        description: tache.description || '',
        priorite: tache.priorite,
        date_echeance: tache.date_echeance || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('taches.update', tache.id));
    };

    return (
        <div className="mx-auto mt-10 max-w-xl">
            <h1 className="mb-4 text-2xl font-bold">Modifier la tâche</h1>
            <form onSubmit={handleSubmit} className="space-y-4 rounded bg-white p-6 shadow">
                <div>
                    <label>Titre</label>
                    <input type="text" value={data.titre} onChange={(e) => setData('titre', e.target.value)} className="w-full rounded border p-2" />
                    {errors.titre && <div className="text-sm text-red-500">{errors.titre}</div>}
                </div>

                <div>
                    <label>Description</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="w-full rounded border p-2"
                    />
                </div>

                <div>
                    <label>Priorité</label>
                    <select value={data.priorite} onChange={(e) => setData('priorite', e.target.value)} className="w-full rounded border p-2">
                        <option value="basse">Basse</option>
                        <option value="moyenne">Moyenne</option>
                        <option value="haute">Haute</option>
                    </select>
                </div>

                <div>
                    <label>Date d’échéance</label>
                    <input
                        type="date"
                        value={data.date_echeance}
                        onChange={(e) => setData('date_echeance', e.target.value)}
                        className="w-full rounded border p-2"
                    />
                </div>

                <button type="submit" disabled={processing} className="rounded bg-green-600 px-4 py-2 text-white">
                    Modifier
                </button>
            </form>
        </div>
    );
};

export default Edit;
