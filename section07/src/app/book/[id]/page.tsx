import { notFound } from "next/navigation";
import style from "./page.module.css";

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
function ReviewEditor() {
  async function createReviewAction(formData: FormData) {
    "use server";
    const author = formData.get("author")?.toString();
    const content = formData.get("content")?.toString();

    console.log(author, content);
  }
  return (
    <section>
      <form action={createReviewAction}>
        <input name='content' type='text' placeholder='리뷰 내용' />
        <input name='author' type='text' placeholder='작성자' />
        <button type='submit'>작성하기</button>
      </form>
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
      <ReviewEditor />
    </div>
  );
}
