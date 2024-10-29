"use server";

import delay from "@/utils/delay";
import { revalidateTag } from "next/cache";

export async function createReviewAction(_: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const author = formData.get("author")?.toString();
  const content = formData.get("content")?.toString();

  await delay(2000);

  if (!content || !author || !bookId) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      { method: "POST", body: JSON.stringify({ author, content, bookId }) }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidateTag(`reviews-${bookId}`);
    return {
      status: true,
      error: "",
    };
  } catch (e) {
    return {
      status: false,
      error: `리뷰 저장이 실패했습니다 : ${e}`,
    };
  }
}
