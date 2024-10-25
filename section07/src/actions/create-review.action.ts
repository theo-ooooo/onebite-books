"use server";

import { revalidatePath } from "next/cache";

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const author = formData.get("author")?.toString();
  const content = formData.get("content")?.toString();

  if (!content || !author || !bookId) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      { method: "POST", body: JSON.stringify({ author, content, bookId }) }
    );

    console.log(response.status);
    revalidatePath(`/book/${bookId}`);
  } catch (e) {
    console.error(e);
    return;
  }
}
