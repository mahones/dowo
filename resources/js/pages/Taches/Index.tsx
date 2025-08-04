// Importation des composants UI, hooks et utilitaires nécessaires pour la page d'index des tâches
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { useTacheStore } from '@/store/FiltreTache';
import { type BreadcrumbItem } from '@/types';
import { Tache } from '@/types/Tache';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, usePage } from '@inertiajs/react';
import { SquarePen, Trash2, View } from 'lucide-react';

import React from 'react';

// Définition du fil d'Ariane (breadcrumbs)
// Définition du fil d'Ariane (breadcrumbs) pour la navigation
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Taches',
        href: '/taches',
    },
];

// Définition du type des propriétés de la page
// Définition du type des propriétés attendues par la page (liste des tâches)
type PageProps = {
    taches: Tache[];
};

export default function Index() {
    // Récupère la liste des tâches envoyée par le backend via les props de la page
    const { taches } = usePage<PageProps>().props;

    // Récupère le filtre courant (priorité) et la fonction pour le modifier depuis le store Zustand
    const { filtre, setFiltre } = useTacheStore();

    /**
     * Filtrage des tâches selon la priorité sélectionnée dans le select.
     * Si "toutes" est sélectionné, on retourne toutes les tâches.
     * Sinon, on filtre selon la priorité choisie (basse, moyenne, haute).
     */
    const tachesFiltrees = React.useMemo(() => {
        if (filtre.priorite === 'toutes') return taches;
        return taches.filter((t) => t.priorite === filtre.priorite);
    }, [taches, filtre.priorite]);

    /**
     * Fonction pour supprimer une tâche après confirmation utilisateur.
     * Utilise Inertia pour envoyer la requête de suppression au backend.
     * @param tache La tâche à supprimer
     */
    const handlDelete = (tache: Tache) => {
        if (confirm('Supprimer cette tâche ?')) {
            Inertia.delete(route('taches.destroy', tache.id), {
                preserveScroll: true,
            });
        }
    };

    // Rendu du composant principal de la page d'index des tâches
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* Titre de la page et bouton de création */}
            <Head title="taches" />
            <div className="p-4">
                {/* Bouton pour accéder à la page de création d'une nouvelle tâche */}
                <Link href={route('taches.create')}>
                    <Button>Creer une tache</Button>
                </Link>
                {/* Sélecteur de priorité pour filtrer dynamiquement la liste des tâches */}
                <div className="mt-4 flex justify-between gap-4 ">
                    <h1 className="mb-4 text-2xl font-bold">Liste des Taches</h1>
                </div>
                <div className="flex justify-between mb-4">
                    <div>

                    </div>
                    <div>
                        <Label htmlFor="priorite">Filtrer par priorité</Label>
                        <Select
                            value={filtre.priorite}
                            onValueChange={(value) => setFiltre({ priorite: value as 'toutes' | 'basse' | 'moyenne' | 'haute' })}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Priorité" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="toutes">Toutes</SelectItem>
                                <SelectItem value="basse">Basse</SelectItem>
                                <SelectItem value="moyenne">Moyenne</SelectItem>
                                <SelectItem value="haute">Haute</SelectItem>
                            </SelectContent>
                        </Select> 
                    </div>
                       
                    </div>

                {/* Tableau affichant la liste des tâches filtrées selon la priorité */}
                <Table>
                    <TableCaption>Liste des tâches récentes.</TableCaption>
                    <TableHeader>
                        <TableRow className="bg-gray-200">
                            {/* En-tête du tableau */}
                            <TableHead className="w-[100px]">Titre de la tache</TableHead>
                            <TableHead>Priorité</TableHead>
                            <TableHead>Etat de la tache</TableHead>
                            <TableHead>Utilisateur</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* Parcours de la liste des tâches filtrées pour affichage */}
                        {tachesFiltrees.map((tache) => (
                            <TableRow key={tache.id}>
                                {/* Affichage du titre de la tâche */}
                                <TableCell className="font-medium">{tache.titre}</TableCell>
                                {/* Affichage de la priorité */}
                                <TableCell>{tache.priorite}</TableCell>
                                {/* Affichage de l'état de complétion */}
                                <TableCell>{tache.est_complete ? 'Terminer' : 'En cours'}</TableCell>
                                {/* Affichage du nom de l'utilisateur associé */}
                                <TableCell>{tache.user.name}</TableCell>
                                <TableCell className="flex justify-end gap-4">
                                    {/* Bouton pour voir le détail de la tâche */}
                                    <Link href={route('taches.show', tache.id)}>
                                        <Button className="rounded bg-green-500 font-bold text-white hover:bg-green-600">
                                            <View />
                                        </Button>
                                    </Link>
                                    {/* Bouton pour éditer la tâche */}
                                    <Link href={route('taches.edit', tache.id)}>
                                        <Button className="rounded bg-blue-500 font-bold text-white hover:bg-blue-600">
                                            <SquarePen />
                                        </Button>
                                    </Link>
                                    {/* Bouton pour supprimer la tâche (avec confirmation) */}
                                    <Button className="rounded bg-red-500 font-bold text-white hover:bg-red-600" onClick={() => handlDelete(tache)}>
                                        <Trash2 />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
