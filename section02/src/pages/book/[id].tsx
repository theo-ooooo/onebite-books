import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";
import Head from "next/head";

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      {
        params: { id: "1" },
      },
      {
        params: { id: "2" },
      },
      {
        params: { id: "3" },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const bookId = context.params!.id;

  const book = await fetchOneBook(Number(bookId));

  if (!book) {
    return {
      notFound: true,
    };
  }
  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        {" "}
        <Head>
          <title>한입북스</title>
          <meta property='og:image' content='/thumbnail.png' />
          <meta property='og:title' content='한입북스' />
          <meta property='og:description' content='한입북스입니다.' />
        </Head>
        <div>로딩중입니다.</div>
      </>
    );
  }
  if (!book) {
    return <div>문제가 발생했습니다.</div>;
  }
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:image' content={coverImgUrl} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
      </Head>
      <div className={style.container}>
        <div
          style={{ backgroundImage: `url(${coverImgUrl})` }}
          className={style.cover_img_container}
        >
          <img src={coverImgUrl} alt='' />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
