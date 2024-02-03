import { getServerSession } from "next-auth";
import Pagination from "./components/Pagination";
import { useSearchParams } from "next/navigation";
import LatestIssues from "./LatestIssues";

export default async function Home() {
  return (
    <main>
      <LatestIssues />
    </main>
  );
}
