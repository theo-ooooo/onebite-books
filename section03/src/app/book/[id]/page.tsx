export default function Page({
  params,
}: {
  params: { id: string | string[] };
}) {
  return <div>Book {params.id}</div>;
}
