import type { ChainLink, Type } from "pokenode-ts";

//AI-genererat
// Function to calculate weaknesses
export function calculateWeaknesses(types: string[], pokemonTypes: Record<string, TypeData>): string[] {
    const weaknesses = new Set<string>();
    const strengths = new Set<string>();
    const resistances = new Set<string>();
    const immunities = new Set<string>();

    types.forEach(type => {
        const data = pokemonTypes[type];
        if (data) {
            // Add weaknesses, resistances, and immunities
            data.weakness.forEach(weakness => weaknesses.add(weakness));
            data.strength.forEach(strength => strengths.add(strength));
            data.resistance.forEach(resistance => resistances.add(resistance));
            data.immune.forEach(immune => immunities.add(immune));
        }
    });

    // Remove resistances and immunities from weaknesses
    resistances.forEach(resistance => weaknesses.delete(resistance));
    immunities.forEach(immune => weaknesses.delete(immune));

    return Array.from(weaknesses);
}

export function convertTypes(pokemonType: Type[]): Record<string, TypeData> {
    const pokemonTypes: Record<string, TypeData> = pokemonType.reduce((acc, type) => {
        acc[type.name] = {
            strength: [...new Set([...type.damage_relations.double_damage_to.map((damage) => damage.name)])],
            weakness: [...new Set([...type.damage_relations.double_damage_from.map((damage) => damage.name)])],
            resistance: [...new Set([...type.damage_relations.half_damage_from.map((damage) => damage.name)])],
            immune: [...new Set([...type.damage_relations.no_damage_from.map((damage) => damage.name)])]
        }
        return acc;
    }, {} as Record<string, TypeData>)

    return pokemonTypes;
}

export function convertEvolutions(evolutionChains: ChainLink) {
    const evolutions: PokemonEvolutions[] = [];

    function traverse(evolutionChainNode: ChainLink) {
        if (evolutionChainNode.species) {
            evolutions.push({
                name: evolutionChainNode.species.name,
                id: extractIdFromUrl(evolutionChainNode.species.url),
            });
        }
        if (evolutionChainNode.evolves_to && Array.isArray(evolutionChainNode.evolves_to)) {
            evolutionChainNode.evolves_to.forEach((evolution) => traverse(evolution));
        }
    }

    traverse(evolutionChains);
    return evolutions;
}

export function extractIdFromUrl(url: string): number {
    const parts = url.split("/");
    const idPart = parts[parts.length - 2]; // Get the second-to-last segment
    return idPart ? parseInt(idPart, 10) : -1;
}
