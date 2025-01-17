import BookItem from "@/components/book-item";
import BookListSkeletion from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  const reseponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    {
      cache: "force-cache",
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

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;

  return {
    title: `${q} : 한입북스 검색`,
    description: `${q} : 한입북스 검색 결과 압니다.`,
    openGraph: {
      title: `${q} : 한입북스 검색`,
      description: `${q} : 한입북스 검색 결과 압니다.`,
      images: ["/thumbnail.png"],
    },
  };
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
