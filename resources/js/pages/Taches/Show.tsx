// Importation des composants nécessaires pour l'affichage du détail d'une tâche
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';
import type { Tache } from '@/types/Tache';

// Définition du fil d'Ariane (breadcrumbs) pour la navigation
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Détail de la tâche',
        href: '/taches/detail',
    },
];



// Définition du type des propriétés attendues par le composant Show
interface ShowProps {
    tache: Tache;
}


// Composant d'affichage du détail d'une tâche
const Show: React.FC<ShowProps> = ({ tache }) => {
    // Affiche dans la console le nom de l'utilisateur associé à la tâche (pour debug)
    console.log('Tâche:', tache.user.name);
    return (
        <>
            {/* Layout principal avec fil d'Ariane */}
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Créer une tâche" />
                <div className="w-8/12 p-4">
                    {/* Liste des informations détaillées de la tâche */}
                    <ul className="space-y-2">
                        {/* Affichage du nom de l'utilisateur associé à la tâche */}
                        <li>
                            <strong>Utilisateur :</strong> {tache.user ? tache.user.name : 'Non défini'}
                        </li>
                        {/* Affichage du titre de la tâche */}
                        <li>
                            <strong>Titre :</strong> {tache.titre}
                        </li>
                        {/* Affichage de la description de la tâche */}
                        <li>
                            <strong>Description :</strong> {tache.description}
                        </li>
                        {/* Affichage de la priorité */}
                        <li>
                            <strong>Priorité :</strong> {tache.priorite}
                        </li>
                        {/* Affichage de la date d'échéance */}
                        <li>
                            <strong>Échéance :</strong> {tache.date_echeance}
                        </li>
                        {/* Affichage de l'état de complétion */}
                        <li>
                            <strong>Complétée :</strong> {tache.est_complete ? 'Oui' : 'Non'}
                        </li>
                        {/* Affichage du caractère récurrent de la tâche */}
                        <li>
                            <strong>Récurrente :</strong> {tache.est_recurrente ? 'Oui' : 'Non'}
                        </li>
                        {/* Affichage du temps passé sur la tâche */}
                        <li>
                            <strong>Temps passé :</strong> {tache.temps_passe ?? 0} min
                        </li>
                    </ul>
                </div>
            </AppLayout>
        </>
    );
};

export default Show;
