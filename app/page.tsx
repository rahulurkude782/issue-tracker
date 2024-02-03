import { getServerSession } from "next-auth";
import Pagination from "./components/Pagination";
import { useSearchParams } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const session = await getServerSession();
  return (
    <main>
      <Pagination
        itemsCount={100}
        pageSize={10}
        currentPage={parseInt(searchParams.page) || 1}
      />
    </main>
  );
}
