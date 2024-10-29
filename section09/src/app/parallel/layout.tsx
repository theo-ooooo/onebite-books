import Link from "next/link";

export default function Layout({
  children,
  sidebar,
  feed,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  feed: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <Link href={"/parallel"}>병렬</Link>
        <Link href={"/parallel/setting"}> 별렬 셋팅</Link>
      </div>
      <div>
        {sidebar}
        {feed}
        {children}
      </div>
    </div>
  );
}
