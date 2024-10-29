import type { BookData } from "@/types";
import Link from "next/link";
import style from "./book-item.module.css";
import Image from "next/image";
import { lazy } from "react";

export default function BookItem({
  id,
  title,
  subTitle,
  author,
  publisher,
  coverImgUrl,
}: BookData) {
  return (
    <Link href={`/book/${id}`} className={style.container}>
      <Image src={coverImgUrl} width={80} height={105} alt={title} />
      <div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <br />
        <div className={style.author}>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
}