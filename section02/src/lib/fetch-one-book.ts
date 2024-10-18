import { BookData } from "@/types";

export default async function fetchOneBook(
  id: number
): Promise<BookData | null> {
  const url = "https://onebite-books-server-zeta.vercel.app/book/" + id;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}
