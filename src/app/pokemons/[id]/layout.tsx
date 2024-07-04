import Link from "next/link";
import styles from "@/styles/pokemons/header.module.css"

export default function LayoutPokemon({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <header className={`${styles.header} flex justify-between`}>
                <Link href="/pokemons" >Volver </Link>
                <Link href="/pokemons/favorites" >Favoritos</Link>
            </header>
            <main>
                {children}
            </main>
        </>
    );
}