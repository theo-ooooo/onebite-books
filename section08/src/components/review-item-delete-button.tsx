"use client";

import { useActionState, useEffect, useRef } from "react";
import style from "./review-item.module.css";
import { deleteReviewAction } from "@/actions/delete-review.action";

export default function ReviewItemDeleteButton({
  bookId,
  reviewId,
}: {
  bookId: number;
  reviewId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);
  return (
    <form ref={formRef} action={formAction}>
      <input name='bookId' value={bookId} readOnly hidden />
      <input name='reviewId' value={reviewId} readOnly hidden />
      <div
        onClick={() => {
          if (!isPending) {
            formRef.current?.requestSubmit();
          }
        }}
        className={style.delete_btn}
      >
        {isPending ? "..." : "삭제하기"}
      </div>
    </form>
  );
}
