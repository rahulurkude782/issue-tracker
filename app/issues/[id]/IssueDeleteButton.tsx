import { Button } from "@radix-ui/themes";
import React from "react";

const IssueDeleteButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color="red" className="w-full">
      Delete Issue
    </Button>
  );
};

export default IssueDeleteButton;
