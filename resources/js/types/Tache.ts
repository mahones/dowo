export type User = {
    id: number;
    name: string;
};
export type Tache = {
    id: number;
    titre: string;
    description?: string;
    priorite: string;
    date_echeance?: string;
    est_complete: boolean;
    est_recurrente: boolean;
    repetition?: string;
    temps_passe: number;
    user_id?: number;
    user: User; // Ajout de l'utilisateur
};
