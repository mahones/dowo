import React from 'react';
// PageProps n'existe pas, on utilise directement les props typés

type User = {
    id: number;
    name: string;
};

type Tache = {
    id: number;
    user_id: number;
    titre: string;
    description?: string;
    priorite: string;
    date_echeance?: string;
    est_complete?: boolean;
    est_recurrente?: boolean;
    temps_passe?: number;
    user: User; // Ajout de l'utilisateur
};

interface ShowProps {
    tache: Tache;
}

const Show: React.FC<ShowProps> = ({ tache }) => {
    return (
        <div className="mx-auto mt-10 max-w-xl rounded bg-white p-4 shadow">
            <h1 className="mb-4 text-2xl font-bold">Détail de la tâche</h1>
            <ul className="space-y-2">
                <li>
                    <strong>Utilisateur :</strong> {tache.user ? tache.user.name : 'Non défini'}
                </li>
                <li>
                    <strong>Titre :</strong> {tache.titre}
                </li>
                <li>
                    <strong>Description :</strong> {tache.description}
                </li>
                <li>
                    <strong>Priorité :</strong> {tache.priorite}
                </li>
                <li>
                    <strong>Échéance :</strong> {tache.date_echeance}
                </li>
                <li>
                    <strong>Complétée :</strong> {tache.est_complete ? 'Oui' : 'Non'}
                </li>
                <li>
                    <strong>Récurrente :</strong> {tache.est_recurrente ? 'Oui' : 'Non'}
                </li>
                <li>
                    <strong>Temps passé :</strong> {tache.temps_passe ?? 0} min
                </li>
            </ul>
        </div>
    );
};

export default Show;
