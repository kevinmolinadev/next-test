import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link className="py-3 px-4 border border-white rounded-md" href="/pokemons">Pokemones</Link>
    </main>
  );
}
