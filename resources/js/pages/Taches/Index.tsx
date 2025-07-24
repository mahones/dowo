import React from 'react';
// PageProps n'existe pas, on utilise directement les props typés
// import { Link } from '@inertiajs/react';

type Tache = {
    id: number;
    user_id: number;
    titre: string;
    description: string;
    priorite: string;
    date_echeance?: string;
    est_complete?: boolean;
    est_recurrente?: boolean;
    temps_passe?: number;
};

interface ListeProps {
    taches: Tache[];
}

const Index: React.FC<ListeProps> = ({ taches }) => {
    return (

        <div>
            <h1>Hello World</h1>
            { taches.map((tache:Tache) =>(
                <div>
                    <p>{tache.id}</p>
                    <p>This is another paragraph. {tache.titre}</p>
                    <p>This is a paragraph. {tache.description}</p>
                </div>
            ))}
        </div>
        
        // <div className="mx-auto mt-10 max-w-4xl">
        //     <div className="mb-4 flex items-center justify-between">
        //         <h1 className="text-2xl font-bold">Liste des tâches</h1>
        //         <Link href={route('taches.create')} className="rounded bg-blue-500 px-4 py-2 text-white">
        //             Nouvelle tâche
        //         </Link>
        //     </div>

        //     <ul className="space-y-4">
        //         {taches.map((tache: Tache) => (
        //             <li key={tache.id} className="flex items-center justify-between rounded bg-white p-4 shadow">
        //                 <div>
        //                     <h2 className="text-lg font-semibold">{tache.titre}</h2>
        //                     <p className="text-sm text-gray-600">{tache.description}</p>
        //                 </div>
        //                 <div className="flex gap-2">
        //                     <Link href={route('taches.show', tache.id)} className="text-blue-600">
        //                         Voir
        //                     </Link>
        //                     <Link href={route('taches.edit', tache.id)} className="text-yellow-600">
        //                         Modifier
        //                     </Link>
        //                 </div>
        //             </li>
        //         ))}
        //     </ul>
        // </div>
    );
};

export default Index;
