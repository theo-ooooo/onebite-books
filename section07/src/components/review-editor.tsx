import { createReviewAction } from "@/actions/create-review.action";
import style from "./review-editor.module.css";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section className={style.container}>
      <form action={createReviewAction} className={style.form_container}>
        <input name='bookId' value={bookId} hidden />
        <textarea name='content' required placeholder='리뷰 내용' />
        <div className={style.submit_container}>
          <input name='author' type='text' required placeholder='작성자' />
          <button type='submit'>작성하기</button>
        </div>
      </form>
    </section>
  );
}
