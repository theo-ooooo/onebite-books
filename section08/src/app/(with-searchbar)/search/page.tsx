import BookItem from "@/components/book-item";
import BookListSkeletion from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import delay from "@/utils/delay";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  await delay(1500);
  const reseponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    {
      next: { revalidate: 10 },
    }
  );

  if (!reseponse.ok) {
    return <div>오류가 발생하였습니다.</div>;
  }

  const books: BookData[] = await reseponse.json();
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const { q } = await searchParams;

  return (
    <Suspense key={q || ""} fallback={<BookListSkeletion count={3} />}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
