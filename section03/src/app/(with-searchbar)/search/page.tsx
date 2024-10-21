export default async function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const { q } = await searchParams;
  return <div>search 페이지 {q}</div>;
}
