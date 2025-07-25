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

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Page principale des taches
 * 
 * Affiche un bouton permettant de creer une nouvelle tache
 * 
 * @returns {JSX.Element}
 */
/*******  ecdc6e69-7fb3-40da-bd8e-6aeb93d724b4  *******/
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


