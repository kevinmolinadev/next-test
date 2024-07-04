"use client"

import { addTogglePokemon, isInFavorites } from "@/utils/storage/pokemons/favorites.storage";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface Props {
    id: number,
    name: string,
    imageUrl: string,
    onDelete?: () => void
}

export const ViewPokemon: FC<Props> = ({ id, name, imageUrl, onDelete }) => {
    const [isFavorite, setIsfavorite] = useState<boolean | null>(null);

    useEffect(() => {
        setIsfavorite(isInFavorites(id));
    }, [id]);

    const togleFavorite = () => {
        addTogglePokemon(id)
        if (onDelete) {
            onDelete();
        }
        setIsfavorite(!isFavorite)
    }
    return (
        <article>
            <div className="flex gap-4 justify-between items-center mb-4">
                <h1 className="capitalize">{name}</h1>
                <button onClick={togleFavorite} className="p-2 border text-sm border-white rounded-md">{isFavorite !== null ? isFavorite ? "Quitar de favoritos" : "Agregar a favoritos" : "Cargando"}</button>
            </div>
            <Image width={200} height={200} src={imageUrl} alt={name} />
        </article>
    );
};