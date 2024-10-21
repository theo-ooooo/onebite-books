import ClientComponent from "@/components/client-component";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  return (
    <div>
      search 페이지 {q}{" "}
      <ClientComponent>
        <div>111</div>
      </ClientComponent>
    </div>
  );
}
