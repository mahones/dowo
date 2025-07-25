import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Taches',
        href: '/taches',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="taches" />
            <div className="p-4 ">
                <Link href={route('taches.create')}>
                    <Button>Creer une tache</Button>
                </Link>
            </div>
        </AppLayout>
    );
}


// import React from 'react';
// // PageProps n'existe pas, on utilise directement les props typés
// // import { Link } from '@inertiajs/react';

// type User ={
//     id: number;
//     name: string;
// }
// type Tache = {
//     id: number;
//     user_id: number;
//     titre: string;
//     description: string;
//     user: User; // Ajout de l'utilisateur
//     // priorite: string;
//     // date_echeance?: string;
//     // est_complete?: boolean;
//     // est_recurrente?: boolean;
//     // temps_passe?: number;
// };

// interface ListeProps {
//     taches: Tache[];
// }

// const Index: React.FC<ListeProps> = ({ taches }) => {
//     return (

//         <div>
//             <h1>Hello World</h1>
//             { taches.map((tache:Tache) =>(
//                 <div>
//                     <p>{tache.id}</p>
//                     <p>This is another paragraph. {tache.titre}</p>
//                     <p>This is a paragraph. {tache.description}</p>
//                     <p>This is a paragraph. {tache.user.name}</p>
//                 </div>
//             ))}
//         </div>
//       );
// };

// export default Index;
