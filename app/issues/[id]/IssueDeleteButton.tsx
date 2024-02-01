"use client";
import { Spinner } from "@/app/components";
import { Issue } from "@prisma/client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const IssueDeleteButton = ({ issue }: { issue: Issue | null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete("/api/issues/" + issue?.id);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" className="w-full" disabled={isLoading}>
            Delete Issue {isLoading && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content className="space-y-4">
          <AlertDialog.Title>
            Confirm Deletion of {issue?.title}
          </AlertDialog.Title>
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
              <Button color="red" onClick={handleDelete}>
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      {/* Error Dialogue Box */}
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            There was an error occurred.
          </AlertDialog.Description>
          <AlertDialog.Cancel>
            <Button color="gray" variant="soft" onClick={() => setError(false)}>
              ok
            </Button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default IssueDeleteButton;
