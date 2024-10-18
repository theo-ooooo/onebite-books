import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate("/");
    res.json({ revalidate: true });
  } catch (e) {
    res.status(500).send(e);
  }
}
