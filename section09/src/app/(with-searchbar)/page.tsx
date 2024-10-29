import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import delay from "@/utils/delay";
import { Suspense } from "react";
import BookListSkeletion from "@/components/skeleton/book-list-skeleton";
import { Metadata } from "next";

async function AllBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );
  const allBooks: BookData[] = await response.json();

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } }
  );
  const recoBooks: BookData[] = await response.json();

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "한입북스",
  description: "한입북스의 모든 도서를 만나보세요",
  openGraph: {
    title: "한입북스",
    description: "한입북스의 모든 도서를 만나보세요",
    images: ["/thumbnail.png"],
  },
};

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeletion count={3} />}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeletion count={10} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
