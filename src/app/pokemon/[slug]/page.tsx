export default async function PokemonDetailPage({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const slug = (await params).slug
    return (
        <section>{slug}</section>
    )
}