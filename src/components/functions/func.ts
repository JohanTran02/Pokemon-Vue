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
    resistances.forEach(strength => weaknesses.delete(strength));
    immunities.forEach(immune => weaknesses.delete(immune));

    return Array.from(weaknesses);
}