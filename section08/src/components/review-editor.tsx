"use client";

import { createReviewAction } from "@/actions/create-review.action";
import style from "./review-editor.module.css";
import { useActionState, useEffect } from "react";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  const [state, formAction, isPanding] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);
  return (
    <section className={style.container}>
      <form action={formAction} className={style.form_container}>
        <input name='bookId' value={bookId} hidden readOnly />
        <textarea
          name='content'
          required
          placeholder='리뷰 내용'
          disabled={isPanding}
        />
        <div className={style.submit_container}>
          <input
            name='author'
            type='text'
            required
            placeholder='작성자'
            disabled={isPanding}
          />
          <button type='submit' disabled={isPanding}>
            {isPanding ? "..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
