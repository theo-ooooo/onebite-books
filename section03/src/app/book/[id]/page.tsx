export default async function Page({
  params,
}: {
  params: { id: string | string[] };
}) {
  const { id } = await params;
  return <div>Book {id}</div>;
}
