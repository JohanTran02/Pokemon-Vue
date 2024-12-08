# **Pokédex**

Jag har skapat en Pokédex där användare kan se information om alla Pokémon, inklusive deras typ, attack och HP. Här är en översikt över hur applikationen fungerar:

### Sökfunktion

Användare kan söka efter Pokémon genom att skriva in namnet i en inmatningsruta.

### Startsidan

På startsidan finns en lista med Pokémon som visar information om deras typ, namn, ID och utseende.

### Detaljsida

Varje Pokémon representeras av ett kort som är klickbart. När användaren klickar på ett kort, navigeras de till en detaljerad sida som visar mer information om den valda Pokémon. Detaljerna inkluderar:

- Namn
- Typ
- Attack
- HP
- Bild
- Beskrivning
- Utvecklingar

## Funktioner i Applikationen genererade med AI

Funktionerna i den givna koden är designade för att hantera och bearbeta information relaterad till Pokémon, särskilt deras typer och evolutioner. Dessa funktioner har genererats med hjälp av artificiell intelligens (AI) för att effektivt hantera data. Här är en sammanfattning av de viktigaste funktionerna:

### calculateWeaknesses

Denna funktion tar en lista av typer och en uppsättning av Pokémon-typdata som argument.
Den beräknar och returnerar en lista över svagheter för de angivna typerna.
Funktionen tar hänsyn till resistens och immunitet, vilket innebär att om en typ är resistent eller immun mot en viss attack, tas den bort från svagheterna.

- **Fil**: `func.ts`
- **Kod**:

```javascript
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
```

### convertTypes

Denna funktion konverterar en lista av Pokémon-typer till ett objekt som innehåller information om varje typ.
Informationen inkluderar styrkor, svagheter, resistens och immunitet.
Funktionen använder data om hur olika typer interagerar med varandra för att skapa en strukturerad representation av dessa relationer.

- **Fil**: `func.ts`
- **Kod**:

```javascript
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
```

### convertEvolutions

Denna funktion tar en pokémons evolutionskedja och traverserar den för att samla information om alla Pokémon som ingår i kedjan.
Den returnerar en lista över Pokémon med deras namn och ID:n.

- **Fil**: `func.ts`
- **Kod**:

```javascript
export function convertEvolutions(evolutionChains: ChainLink) {
const evolutions: PokemonObject[] = [];

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
```

### extractIdFromUrl

Denna hjälpfunktion extraherar och returnerar ett ID från en given URL.
Den används för att hämta ID:t för en Pokémon från dess URL, vilket är användbart för att identifiera Pokémon i databasen.

- **Fil**: `func.ts`
- **Kod**:

```javascript
export function extractIdFromUrl(url: string): number {
const parts = url.split("/");
const idPart = parts[parts.length - 2]; // Get the second-to-last segment
return idPart ? parseInt(idPart, 10) : -1;
}
```
