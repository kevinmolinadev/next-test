import Image from "next/image";
import { NextPage } from "next";
import Link from "next/link";

interface Props {
    id: number,
    name: string,
    imageUrl: string
}

export const CardPokemon: NextPage<Props> = ({ id, name, imageUrl }) => {
    return (
        <Link href={`/pokemons/${id}`} className="flex flex-col justify-center items-center p-4 border rounded-md border-white hover:cursor-pointer">
            <p>{name}</p>
            <Image width={200} height={200} src={imageUrl} alt={name} />
        </Link>
    );
};