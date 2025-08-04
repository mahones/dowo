import { create } from 'zustand'
type Filtre ={
    priorite: 'toutes' | 'basse' | 'moyenne' | 'haute';
    est_complete: boolean;
}

type TacheStore = {
    filtre: Filtre;
    setFiltre:(filtre: Partial<Filtre>) => void;
}

export const useTacheStore = create<TacheStore>()(
    (set) => ({
        filtre: {
            priorite: 'toutes',
            est_complete: false,
        },
        setFiltre: (filtre) => set((state) => ({
            filtre: { ...state.filtre, ...filtre },
        })),
    }),
);