import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssueEditButton = ({ issueId }: { issueId: number }) => {
  return (
    <Link href={`/issues/edit/${issueId}`}>
      <Button className="w-full">Edit Issue</Button>
    </Link>
  );
};

export default IssueEditButton;
