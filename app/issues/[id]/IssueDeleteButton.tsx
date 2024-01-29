"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

const IssueDeleteButton = ({ issueId }: { issueId: number }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" className="w-full">
          Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content className="space-y-4">
        <AlertDialog.Title>Confirm Delete</AlertDialog.Title>
        <AlertDialog.Description>
          Do you really want to delete this issue.This action can&apos;t be
          undone.
        </AlertDialog.Description>
        <Flex gap={"4"}>
          <AlertDialog.Cancel>
            <Button color="gray" variant="soft">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red">Delete Issue</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default IssueDeleteButton;
