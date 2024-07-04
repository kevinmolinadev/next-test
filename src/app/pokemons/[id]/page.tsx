import { Metadata } from "next";
import { ViewPokemon } from "@/components/ViewPokemon";
import { Pokemon } from "@/domain/interfaces/pokemon.interface";
import { redirect } from "next/navigation";

export const revalidate = 86400

export const generateStaticParams = async () => {
    return Array.from({ length: 151 }).map((i, index) => ({ id: `${index + 1}` }));
};

const fetchPokemon = async (key: string): Promise<Pokemon | null> => {
    try {
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${key}`).then(res => res.json())
        return pokemon;
    } catch (error) {
        return null;
    }
}

export async function generateMetadata({ params }: Props) {
    const pokemon = await fetchPokemon(params.id);
    if (pokemon) {
        const metadata: Metadata = {
            title: `Pokemon | ${pokemon.name.replace(/\b\w/g, (letra) => letra.toUpperCase())}`,
        }
        return metadata
    }
}

interface Props {
    params: {
        id: string
    }
}

export default async function Page({ params: { id } }: Props) {
    const pokemon = await fetchPokemon(id);
    if (!pokemon) {
        redirect("/pokemons")
    }
    return (
        <section className="py-4">
            <ViewPokemon id={+id} name={pokemon.name} imageUrl={pokemon.sprites.other!.dream_world.front_default ?? pokemon.sprites.back_default} />
        </section>
    );
}
