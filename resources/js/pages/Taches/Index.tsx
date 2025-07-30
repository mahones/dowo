import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { SquarePen, Trash2, View } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Taches',
        href: '/taches',
    },
];
type User = {
    id: number;
    name: string;
};
type Tache = {
    id: number;
    titre: string;
    priorite: string;
    est_complete: boolean;
    temps_passe: number;
    user: User; // Ajout de l'utilisateur
};

type PageProps = {
    taches: Tache[];
};

export default function Index() {
    const { taches } = usePage<PageProps>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="taches" />
            <div className="p-4">
                <Link href={route('taches.create')}>
                    <Button>Creer une tache</Button>
                </Link>
                <div className="mt-4">
                    <h1 className="mb-4 text-2xl font-bold">Liste des Taches</h1>
                </div>

                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow className="bg-gray-200">
                            <TableHead className="w-[100px]">Titre de la tache</TableHead>
                            <TableHead>Priorité</TableHead>
                            <TableHead>Etat de la tache</TableHead>
                            <TableHead>Utilisateur</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {taches.map((tache) => (
                            <TableRow key={tache.id}>
                                <TableCell className="font-medium">{tache.titre}</TableCell>
                                <TableCell>{tache.priorite}</TableCell>
                                <TableCell>{tache.est_complete ? 'Terminer' : 'En cours'}</TableCell>
                                <TableCell>{tache.user.name}</TableCell>
                                <TableCell className="flex justify-end gap-4">
                                    <Link href={route('taches.show', tache.id)}>
                                        <Button className="rounded bg-green-500 font-bold text-white hover:bg-green-600">
                                            <View />
                                        </Button>
                                    </Link>
                                    <Link href={route('taches.edit', tache.id)}>
                                        <Button className="rounded bg-blue-500 font-bold text-white hover:bg-blue-600">
                                            <SquarePen />
                                        </Button>
                                    </Link>
                                    
                                        <Button className="rounded bg-red-500 font-bold text-white hover:bg-red-600"
                                        onClick={() => {
                                            if (confirm('Supprimer cette tâche ?')) {
                                                Inertia.delete(route('taches.destroy', tache.id), { preserveScroll: true });
                                            }
                                        }}
                                        >
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
