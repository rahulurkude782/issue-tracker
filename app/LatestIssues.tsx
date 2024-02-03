import { Flex, Table, Text, Card, Heading, Avatar } from "@radix-ui/themes";
import React from "react";
import { IssueStatusBadge } from "./components";
import Link from "next/link";

const LatestIssues = async () => {
  const issues = await prisma?.issue.findMany({
    orderBy: {
      title: "desc",
    },
    take: 5,
    include: {
      assignToUser: true,
    },
  });
  return (
    <Card>
      <Heading size="4">Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {issues?.map((issue) => (
            <Table.Row key={issue.title}>
              <Table.Cell>
                <Flex justify="between" align="center">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>
                      <Text className="font-medium">{issue.title}</Text>
                    </Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignToUserId && (
                    <Avatar
                      src={issue.assignToUser?.image!}
                      fallback="?"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
