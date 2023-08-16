import Headers from "@/components/Headers";
import Search from "@/components/Search";

export const metadata = {
  title: "Supply Chain - Public Website",
  description: "",
};

export default function Home() {
  return (
    <main>
      <Headers />
      <Search />
    </main>
  )
}
