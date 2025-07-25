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

// // import React, { useState } from 'react';
// import { useForm } from '@inertiajs/react';

// export default function Create() {
//     const { data, setData, post, processing, errors } = useForm({
//         titre: '',
//         description: '',
//         priorite: 'moyenne',
//         date_echeance: '',
//     });

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         post(route('taches.store'));
//     };

//     return (
//         <div className="mx-auto mt-10 max-w-xl">
//             <h1 className="mb-4 text-2xl font-bold">Créer une tâche</h1>
//             <form onSubmit={handleSubmit} className="space-y-4 rounded bg-white p-6 shadow">
//                 <div>
//                     <label>Titre</label>
//                     <input type="text" value={data.titre} onChange={(e) => setData('titre', e.target.value)} className="w-full rounded border p-2" />
//                     {errors.titre && <div className="text-sm text-red-500">{errors.titre}</div>}
//                 </div>

//                 <div>
//                     <label>Description</label>
//                     <textarea
//                         value={data.description}
//                         onChange={(e) => setData('description', e.target.value)}
//                         className="w-full rounded border p-2"
//                     />
//                 </div>

//                 <div>
//                     <label>Priorité</label>
//                     <select value={data.priorite} onChange={(e) => setData('priorite', e.target.value)} className="w-full rounded border p-2">
//                         <option value="basse">Basse</option>
//                         <option value="moyenne">Moyenne</option>
//                         <option value="haute">Haute</option>
//                     </select>
//                 </div>

//                 <div>
//                     <label>Date d’échéance</label>
//                     <input
//                         type="date"
//                         value={data.date_echeance}
//                         onChange={(e) => setData('date_echeance', e.target.value)}
//                         className="w-full rounded border p-2"
//                     />
//                 </div>

//                 <button type="submit" disabled={processing} className="rounded bg-blue-600 px-4 py-2 text-white">
//                     Enregistrer
//                 </button>
//             </form>
//         </div>
//     );
// }
