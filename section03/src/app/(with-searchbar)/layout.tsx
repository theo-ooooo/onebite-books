import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Searchbar />
      <div>{children}</div>
    </div>
  );
}
