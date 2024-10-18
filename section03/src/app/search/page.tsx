export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return <div>search 페이지 {searchParams.q}</div>;
}
