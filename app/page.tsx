import { getServerSession } from "next-auth";
import Pagination from "./components/Pagination";
import { useSearchParams } from "next/navigation";
import LatestIssues from "./LatestIssues";
import IssueSummery from "./IssueSummery";

export default async function Home() {
  return (
    <main>
      <IssueSummery open={10} inProgress={90} closed={2} />
    </main>
  );
}
