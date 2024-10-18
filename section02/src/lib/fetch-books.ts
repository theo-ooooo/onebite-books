import { BookData } from "@/types";

export default async function fetchBooks(q?: string): Promise<BookData[]> {
  let url = "https://onebite-books-server-zeta.vercel.app/book";

  if (q) {
    url += "/search?q=" + q;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}
