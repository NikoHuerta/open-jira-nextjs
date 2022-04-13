interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    createdAt: number;
    status: string;
}


export const seedData: SeedData = {
    entries: [
        {
            description: 'Et sit elit aliquip nisi reprehenderit minim.',
            status: 'pending',
            createdAt: Date.now(),
        }, 
        {
            description: 'Fugiat duis cillum consequat proident.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        }, 
        {
            description: 'Sunt proident anim id et veniam excepteur irure eu ea.',
            status: 'finished',
            createdAt: Date.now() - 100000,
        }
    ]
}