import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssueEditButton = ({ issueId }: { issueId: number }) => {
  return (
    <Link href={`/issues/${issueId}/edit`}>
      <Button>Edit Issue</Button>
    </Link>
  );
};

export default IssueEditButton;
