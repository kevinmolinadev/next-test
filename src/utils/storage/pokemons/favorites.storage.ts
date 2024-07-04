import { Pokemon } from "@/domain/interfaces/pokemon.interface";

export const addTogglePokemon = (id: number) => {
    let favorites: number[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (favorites.includes(id)) {
        favorites = favorites.filter(item => item !== id);
    } else {
        favorites.push(id);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

export const getAllFavorites = async (): Promise<{ id: number, name: string, imageUrl: string }[]> => {
    const pokemomIds: number[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    try {
        const dataOfPokemons: Pokemon[] = await Promise.all(
            pokemomIds.map((id) => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(res => res.json())
                .then(data => ({ ...data, id })))
        );
        return dataOfPokemons.map((pokemon) => ({ id: pokemon.id, name: pokemon.name, imageUrl: pokemon.sprites.other!.dream_world.front_default ?? pokemon.sprites.back_default }))
    } catch (error) {
        return [];
    }
}

export const isInFavorites = (id: number) => {
    const favorites: number[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    return favorites.includes(id)
}