"use client"

import { useEffect, useState } from "react";
import { getAllFavorites } from "@/utils/storage/pokemons/favorites.storage";
import { ViewPokemon } from "../../../components/ViewPokemon";
import Link from "next/link";

export default function Page() {
    const [favorites, setFavorites] = useState<{ id: number, name: string, imageUrl: string }[] | null>(null)

    useEffect(() => {
        handleFavorites()
    }, [])

    const handleFavorites = () => {
        getAllFavorites()
            .then(setFavorites);
    }

    if (!favorites) return <div>Cargando...</div>
    return (
        <>
            <header className="flex justify-between sticky py-4 bg-black/75 top-0">
                <h1 className="text-2xl">Favoritos</h1>
                <Link className="text-lg py-2 px-4 rounded-md border border-white" href="/pokemons" >Volver</Link>
            </header>
            <main>
                <section className="py-4 flex flex-wrap justify-center gap-6">
                    {
                        favorites.length > 0
                            ? favorites.map(item => <ViewPokemon key={item.id} onDelete={() => handleFavorites()} id={item.id} name={item.name} imageUrl={item.imageUrl} />)
                            : <div>Aun no tienes pokemones en tu lista de favoritos</div>
                    }
                </section>
            </main>
        </>
    );
}