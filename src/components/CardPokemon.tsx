"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NextPage } from "next";

interface Props {
    id: number,
    name: string,
    imageUrl: string
}

export const CardPokemon: NextPage<Props> = ({ id, name, imageUrl }) => {
    const router = useRouter();

    const handleViewPokemon = () => {
        router.push(`/pokemons/${id}`);
    }

    return (
        <div onClick={handleViewPokemon} className="flex flex-col justify-center items-center p-4 border rounded-md border-white hover:cursor-pointer">
            <p>{name}</p>
            <Image width={200} height={200} src={imageUrl} alt={name} />
        </div>
    );
};