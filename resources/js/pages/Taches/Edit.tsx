// Importation des composants UI, hooks et types nécessaires pour la page d'édition de tâche
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { Tache } from '@/types/Tache';
import { Head, useForm } from '@inertiajs/react';
import { ChevronDownIcon } from 'lucide-react';
import React from 'react';

// Définition du fil d'Ariane (breadcrumbs) pour la navigation
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Modifier une tâche',
        href: '/taches/edit',
    },
];

// Définition du type des propriétés attendues par le composant Edit
interface EditProps {
    tache: Tache;
}

const Edit: React.FC<EditProps> = ({ tache }) => {
    // Gère l'ouverture du popover pour la sélection de date
    const [open, setOpen] = React.useState(false);
    // Stocke la date d'échéance sélectionnée (ou celle de la tâche si existante)
    const [date, setDate] = React.useState<Date | undefined>(tache.date_echeance ? new Date(tache.date_echeance) : undefined);
    // Hook useForm d'Inertia pour gérer le formulaire d'édition de la tâche
    const { data, setData, put, processing, errors } = useForm({
        titre: tache.titre,
        description: tache.description || '',
        priorite: tache.priorite,
        date_echeance: tache.date_echeance || '',
        est_complete: tache.est_complete,
        est_recurrente: tache.est_recurrente,
        repetition: tache.repetition || '',
        temps_passe: tache.temps_passe || 0,
    });

    /**
     * Soumission du formulaire d'édition de la tâche.
     * Envoie les données modifiées au backend via Inertia.
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('taches.update', tache.id));
    };

    // Rendu du composant d'édition de tâche
    return (
        <>
            {/* Layout principal avec fil d'Ariane */}
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Créer une tâche" />
                <div className="w-8/12 p-4">
                    {/* Formulaire d'édition de la tâche */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Champ de saisie du titre de la tâche */}
                        <div className="space-y-1.5">
                            <Label htmlFor="titre">Titre</Label>
                            <Input id="titre" placeholder="Titre de la tâche" value={data.titre} onChange={(e) => setData('titre', e.target.value)} />
                            {/* Affichage d'une erreur si le titre est invalide */}
                            {errors.titre && <div className="text-sm text-red-500">{errors.titre}</div>}
                        </div>
                        {/* Ligne de champs pour la priorité, la répétition et la date d'échéance */}
                        <div className="flex justify-between gap-4">
                            {/* Sélecteur de priorité */}
                            <div className="space-y-1.5">
                                <Label htmlFor="priorite">Priorité</Label>
                                <Select value={data.priorite} onValueChange={(value) => setData('priorite', value)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Priorité" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="basse">Basse</SelectItem>
                                        <SelectItem value="moyenne">Moyenne</SelectItem>
                                        <SelectItem value="haute">Haute</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Sélecteur de répétition */}
                            <div className="space-y-1.5">
                                <Label htmlFor="repetition">Répétition</Label>
                                <Select value={data.repetition} onValueChange={(value) => setData('repetition', value)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Répétition" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="quotidiennement">Quotidiennement</SelectItem>
                                        <SelectItem value="hebdomadairement">Hebdomadairement</SelectItem>
                                        <SelectItem value="mensuellement">Mensuellement</SelectItem>
                                        <SelectItem value="annuellement">Annuellement</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Sélecteur de date d'échéance avec calendrier */}
                            <div className="space-y-1.5">
                                <Label htmlFor="date">Date d'échéance</Label>
                                <div>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button disabled={processing} variant="outline" id="date" className="w-48 justify-between font-normal">
                                                {date ? date.toLocaleDateString('fr-FR') : 'Sélectionner une date'}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                captionLayout="dropdown"
                                                onSelect={(selectedDate) => {
                                                    setDate(selectedDate);
                                                    if (selectedDate) {
                                                        setData('date_echeance', selectedDate.toISOString().split('T')[0]);
                                                    }
                                                    setOpen(false);
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </div>

                        {/* Champ de saisie de la description de la tâche */}
                        <div className="space-y-1.5">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Description de la tâche"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                        </div>
                        {/* Cases à cocher pour la récurrence et l'état de complétion */}
                        <div className="justify-content-start flex gap-4">
                            {/* Checkbox pour indiquer si la tâche est récurrente */}
                            <div className="space-y-1.5">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="recurrence"
                                        checked={data.est_recurrente}
                                        onCheckedChange={(value) => setData('est_recurrente', !!value)}
                                    />
                                    <Label htmlFor="recurrence">Tâche récurrente</Label>
                                </div>
                            </div>
                            {/* Checkbox pour indiquer si la tâche est complétée */}
                            <div className="space-y-1.5">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="complete"
                                        checked={data.est_complete}
                                        onCheckedChange={(value) => setData('est_complete', !!value)}
                                    />
                                    <Label htmlFor="recurrence">Tâche complétée</Label>
                                </div>
                            </div>
                        </div>

                        {/* Bouton pour soumettre le formulaire et enregistrer les modifications */}
                        <Button type="submit">Modifier</Button>
                    </form>
                </div>
            </AppLayout>
        </>
    );
};

export default Edit;
