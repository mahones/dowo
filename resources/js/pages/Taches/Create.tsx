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
import { Head, useForm } from '@inertiajs/react';
import { ChevronDownIcon } from 'lucide-react';
import React from 'react';
// import { Button } from '@/components/ui/button';
// import { Link } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Créer une tâche',
        href: '/taches/create',
    },
];

export default function Create() {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const { data, setData, post } = useForm({
        titre: '',
        description: '',
        priorite: '',
        date_echeance: '',
        est_complete: false,
        est_recurrente: false as boolean,
        repetition: '',
        temps_passe: 0,
    });
    const handleSubmit = (e: React.FormEvent) => {
        console.log(data);

        e.preventDefault();
        post(route('taches.store'));
    };
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Créer une tâche" />
                <div className="w-8/12 p-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="titre">Titre</Label>
                            <Input id="titre" placeholder="Titre de la tâche" value={data.titre} onChange={(e) => setData('titre', e.target.value)} />
                        </div>
                        <div className="flex justify-between gap-4">
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

                            <div className="space-y-1.5">
                                <Label htmlFor="date">Date d'échéance</Label>
                                <div>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" id="date" className="w-48 justify-between font-normal">
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

                        <div className="space-y-1.5">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Description de la tâche"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                        </div>

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

                        <Button type="submit">Enregistrer une tâche</Button>
                    </form>
                </div>
            </AppLayout>
        </>
    );
}
