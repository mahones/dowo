import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
// import { Button } from '@/components/ui/button';
// import { Link } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Créer une tâche',
        href: '/taches/create',
    },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Créer une tâche" />
            <div className="w-8/12 p-4">
                <form action="" className="space-y-4">
                    <div className="gap-1.5">
                        <Label htmlFor="titre">Titre</Label>
                        <Input placeholder="Titre de la tâche"></Input>
                    </div>

                    <div className="gap-1.5">
                        <Label htmlFor="titre">Description</Label>
                        <Textarea placeholder="Description de la tâche"></Textarea>
                    </div>
                    <div className="gap-1.5">
                        
                    </div>
                    <Button type="submit">
                        Enregistrer une tâche
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}