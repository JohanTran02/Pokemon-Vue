interface PokemonStats {
    base_stat: number;
    effort: number;
    name: string;
}

interface PokemonAbilities {
    is_hidden: boolean;
    slot: number;
    ability: {
        name: string,
        url?: string
    }
}

interface TypeData {
    weakness: string[], //double_damage_from
    strength: string[], //double_damage_to
    resistance: string[], //half_damage_from
    immune: string[], //no_damage_from
}

interface PokemonAPIList {
    count: number;
    next: string | null;
    previous: string | null;
    results: { id: number }[];
}