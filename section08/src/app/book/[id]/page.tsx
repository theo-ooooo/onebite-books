import { notFound } from "next/navigation";
import style from "./page.module.css";
import { ReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";

export const dynamic = "force-static";

async function BookDetail({ bookId }: { bookId: string }) {
  const reseponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`,
    { next: { revalidate: 10 } }
  );

  if (!reseponse.ok) {
    if (reseponse.status === 404) {
      notFound();
    }
    return <div>오류가 발생하였습니다.</div>;
  }

  const book = await reseponse.json();
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    { next: { tags: [`reviews-${bookId}`] } }
  );

  if (!response.ok) {
    throw new Error(`review fetch faill : ${response.statusText}`);
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: paramsId } = await params;

  return (
    <div className={style.container}>
      <BookDetail bookId={paramsId} />
      <ReviewEditor bookId={paramsId} />
      <ReviewList bookId={paramsId} />
    </div>
  );
}
