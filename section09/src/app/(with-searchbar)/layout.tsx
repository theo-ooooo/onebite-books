import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({
  children,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
