import { BookData } from "@/types";

export default async function fetchRandomBooks(): Promise<BookData[]> {
  const url = "https://onebite-books-server-zeta.vercel.app/book/random";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}
