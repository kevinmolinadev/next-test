import Link from "next/link";
import { ListPokemon } from "@/domain/interfaces/list-pokemon.interface";
import { CardPokemon } from "@/components/CardPokemon";

const getPokemons = async () => {
    const listPokemon: ListPokemon = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151").then(res => res.json());
    if (listPokemon.results.length === 0) return [];
    return listPokemon.results.map((item, index) => ({ ...item, imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg` }));
}

export default async function Pokemons() {
    const listPokemon = await getPokemons();
    return (
        <>
            <header className="flex justify-between sticky top-0 py-4 bg-black/75">
                <h1 className="text-2xl">Pokemones</h1>
                <Link className="text-lg border border-white rounded-md py-2 px-4" href={"/pokemons/favorites"}>Favoritos</Link>
            </header>
            <main>
                <div className="flex gap-2 m-4 flex-wrap justify-center w-full">
                    {
                        listPokemon.map((item, index) => <CardPokemon key={item.name} id={index + 1} name={item.name} imageUrl={item.imageUrl} />)
                    }
                </div>
            </main>
        </>
    );
}
